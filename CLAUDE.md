# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Notion-Hugo syncs content from Notion to a Hugo static site and deploys to Cloudflare Pages. It converts Notion pages/databases to Hugo-compatible Markdown with YAML front matter.

## Commands

```bash
# Sync content from Notion (requires NOTION_TOKEN env var)
npm install
npm start

# Run Hugo dev server
npm run server

# Type checking
npm run typecheck

# Format code
npm run format
```

## Architecture

### Sync Pipeline (src/)

1. **index.ts** - Entry point. Iterates through mounted databases/pages from config, calls Notion API, syncs content, removes orphaned local files
2. **config.ts** - Loads `notion-hugo.config.ts`. Supports two modes:
   - `manual: true` - Explicit page_id/database_id lists
   - `manual: false` - Auto-discovers child pages/databases from a parent page URL
3. **render.ts** - Converts Notion page to Markdown file:
   - Maps Notion properties to Hugo front matter
   - Embeds `NOTION_METADATA` and `MANAGED_BY_NOTION_HUGO` flags for tracking
   - Skips unchanged pages (compares `last_edited_time`)
4. **markdown/notion-to-md.ts** - Core Notion block → Markdown converter with support for images, tables, code, callouts, toggles, etc.
5. **file.ts** - Scans `content/` directory for managed files to detect orphans

### Cloudflare Functions (functions/)

**api.ts** - Edge function that proxies Notion file URLs:
- Notion S3 URLs expire after 1 hour
- This function fetches fresh URLs from Notion API and caches them in KV
- Used for images/files referenced as `/api?block_id=xxx` or `/api?page_id=xxx`

### Configuration Files

- **notion-hugo.config.ts** - User config: `base_url`, `mount` settings (page_url or manual page/database IDs)
- **config/_default/** - Hugo site config (Blowfish theme via Hugo modules)

### Key Behaviors

- Files with `MANAGED_BY_NOTION_HUGO: true` in front matter are auto-managed (can be deleted if removed from Notion)
- The `base_url` config generates API URLs for Notion file proxying
- CD workflow runs daily at midnight UTC and on push to main

## Environment Variables

- `NOTION_TOKEN` - Required. Notion integration token with Read Content and Read user info permissions

## Active Technologies

- **TypeScript 5.9** - Sync pipeline (`src/`)
- **Hugo 0.110+** - Static site generator
- **Go 1.21+** - Hugo modules
- **Blowfish v2** - Hugo theme (`github.com/nunocoracao/blowfish/v2`)
- **Cloudflare Pages** - Hosting with edge functions for Notion file proxy
