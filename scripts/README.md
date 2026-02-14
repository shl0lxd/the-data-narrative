# Scripts

## publish.py

Publishes a local Markdown file to the Supabase `posts` table using the Supabase Python client (service_role key).

### Setup

1. Create a virtualenv and install dependencies:

   ```bash
   cd scripts
   python3 -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. In the project root, create a `.env` file with your Supabase credentials (use the **service_role** key from Project Settings → API):

   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=your_service_role_key_here
   ```

### Usage

```bash
python scripts/publish.py my-new-article.md
```

From inside `scripts/`:

```bash
python publish.py path/to/article.md
```

### Logic

- Parses **frontmatter** (title, slug, deck, category) and converts the **body** to HTML.
- If a post with the same **slug** exists → **UPDATE** that row (title, deck, category, content).
- If not → **INSERT** a new row with `is_published = true` and `published_at = NOW()`.

### Markdown format

- **Frontmatter** (YAML between `---`): `title`, `slug`, `deck`, `category`.
- **Body**: Markdown below the frontmatter; converted to HTML for `content`.

Example:

```md
---
title: "Bandra's Property Boom: A 2026 Analysis"
slug: "bandra-property-boom-2026"
deck: "Why Western Suburb prices are decoupling from the rest of Mumbai."
category: "Property"
---

## The Shift in Bandra West
As a Software Engineer living in Mumbai, I've noticed a distinct pattern...
```
