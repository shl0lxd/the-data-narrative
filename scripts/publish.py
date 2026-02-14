#!/usr/bin/env python3
"""
Automate blog publishing: parse Markdown frontmatter, convert body to HTML,
and INSERT or UPDATE the Supabase posts table by slug.
Uses SUPABASE_URL and SUPABASE_KEY (service_role) from .env.
"""

import os
import sys
from datetime import datetime, timezone

import frontmatter
import markdown
from dotenv import load_dotenv
from supabase import create_client

# Load .env from project root (parent of scripts/)
_script_dir = os.path.dirname(os.path.abspath(__file__))
_project_root = os.path.dirname(_script_dir)
load_dotenv(os.path.join(_project_root, ".env"))


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python scripts/publish.py <file.md>", file=sys.stderr)
        sys.exit(1)

    path = sys.argv[1]
    if not os.path.isfile(path):
        print(f"File not found: {path}", file=sys.stderr)
        sys.exit(1)
    if not path.lower().endswith(".md"):
        print("Expected a .md file.", file=sys.stderr)
        sys.exit(1)

    post = frontmatter.load(path)
    meta = post.metadata
    body = post.content.strip()

    title = meta.get("title") or meta.get("Title")
    slug = meta.get("slug") or meta.get("Slug")
    deck = meta.get("deck") or meta.get("Deck") or None
    category = meta.get("category") or meta.get("Category") or None

    if not slug:
        print("Frontmatter must include 'slug'.", file=sys.stderr)
        sys.exit(1)
    if not title:
        print("Frontmatter must include 'title'.", file=sys.stderr)
        sys.exit(1)

    html_content = markdown.markdown(body, extensions=["extra", "nl2br"])

    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        print(
            "Set SUPABASE_URL and SUPABASE_KEY (service_role) in .env",
            file=sys.stderr,
        )
        sys.exit(1)

    supabase = create_client(url, key)

    existing = (
        supabase.table("posts")
        .select("id")
        .eq("slug", slug)
        .execute()
    )

    if existing.data and len(existing.data) > 0:
        supabase.table("posts").update({
            "title": title,
            "deck": deck,
            "category": category,
            "content": html_content,
        }).eq("slug", slug).execute()
        print(f"Updated post: {slug}")
    else:
        now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        supabase.table("posts").insert({
            "slug": slug,
            "title": title,
            "deck": deck,
            "category": category,
            "content": html_content,
            "is_published": True,
            "published_at": now,
        }).execute()
        print(f"Inserted post: {slug}")


if __name__ == "__main__":
    main()
