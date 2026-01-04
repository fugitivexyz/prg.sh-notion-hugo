# Task Completion Checklist

Before considering a task complete, ensure the following:

## Code Quality
- [ ] Run `npm run typecheck` - ensure no TypeScript errors
- [ ] Run `npm run format` - format code with Prettier

## Testing
- [ ] Run `npm start` with a valid `NOTION_TOKEN` to test the sync pipeline
- [ ] Run `npm run server` to verify Hugo builds and serves correctly

## Git
- [ ] Stage relevant changes: `git add <files>`
- [ ] Commit with descriptive message: `git commit -m "description"`
- [ ] Push if ready: `git push`

## Common Verification Steps

### For sync pipeline changes (`src/`)
1. Ensure `npm run typecheck` passes
2. Test with `npm start` (requires `NOTION_TOKEN`)
3. Verify generated Markdown files in `content/` are correct

### For Hugo/theme changes (`config/`, `layouts/`, `themes/`)
1. Run `npm run server` to preview changes
2. Check that pages render correctly in browser

### For Cloudflare function changes (`functions/`)
1. Ensure `npm run typecheck` passes
2. Test deployment on Cloudflare Pages

## CI/CD Notes
- CI runs `npm run typecheck` on all PRs and pushes to main
- CD deploys automatically on push to main and daily at midnight UTC
