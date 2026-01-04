# Project Overview: prg.sh-notion-hugo

## Purpose
Notion-Hugo is a tool that syncs content from Notion to a Hugo static site and deploys to Cloudflare Pages. It converts Notion pages and databases to Hugo-compatible Markdown files with YAML front matter.

## Tech Stack
- **Language**: TypeScript (Node.js >= 16)
- **Runtime**: tsx for direct TypeScript execution
- **Static Site Generator**: Hugo with DoIt theme
- **Deployment**: Cloudflare Pages
- **Package Manager**: npm

## Key Dependencies
- `@notionhq/client` - Official Notion API client
- `dotenv` - Environment variable management
- `front-matter` - YAML front matter parsing
- `fs-extra` - Enhanced file system operations
- `markdown-table` - Markdown table generation
- `yaml` - YAML serialization

## Environment Variables
- `NOTION_TOKEN` - Required. Notion integration token with Read Content and Read user info permissions

## Deployment
- CI/CD runs via GitHub Actions
- CD workflow runs daily at midnight UTC and on push to main
- Deploys to Cloudflare Pages
