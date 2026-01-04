# Implementation Plan: Switch to Blowfish Theme

**Branch**: `001-blowfish-theme` | **Date**: 2026-01-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-blowfish-theme/spec.md`

## Summary

Replace the DoIt Hugo theme with Blowfish theme, installed as a Hugo module. This requires updating Hugo configuration files to use Blowfish conventions, modifying `src/render.ts` to generate Blowfish-compatible front matter fields (e.g., `featuredImage` → `featureimage`), and removing DoIt-specific configuration. The existing Notion sync pipeline and Cloudflare file proxy remain unchanged.

## Technical Context

**Language/Version**: TypeScript 5.9 (sync pipeline), Hugo 0.110+ (static site generator), Go 1.12+ (Hugo modules)
**Primary Dependencies**: `@notionhq/client`, Hugo, Blowfish theme v2 (`github.com/nunocoracao/blowfish/v2`)
**Storage**: File-based (Markdown content in `content/`, config in `config/_default/`)
**Testing**: Manual testing with `npm start` (sync), `hugo server` (site preview), `npm run typecheck` (TypeScript)
**Target Platform**: Cloudflare Pages (deployment), Node.js 16+ (sync runtime)
**Project Type**: Single project (Hugo static site with TypeScript sync tooling)
**Performance Goals**: Site builds without errors, page loads within 500ms variance of current DoIt theme
**Constraints**: Must maintain backward compatibility with existing Notion sync workflow, no changes to Cloudflare Functions
**Scale/Scope**: ~50-100 synced pages, single-language site (English)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Evaluation

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. Code Quality | TypeScript code passes `npm run typecheck`, code formatted with `npm run format` | PASS | Only modifying `render.ts` front matter field mapping |
| II. Testing Standards | Changes tested with `npm start`, edge cases handled | PASS | Will test sync with real Notion workspace, verify Hugo build |
| III. User Experience Consistency | Markdown output preserves Notion content, MANAGED_BY_NOTION_HUGO flag maintained | PASS | Front matter changes are additive/mapping only |
| IV. Performance Requirements | Sync skips unchanged pages, build time reasonable | PASS | No changes to sync logic, only output format |

### Post-Design Re-Evaluation (Phase 1 Complete)

| Principle | Verification | Status | Evidence |
|-----------|-------------|--------|----------|
| I. Code Quality | Single file change in `render.ts` (line ~36) | PASS | Change is minimal: rename `featuredImage` → `featureimage` |
| II. Testing Standards | Testing plan documented in quickstart.md | PASS | Verification checklist includes sync, build, and UI tests |
| III. User Experience | Front matter mapping preserves all fields | PASS | data-model.md shows complete field mapping; MANAGED_BY_NOTION_HUGO unchanged |
| IV. Performance | No changes to sync algorithm | PASS | Only output field name changes; skip-unchanged logic untouched |

**Quality Gates Checklist:**
- [ ] Type Check: `npm run typecheck` passes
- [ ] Format: `npm run format` applied
- [ ] Sync Test: `npm start` completes successfully
- [ ] Build Test: `hugo` builds without errors

## Project Structure

### Documentation (this feature)

```text
specs/001-blowfish-theme/
├── plan.md              # This file
├── research.md          # Phase 0 output: Blowfish configuration research
├── data-model.md        # Phase 1 output: Front matter field mappings
├── quickstart.md        # Phase 1 output: Migration steps
├── contracts/           # Phase 1 output: Not applicable (no API contracts)
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Existing structure (to be modified)
config/_default/
├── config.toml          # Rename to hugo.toml, update theme reference
├── module.toml          # NEW: Hugo module import for Blowfish
├── params.toml          # Replace with Blowfish params
├── languages.toml       # Update to languages.en.toml format
├── menus.en.toml        # NEW: Blowfish menu configuration
├── markup.toml          # Keep or update for Blowfish compatibility
├── outputs.toml         # Keep
├── outputFormats.toml   # Keep
├── permalinks.toml      # Keep
├── taxonomies.toml      # Keep
├── sitemap.toml         # Keep
├── pagination.toml      # Keep
├── privacy.toml         # Keep
└── mediaTypes.toml      # Keep

src/
├── render.ts            # MODIFY: Update front matter field mapping
└── [other files]        # No changes required

# To be removed
config/DoIt/             # Remove if exists (DoIt-specific overrides)
```

**Structure Decision**: Single project structure maintained. Hugo configuration files in `config/_default/` will be updated to Blowfish conventions. TypeScript sync code in `src/` only requires changes to `render.ts` for front matter field mapping.

## Complexity Tracking

No constitution violations requiring justification. The migration is straightforward:
1. Theme replacement via Hugo module (standard Hugo pattern)
2. Configuration file updates (Blowfish uses similar structure to DoIt)
3. Single TypeScript file modification (front matter field renaming)
