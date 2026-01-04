# Quickstart: Switch to Blowfish Theme

**Feature Branch**: `001-blowfish-theme`
**Date**: 2026-01-04

## Prerequisites

- Go 1.12+ installed (`go version`)
- Hugo 0.110+ installed with extended edition (`hugo version`)
- Node.js 16+ installed (`node --version`)
- Notion integration token configured

## Migration Steps

### Step 1: Initialize Hugo Modules

```bash
# From repository root
hugo mod init github.com/prg.sh/notion-hugo
```

This creates `go.mod` and `go.sum` files for module management.

### Step 2: Create Module Configuration

Create `config/_default/module.toml`:

```toml
[[imports]]
disable = false
path = "github.com/nunocoracao/blowfish/v2"
```

### Step 3: Rename and Update Site Configuration

```bash
# Rename config file
mv config/_default/config.toml config/_default/hugo.toml
```

Update `hugo.toml` content:

```toml
baseURL = "https://example.org/"
languageCode = "en-us"
defaultContentLanguage = "en"
title = "My Site"
enableRobotsTXT = true
enableGitInfo = true
enableEmoji = true
# Remove: theme = "DoIt"
```

### Step 4: Create Blowfish Parameters

Replace `config/_default/params.toml` with:

```toml
colorScheme = "blowfish"
defaultAppearance = "light"
autoSwitchAppearance = true

enableSearch = true
enableCodeCopy = true

[homepage]
layout = "page"
showRecent = true
recentLimit = 10

[article]
showDate = true
showAuthor = true
showTaxonomies = true
showTableOfContents = true
showReadingTime = true

[list]
showDate = true
showSummary = true
```

### Step 5: Create Language Configuration

Rename and update `config/_default/languages.toml` → `config/_default/languages.en.toml`:

```toml
languageCode = "en"
languageName = "English"
weight = 1

[params]
displayName = "EN"
isoCode = "en"
```

### Step 6: Create Menu Configuration

Create `config/_default/menus.en.toml`:

```toml
[[main]]
name = "Posts"
pageRef = "/posts"
weight = 10

[[main]]
name = "Tags"
pageRef = "/tags"
weight = 20

[[main]]
name = "Categories"
pageRef = "/categories"
weight = 30

[[main]]
name = "About"
pageRef = "/about"
weight = 40
```

### Step 7: Update Front Matter Generation

Modify `src/render.ts` line ~36:

```typescript
// Change:
// frontMatter.featuredImage = featuredImageLink;
// To:
frontMatter.featureimage = featuredImageLink;
```

### Step 8: Download Theme and Test

```bash
# Download Blowfish theme module
hugo mod get -u

# Run type check
npm run typecheck

# Format code
npm run format

# Test sync
npm start

# Start dev server
npm run server
```

### Step 9: Verify Site

1. Open http://localhost:1313
2. Verify Blowfish styling applied
3. Check navigation menu works
4. Verify blog posts display correctly
5. Test dark/light mode toggle
6. Test search functionality
7. Verify images load via API proxy

### Step 10: Clean Up DoIt References

```bash
# Remove old DoIt theme if present as submodule
rm -rf themes/DoIt

# Remove DoIt override config if exists
rm -rf config/DoIt

# Update package.json description (optional)
# Change "DoIt" references to "Blowfish"
```

## Rollback Plan

If migration fails:

1. Revert `src/render.ts` change
2. Remove `go.mod`, `go.sum`
3. Remove `config/_default/module.toml`
4. Rename `hugo.toml` back to `config.toml`
5. Restore original `params.toml`
6. Remove `menus.en.toml`
7. Rename `languages.en.toml` back to `languages.toml`
8. Restore DoIt theme reference in config

## Verification Checklist

- [ ] `hugo mod graph` shows Blowfish v2 imported
- [ ] `npm run typecheck` passes
- [ ] `npm start` syncs content successfully
- [ ] `hugo` builds without errors
- [ ] Homepage displays with Blowfish styling
- [ ] Blog posts render correctly
- [ ] Navigation menu works
- [ ] Search functionality works
- [ ] Dark/light toggle works
- [ ] Images load via `/api?block_id=` proxy
- [ ] Open Graph meta tags present in page source
