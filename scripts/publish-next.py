#!/usr/bin/env python3
"""
publish-next.py — promote the next "ready" blog post to "published".

The 3-state workflow:
  - status: "draft"     → still being written / reviewed
  - status: "ready"     → Steve has approved, queued for next publish slot
  - status: "published" → live on the site

This script finds the oldest post with status: "ready" (sorted by `date`
field, ties broken alphabetically by filename) and flips it to "published",
also bumping `modified` to today. Prints the slug it flipped, or exits
with code 78 (EX_NOPERM in BSD convention; we use it to mean "nothing to
do") if no posts are ready.

Designed to be called by a daily GitHub Actions workflow:

    python3 scripts/publish-next.py
    if [ $? -eq 0 ]; then
      git add src/content/blog/*.mdx
      git commit -m "publish: $(cat /tmp/published-slug)"
      git push
    fi
"""

import re
import sys
from datetime import date
from pathlib import Path

BLOG_DIR = Path(__file__).resolve().parent.parent / "src" / "content" / "blog"
TODAY = date.today().isoformat()
SLUG_OUTPUT = Path("/tmp/published-slug")

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
DATE_RE = re.compile(r'^date:\s*"?(\d{4}-\d{2}-\d{2})"?\s*$', re.MULTILINE)
STATUS_RE = re.compile(r'^status:\s*"?(\w+)"?\s*$', re.MULTILINE)
SLUG_RE = re.compile(r'^slug:\s*"?([\w-]+)"?\s*$', re.MULTILINE)


def parse(path: Path):
    text = path.read_text()
    m = FRONTMATTER_RE.match(text)
    if not m:
        return None
    fm = m.group(1)
    status = STATUS_RE.search(fm)
    date_match = DATE_RE.search(fm)
    slug = SLUG_RE.search(fm)
    if not (status and date_match and slug):
        return None
    return {
        "path": path,
        "status": status.group(1),
        "date": date_match.group(1),
        "slug": slug.group(1),
        "text": text,
    }


def main() -> int:
    candidates = []
    for path in sorted(BLOG_DIR.glob("*.mdx")):
        post = parse(path)
        if post and post["status"] == "ready":
            candidates.append(post)

    if not candidates:
        print("publish-next: no posts in 'ready' state — nothing to publish today")
        return 78

    candidates.sort(key=lambda p: (p["date"], p["slug"]))
    target = candidates[0]

    new_text = re.sub(
        r'^status:\s*"ready"\s*$',
        'status: "published"',
        target["text"],
        count=1,
        flags=re.MULTILINE,
    )
    new_text = re.sub(
        r'^modified:\s*"[^"]*"\s*$',
        f'modified: "{TODAY}"',
        new_text,
        count=1,
        flags=re.MULTILINE,
    )

    if new_text == target["text"]:
        print(f"publish-next: ERROR — could not flip status on {target['slug']}")
        return 1

    target["path"].write_text(new_text)
    SLUG_OUTPUT.write_text(target["slug"])
    print(f"publish-next: flipped '{target['slug']}' → published")
    print(f"  source: {target['path'].name}")
    print(f"  date:   {target['date']}")
    print(f"  url:    /blog/{target['slug']} or /ai-lab/{target['slug']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
