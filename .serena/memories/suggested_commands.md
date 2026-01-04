# Suggested Commands

## Development Commands

```bash
# Install dependencies
npm install

# Sync content from Notion (requires NOTION_TOKEN env var)
npm start

# Run Hugo development server with live reload
npm run server

# Type check the TypeScript code
npm run typecheck

# Build TypeScript to JavaScript (outputs to ./dist)
npm run build

# Format code with Prettier
npm run format
```

## System Utilities (macOS/Darwin)

```bash
# Git operations
git status
git add .
git commit -m "message"
git push

# File operations
ls -la
cd <directory>
find . -name "*.ts"
grep -r "pattern" src/
```

## Hugo Commands

```bash
# Run Hugo server with drafts and cache disabled
hugo server -D --disableFastRender --noHTTPCache

# Build the site
hugo

# Build with verbose output
hugo -v
```

## Debugging

```bash
# Run with debug output
DEBUG=* npm start

# Check TypeScript errors
npm run typecheck
```
