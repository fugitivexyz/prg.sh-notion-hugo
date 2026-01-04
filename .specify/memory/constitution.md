<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version change: 0.0.0 → 1.0.0 (MAJOR - Initial constitution creation)

Added principles:
- I. Code Quality
- II. Testing Standards
- III. User Experience Consistency
- IV. Performance Requirements

Added sections:
- Core Principles (4 principles)
- Quality Gates
- Development Workflow
- Governance

Templates requiring updates:
- .specify/templates/plan-template.md: ✅ Compatible (Constitution Check section exists)
- .specify/templates/spec-template.md: ✅ Compatible (Success Criteria section exists)
- .specify/templates/tasks-template.md: ✅ Compatible (test phases supported)

Follow-up TODOs: None
================================================================================
-->

# Notion-Hugo Constitution

## Core Principles

### I. Code Quality

All code contributions MUST adhere to established quality standards that ensure maintainability,
readability, and correctness.

**Non-negotiable rules:**

- All TypeScript code MUST pass `npm run typecheck` without errors
- Code MUST be formatted using `npm run format` before committing
- Functions MUST have clear, single responsibilities
- Complex logic MUST include explanatory comments
- Deprecated patterns MUST NOT be introduced; existing deprecations SHOULD be addressed
  when modifying related code
- Magic numbers and strings MUST be replaced with named constants
- Error handling MUST be explicit; silent failures are prohibited

**Rationale**: This project syncs content from Notion to Hugo and deploys to Cloudflare Pages.
Reliability is critical—sync failures can cause content loss or deployment issues.

### II. Testing Standards

All features MUST be verifiable through documented testing procedures that ensure correctness
across the sync pipeline.

**Non-negotiable rules:**

- Changes to the sync pipeline (src/) MUST include manual testing with a Notion workspace
- The `npm start` command MUST complete successfully before merging
- Edge cases (empty pages, missing properties, expired URLs) MUST be considered and handled
- Breaking changes to Notion API handling MUST be validated against real API responses
- Cloudflare Functions (functions/) MUST be tested with valid and expired Notion URLs

**Rationale**: The sync pipeline handles user content; bugs can corrupt or lose data.
Integration with external APIs (Notion, Cloudflare) requires real-world validation.

### III. User Experience Consistency

The generated Hugo site MUST provide a consistent, predictable experience for end users
consuming the content.

**Non-negotiable rules:**

- Markdown output MUST preserve Notion content structure and formatting intent
- Hugo front matter MUST follow the established YAML schema
- Images and files MUST be served via the `/api` proxy to avoid expiration issues
- The `MANAGED_BY_NOTION_HUGO` flag MUST be correctly set for all synced content
- Orphaned files MUST be cleaned up when content is removed from Notion
- URL structures MUST remain stable; changes require migration consideration

**Rationale**: Users rely on predictable output for their Hugo themes and publishing workflows.
Breaking changes to output format can cascade into site-wide issues.

### IV. Performance Requirements

The sync process and deployed site MUST meet performance expectations for practical usage.

**Non-negotiable rules:**

- Sync operations MUST skip unchanged pages (compare `last_edited_time`)
- The Cloudflare Functions API proxy MUST use KV caching to minimize Notion API calls
- Large databases (100+ pages) MUST complete sync within reasonable time bounds
- Memory usage during sync MUST remain bounded regardless of content volume
- Generated Markdown files MUST NOT include unnecessary whitespace or formatting bloat

**Rationale**: The CD workflow runs daily; excessive processing time or API calls impact
GitHub Actions costs and Notion API rate limits.

## Quality Gates

All pull requests MUST pass the following gates before merging:

| Gate | Requirement | Tool/Command |
|------|-------------|--------------|
| Type Check | Zero type errors | `npm run typecheck` |
| Format | Code formatted | `npm run format` |
| Sync Test | Successful sync execution | `npm start` |
| Build Test | Hugo builds without errors | `hugo` |

## Development Workflow

1. **Branch naming**: Use descriptive branch names (e.g., `fix-image-sync`, `add-callout-support`)
2. **Commit messages**: Use conventional commits format (e.g., `fix:`, `feat:`, `docs:`)
3. **Pull requests**: Include description of changes and testing performed
4. **Review**: Changes to sync pipeline require careful review of Notion API interactions
5. **Deployment**: Merges to main trigger automatic deployment via GitHub Actions

## Governance

This constitution supersedes all other development practices for this repository.

**Amendment procedure:**
1. Propose changes via pull request modifying this file
2. Document rationale for the change
3. Update dependent templates if principles are added/removed
4. Increment version according to semantic versioning:
   - MAJOR: Principle removals or incompatible redefinitions
   - MINOR: New principles or material expansions
   - PATCH: Clarifications and wording improvements

**Compliance review:**
- All PRs MUST be checked against Core Principles
- Constitution violations MUST be addressed before merging
- Exceptions require explicit documentation and justification

**Version**: 1.0.0 | **Ratified**: 2026-01-04 | **Last Amended**: 2026-01-04
