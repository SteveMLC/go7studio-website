import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OWNER = "SteveMLC";
const REPO = "go7studio-website";
const BRANCH = "main";

interface FlipBody {
  slug: string;
  newStatus: "draft" | "published";
}

const VALID = new Set(["draft", "published"]);
const FRONTMATTER_RE = /^(---\r?\n)([\s\S]*?)(\r?\n---)/;
const STATUS_RE = /^status:\s*["']?(draft|published)["']?\s*$/m;
const ANY_STATUS_RE = /^status:\s*["']?([^"'\r\n]+)["']?\s*$/m;
const MODIFIED_RE = /^modified:\s*["']?[^"'\r\n]+["']?\s*$/m;
const DATE_RE = /^date:\s*.+$/m;

type Status = FlipBody["newStatus"];
type RewriteResult =
  | { ok: true; text: string }
  | { ok: false; error: string; status: number };

function rewriteBlogFrontmatter(text: string, newStatus: Status, today: string): RewriteResult {
  const match = FRONTMATTER_RE.exec(text);
  if (!match) {
    return {
      ok: false,
      error: "Post has no YAML frontmatter block to update.",
      status: 422,
    };
  }

  const [, opener, frontmatter, closer] = match;
  const lineEnding = opener.includes("\r\n") ? "\r\n" : "\n";
  const statusMatch = ANY_STATUS_RE.exec(frontmatter);

  if (statusMatch && !VALID.has(statusMatch[1])) {
    return {
      ok: false,
      error: `Existing status:${statusMatch[1]} is not supported. Allowed: ${[...VALID].join(", ")}.`,
      status: 422,
    };
  }

  let nextFrontmatter = frontmatter;
  if (statusMatch) {
    const currentStatus = statusMatch[1] as Status;
    if (currentStatus === newStatus) {
      return {
        ok: false,
        error: `Post is already status:${newStatus}, nothing to flip.`,
        status: 409,
      };
    }
    nextFrontmatter = nextFrontmatter.replace(STATUS_RE, `status: "${newStatus}"`);
  } else {
    if (newStatus === "draft") {
      return {
        ok: false,
        error: "Post has no status line and already defaults to draft.",
        status: 409,
      };
    }
    nextFrontmatter = `${nextFrontmatter}${lineEnding}status: "${newStatus}"`;
  }

  if (MODIFIED_RE.test(nextFrontmatter)) {
    nextFrontmatter = nextFrontmatter.replace(MODIFIED_RE, `modified: "${today}"`);
  } else if (DATE_RE.test(nextFrontmatter)) {
    nextFrontmatter = nextFrontmatter.replace(
      DATE_RE,
      (line) => `${line}${lineEnding}modified: "${today}"`,
    );
  } else {
    nextFrontmatter = `${nextFrontmatter}${lineEnding}modified: "${today}"`;
  }

  return {
    ok: true,
    text: `${opener}${nextFrontmatter}${closer}${text.slice(match[0].length)}`,
  };
}

export async function POST(req: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error:
          "GITHUB_TOKEN env var not set on this deployment. Add a Personal Access Token with 'contents: write' scope on the go7studio-website repo to enable status flips.",
      },
      { status: 503 },
    );
  }

  let body: FlipBody;
  try {
    body = (await req.json()) as FlipBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { slug, newStatus } = body;
  if (!slug || typeof slug !== "string" || !/^[a-z0-9][a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Bad slug." }, { status: 400 });
  }
  if (!VALID.has(newStatus)) {
    return NextResponse.json(
      { error: `Bad newStatus. Allowed: ${[...VALID].join(", ")}.` },
      { status: 400 },
    );
  }

  const path = `src/content/blog/${slug}.mdx`;
  const today = new Date().toISOString().slice(0, 10);

  const octokit = new Octokit({ auth: token });

  // 1. Read the current file via the Contents API (gives us SHA + base64 content)
  let current;
  try {
    current = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: `Couldn't read ${path} from GitHub. ${err instanceof Error ? err.message : "Unknown error."}`,
      },
      { status: 404 },
    );
  }

  if (Array.isArray(current.data) || current.data.type !== "file") {
    return NextResponse.json({ error: `Path ${path} is not a file.` }, { status: 400 });
  }

  const fileSha = current.data.sha;
  const text = Buffer.from(current.data.content, current.data.encoding as BufferEncoding).toString(
    "utf-8",
  );

  // 2. Rewrite frontmatter only — flip status, bump or add modified.
  const rewrite = rewriteBlogFrontmatter(text, newStatus, today);
  if (!rewrite.ok) {
    return NextResponse.json({ error: rewrite.error }, { status: rewrite.status });
  }

  // 3. Commit through the Contents API (creates a single commit on main)
  const commitMessage =
    newStatus === "published"
      ? `publish(blog): ${slug} (admin flip)`
      : `unpublish(blog): ${slug} (admin flip)`;

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path,
      branch: BRANCH,
      message: commitMessage,
      content: Buffer.from(rewrite.text, "utf-8").toString("base64"),
      sha: fileSha,
      committer: { name: "Go7Studio Admin", email: "walt@go7studio.com" },
      author: { name: "Go7Studio Admin", email: "walt@go7studio.com" },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: `GitHub rejected the commit. ${err instanceof Error ? err.message : "Unknown error."}`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, slug, newStatus, commitMessage });
}
