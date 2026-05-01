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

  // 2. Rewrite frontmatter — flip status, bump modified
  let next = text;
  let didFlip = false;
  next = next.replace(/^status:\s*"(draft|published)"\s*$/m, (line, currentValue) => {
    if (currentValue === newStatus) {
      // No-op: already at the desired state
      return line;
    }
    didFlip = true;
    return `status: "${newStatus}"`;
  });
  if (!didFlip) {
    return NextResponse.json(
      { error: `Post is already status:${newStatus}, nothing to flip.` },
      { status: 409 },
    );
  }
  next = next.replace(/^modified:\s*"[^"]*"\s*$/m, `modified: "${today}"`);

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
      content: Buffer.from(next, "utf-8").toString("base64"),
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
