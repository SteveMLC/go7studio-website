#!/usr/bin/env python3
"""
publish-next.py — promote the next blog post on the publish queue.

The queue is a plain text file at `scripts/publish-queue.txt`, one slug per
line. Lines starting with `#` are comments. Blank lines are skipped.

Workflow:
  1. Read the first non-blank, non-comment line as the next slug.
  2. Find the matching .mdx file in src/content/blog/.
  3. If the file exists AND has status:"draft", flip to "published",
     bump `modified` to today, remove the line from the queue.
  4. If the file doesn't exist (Tier 1 not yet written by Steve), skip it
     and try the next line. Don't remove skipped lines.
  5. If no eligible line is found, exit 78 (no-op).

Output `/tmp/published-slug` for the workflow to read.
"""

import re
import sys
from datetime import date
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = REPO_ROOT / "src" / "content" / "blog"
QUEUE_FILE = REPO_ROOT / "scripts" / "publish-queue.txt"
TODAY = date.today().isoformat()
SLUG_OUTPUT = Path("/tmp/published-slug")

STATUS_RE = re.compile(r'^(status:\s*)"draft"\s*$', re.MULTILINE)
MODIFIED_RE = re.compile(r'^modified:\s*"[^"]*"\s*$', re.MULTILINE)


def read_queue():
    """Return list of (line_index, slug) for non-blank, non-comment lines."""
    if not QUEUE_FILE.exists():
        return []
    lines = QUEUE_FILE.read_text().splitlines()
    return [
        (idx, line.strip())
        for idx, line in enumerate(lines)
        if line.strip() and not line.strip().startswith("#")
    ]


def main() -> int:
    queue = read_queue()
    if not queue:
        print("publish-next: queue is empty — nothing to publish today")
        return 78

    skipped = []
    for idx, slug in queue:
        post_path = BLOG_DIR / f"{slug}.mdx"
        if not post_path.exists():
            print(f"publish-next: skip — '{slug}' not yet written, leaving in queue")
            skipped.append(slug)
            continue

        text = post_path.read_text()
        if not STATUS_RE.search(text):
            # Already published, or status is "ready" or other — skip but warn
            print(f"publish-next: skip — '{slug}' has no status:'draft' (already published or unexpected state), leaving in queue")
            skipped.append(slug)
            continue

        # Flip the status and bump modified
        new_text = STATUS_RE.sub(r'\1"published"', text, count=1)
        new_text = MODIFIED_RE.sub(f'modified: "{TODAY}"', new_text, count=1)
        if new_text == text:
            print(f"publish-next: ERROR — could not rewrite frontmatter for '{slug}'")
            return 1

        post_path.write_text(new_text)

        # Remove this slug from the queue (preserve everything else verbatim)
        original_lines = QUEUE_FILE.read_text().splitlines()
        new_lines = [line for i, line in enumerate(original_lines) if i != idx]
        QUEUE_FILE.write_text("\n".join(new_lines) + ("\n" if new_lines else ""))

        SLUG_OUTPUT.write_text(slug)
        print(f"publish-next: flipped '{slug}' → published")
        print(f"  source: {post_path.name}")
        if skipped:
            print(f"  skipped (left in queue): {', '.join(skipped)}")
        return 0

    print("publish-next: nothing publishable in queue (all entries skipped — likely all Tier 1 posts not yet written)")
    return 78


if __name__ == "__main__":
    sys.exit(main())
