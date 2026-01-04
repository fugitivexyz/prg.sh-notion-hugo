# Architecture Overview

## Directory Structure

```
prg.sh-notion-hugo/
├── src/                    # TypeScript sync pipeline
│   ├── index.ts            # Entry point - orchestrates sync
│   ├── config.ts           # Loads notion-hugo.config.ts
│   ├── render.ts           # Converts Notion pages to Markdown
│   ├── file.ts             # Scans content/ for managed files
│   ├── helpers.ts          # Utility functions
│   ├── sh.ts               # Shell command helpers
│   └── markdown/           # Markdown conversion
│       ├── notion-to-md.ts # NotionToMarkdown class
│       ├── notion.ts       # Notion API helpers
│       ├── md.ts           # Markdown utilities
│       └── types.ts        # Type definitions
├── functions/              # Cloudflare edge functions
│   └── api.ts              # Notion file URL proxy
├── content/                # Generated Markdown content (Hugo)
├── config/                 # Hugo configuration
│   ├── _default/           # Default Hugo config
│   └── DoIt/               # DoIt theme config
├── layouts/                # Hugo layout overrides
├── themes/                 # Hugo themes (git submodule)
├── static/                 # Static assets
└── notion-hugo.config.ts   # User configuration
```

## Sync Pipeline Flow

1. **index.ts** - Entry point
   - Loads config via `loadConfig()`
   - Iterates through mounted databases/pages
   - Calls Notion API to fetch content
   - Syncs content to local files
   - Removes orphaned managed files

2. **config.ts** - Configuration loading
   - Loads `notion-hugo.config.ts`
   - Two modes:
     - `manual: true` - Uses explicit page_id/database_id lists
     - `manual: false` - Auto-discovers from parent page URL

3. **render.ts** - Page rendering
   - `renderPage()` - Converts Notion page to Markdown string
   - `savePage()` - Writes Markdown to file
   - Maps Notion properties to Hugo front matter
   - Embeds `NOTION_METADATA` and `MANAGED_BY_NOTION_HUGO` flags
   - Skips unchanged pages (compares `last_edited_time`)

4. **markdown/notion-to-md.ts** - Block conversion
   - `NotionToMarkdown` class - Core converter
   - Supports images, tables, code, callouts, toggles, etc.
   - Custom transformers for special block types

5. **file.ts** - File management
   - `getAllContentFiles()` - Lists all content files
   - `getContentFile()` - Gets single file metadata
   - Detects managed files via front matter flags

## Cloudflare Functions

**api.ts** - Notion file proxy
- Notion S3 URLs expire after 1 hour
- This function fetches fresh URLs from Notion API
- Caches results in Cloudflare KV
- Used for images/files as `/api?block_id=xxx` or `/api?page_id=xxx`

## Key Behaviors

- Files with `MANAGED_BY_NOTION_HUGO: true` in front matter are auto-managed
- The `base_url` config generates API URLs for Notion file proxying
- Unchanged pages are skipped based on `last_edited_time` comparison
