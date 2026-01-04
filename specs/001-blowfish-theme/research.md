# Research: Switch to Blowfish Theme

**Feature Branch**: `001-blowfish-theme`
**Date**: 2026-01-04

## Research Summary

This document consolidates research findings for migrating from DoIt theme to Blowfish theme.

---

## 1. Theme Installation Method

### Decision
Install Blowfish via Hugo Modules (not git submodule)

### Rationale
- Hugo Modules provide streamlined dependency management
- Automatic version updates via `hugo mod get -u`
- No need to manage submodule checkouts
- Consistent with spec requirement (FR-001)
- Industry best practice for Hugo themes since Hugo 0.56

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Git submodule | Requires manual update tracking, more complex CI/CD |
| Direct file copy | No version management, harder to update |

### Implementation
1. Initialize Hugo module: `hugo mod init github.com/prg.sh/notion-hugo`
2. Create `config/_default/module.toml`:
   ```toml
   [[imports]]
   disable = false
   path = "github.com/nunocoracao/blowfish/v2"
   ```

---

## 2. Front Matter Field Mapping

### Decision
Map DoIt `featuredImage` to Blowfish `featureimage` (lowercase)

### Rationale
- Blowfish uses lowercase field names
- Minimal change required in `render.ts`
- Both themes support hero/feature image concept

### Field Mapping Table
| DoIt Field | Blowfish Field | Notes |
|------------|----------------|-------|
| `featuredImage` | `featureimage` | Lowercase in Blowfish |
| `title` | `title` | No change |
| `date` | `date` | No change |
| `lastmod` | `lastmod` | No change |
| `draft` | `draft` | No change |
| `tags` | `tags` | No change (taxonomy) |
| `categories` | `categories` | No change (taxonomy) |
| `authors` | `authors` | Compatible with Blowfish authors feature |
| `description` | `description` | No change |

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Keep `featuredImage` | Blowfish doesn't recognize it |
| Use `thumbnail` | `featureimage` is the primary Blowfish field |

---

## 3. Configuration File Structure

### Decision
Adopt Blowfish's modular configuration pattern with language-specific files

### Rationale
- Blowfish expects `languages.en.toml` and `menus.en.toml` patterns
- Cleaner separation of concerns
- Better multi-language support if needed later

### Files to Create/Modify
| File | Action | Purpose |
|------|--------|---------|
| `config.toml` → `hugo.toml` | Rename + modify | Blowfish naming convention |
| `module.toml` | Create | Hugo module import |
| `params.toml` | Replace | Blowfish parameters |
| `languages.toml` → `languages.en.toml` | Rename + modify | Language-specific format |
| `menus.en.toml` | Create | Navigation menu |
| `markup.toml` | Keep/update | Goldmark settings |

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Single `config.toml` | Less organized, harder to maintain |
| Keep DoIt file names | Blowfish docs assume standard naming |

---

## 4. Color Scheme Selection

### Decision
Use "blowfish" color scheme (theme default)

### Rationale
- Explicitly specified in clarifications (Session 2026-01-04)
- Clean, professional appearance
- No custom CSS required

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| `ocean`, `fire`, etc. | User selected default `blowfish` scheme |
| Custom scheme | Out of scope per spec assumptions |

---

## 5. Appearance Mode Configuration

### Decision
Set `defaultAppearance = "light"` with `autoSwitchAppearance = true`

### Rationale
- User clarification requested "Auto (respects system preference)"
- Blowfish's `autoSwitchAppearance` provides this behavior
- Light as fallback when system preference unavailable

### Implementation
```toml
# params.toml
colorScheme = "blowfish"
defaultAppearance = "light"
autoSwitchAppearance = true
```

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| `defaultAppearance = "dark"` | Light is more accessible default |
| Disable auto-switch | User explicitly wanted system preference |

---

## 6. Menu Structure Migration

### Decision
Create equivalent navigation menu in Blowfish format

### Rationale
- Spec requires equivalent navigation (FR-007)
- Blowfish uses `menus.en.toml` format
- Supports icons, weights, and nested menus

### Current DoIt Menu → Blowfish Menu
| Item | Route | Blowfish Config |
|------|-------|-----------------|
| Posts | `/posts/` | `[[main]] identifier = "posts"` |
| Tags | `/tags/` | `[[main]] identifier = "tags"` |
| Categories | `/categories/` | `[[main]] identifier = "categories"` |
| About | `/about/` | `[[main]] identifier = "about"` |

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Recreate menu manually | Same result, more error-prone |
| Skip menu migration | Breaks user navigation |

---

## 7. Shortcode Compatibility

### Decision
Map DoIt shortcodes to Blowfish equivalents or standard Markdown

### Rationale
- Blowfish has rich shortcode library including `alert`, `admonition`
- Standard Markdown callouts supported via GitHub/Obsidian syntax
- Notion sync uses generic Markdown, minimal shortcode usage expected

### Shortcode Mapping
| DoIt/Current | Blowfish Equivalent |
|--------------|---------------------|
| `{{< notice >}}` | `{{< alert >}}` or `> [!NOTE]` |
| `{{< code >}}` | Standard fenced code blocks |
| Custom blocks | `{{< alert >}}` with icons |

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Create compatibility shim | Over-engineering for minimal usage |
| Keep DoIt shortcodes | Theme doesn't provide them |

---

## 8. Search Functionality

### Decision
Enable Blowfish's built-in Fuse.js search

### Rationale
- Spec requires search functionality (FR-008)
- Blowfish provides client-side search out of the box
- No external dependencies

### Implementation
```toml
# params.toml
enableSearch = true
```

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Algolia | External dependency, cost |
| Disable search | Spec requires it |

---

## 9. Homepage Layout

### Decision
Use Blowfish's `page` layout with recent posts list

### Rationale
- Matches current DoIt behavior (recent posts on homepage)
- `page` layout is most similar to DoIt's default
- Can show paginated post list

### Implementation
```toml
# params.toml
[homepage]
layout = "page"
showRecent = true
recentLimit = 10
```

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| `profile` layout | Requires profile setup |
| `hero` layout | More landing-page focused |
| `card` layout | Different visual style |

---

## 10. Image Proxy Compatibility

### Decision
No changes needed to Cloudflare Functions

### Rationale
- File proxy is theme-agnostic
- Uses `/api?block_id=xxx` URL pattern
- Blowfish renders image URLs without modification

### Verification
- Image URLs in front matter (`featureimage`) pass through unchanged
- Markdown image syntax preserved by sync pipeline
- Cloudflare Functions handle S3 URL expiration independently

---

## Open Questions Resolved

All NEEDS CLARIFICATION items from Technical Context have been resolved:

1. **Hugo module initialization** → Use `hugo mod init` with project path
2. **Front matter mapping** → `featuredImage` → `featureimage`
3. **Config file structure** → Adopt Blowfish's modular pattern
4. **Color scheme** → Use default "blowfish"
5. **Appearance mode** → Auto with light fallback
6. **Menu migration** → Direct mapping to `menus.en.toml`
7. **Shortcode compatibility** → Use Blowfish equivalents
8. **Search** → Enable built-in Fuse.js
9. **Homepage** → `page` layout with recent posts
10. **Image proxy** → No changes needed
