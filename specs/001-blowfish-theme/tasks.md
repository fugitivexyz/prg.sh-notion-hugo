# Tasks: Switch to Blowfish Theme

**Input**: Design documents from `/specs/001-blowfish-theme/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested in specification. Manual verification included in Polish phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Config files**: `config/_default/`
- **TypeScript source**: `src/`
- **Generated content**: `content/`

---

## Phase 1: Setup (Hugo Module Initialization)

**Purpose**: Initialize Hugo modules and create base module configuration

- [x] T001 Initialize Hugo modules with `hugo mod init github.com/prg.sh/notion-hugo` at repository root
- [x] T002 Create Hugo module import configuration in config/_default/module.toml
- [x] T003 Run `hugo mod get -u` to download Blowfish theme module

---

## Phase 2: Foundational (Core Configuration)

**Purpose**: Core Hugo configuration that MUST be complete before user stories can be tested

**⚠️ CRITICAL**: No user story can be fully tested until this phase is complete

- [x] T004 Rename config/_default/config.toml to config/_default/hugo.toml and remove `theme = "DoIt"` line
- [x] T005 [P] Create Blowfish parameters configuration in config/_default/params.toml (colorScheme, defaultAppearance, autoSwitchAppearance, homepage layout)
- [x] T006 [P] Rename config/_default/languages.toml to config/_default/languages.en.toml with Blowfish format
- [x] T007 Verify Hugo builds without errors using `hugo` command

**Checkpoint**: Foundation ready - theme is installed and basic configuration complete

---

## Phase 3: User Story 1 - View Blog Posts with Blowfish Theme (Priority: P1) 🎯 MVP

**Goal**: Site renders with Blowfish theme styling, all blog posts display correctly

**Independent Test**: Navigate to homepage and any blog post, verify Blowfish styling is applied with proper navigation, footer, and content layout

### Implementation for User Story 1

- [x] T008 [US1] Configure article display settings in config/_default/params.toml ([article] section: showDate, showAuthor, showTaxonomies, showTableOfContents, showReadingTime)
- [x] T009 [US1] Configure list display settings in config/_default/params.toml ([list] section: showDate, showSummary)
- [x] T010 [US1] Configure taxonomy pages in config/_default/params.toml ([taxonomy] and [term] sections)
- [x] T011 [US1] Run `hugo server` and verify homepage displays with Blowfish styling
- [x] T012 [US1] Verify individual blog post pages render correctly with article layout
- [x] T013 [US1] Audit content/ directory for DoIt-specific shortcodes and convert to Blowfish equivalents or standard Markdown

**Checkpoint**: User Story 1 complete - site renders with Blowfish theme, posts display correctly

---

## Phase 4: User Story 2 - Content Sync from Notion Preserved (Priority: P1)

**Goal**: Notion sync generates Blowfish-compatible front matter, content displays correctly

**Independent Test**: Run sync (`npm start`), verify generated Markdown has correct Blowfish front matter fields (featureimage instead of featuredImage)

### Implementation for User Story 2

- [x] T014 [US2] Update front matter field mapping in src/render.ts: change `featuredImage` to `featureimage` at line ~36
- [x] T015 [US2] Run `npm run typecheck` to verify TypeScript compiles without errors
- [x] T016 [US2] Run `npm run format` to format code
- [x] T017 [US2] Run `npm start` to test sync with Notion (requires NOTION_TOKEN)
- [x] T018 [US2] Verify generated Markdown files have `featureimage` field instead of `featuredImage`
- [x] T019 [US2] Verify NOTION_METADATA and MANAGED_BY_NOTION_HUGO flags are preserved in front matter

**Checkpoint**: User Story 2 complete - sync produces Blowfish-compatible content

---

## Phase 5: User Story 3 - Navigate Site Using Theme Features (Priority: P2)

**Goal**: Menu, search, and dark/light mode toggle work correctly

**Independent Test**: Use menu items, search feature, and theme toggle; verify all function correctly

### Implementation for User Story 3

- [x] T020 [US3] Create menu configuration in config/_default/menus.en.toml (Posts, Tags, Categories, About)
- [x] T021 [US3] Verify search is enabled in config/_default/params.toml (enableSearch = true)
- [x] T022 [US3] Verify dark/light mode is configured in config/_default/params.toml (defaultAppearance = "light", autoSwitchAppearance = true)
- [x] T023 [US3] Run `hugo server` and test menu navigation works
- [x] T024 [US3] Test search functionality finds posts by title or content
- [x] T025 [US3] Test dark/light mode toggle switches appearance correctly

**Checkpoint**: User Story 3 complete - navigation features work correctly

---

## Phase 6: User Story 4 - Notion File Proxy Continues Working (Priority: P2)

**Goal**: Images proxied through Cloudflare Functions continue to display

**Independent Test**: View a post with Notion-hosted images, verify they load via `/api?block_id=xxx`

### Verification for User Story 4

- [x] T026 [US4] Verify no changes were made to functions/api.ts (should remain unchanged)
- [x] T027 [US4] Open a blog post with Notion-hosted images and verify images display correctly
- [x] T028 [US4] Inspect network requests to confirm images load via `/api?block_id=xxx` endpoint

**Checkpoint**: User Story 4 complete - image proxy works with Blowfish theme

---

## Phase 7: User Story 5 - Social Sharing and SEO Preserved (Priority: P3)

**Goal**: Open Graph and Twitter Card meta tags are present for social sharing

**Independent Test**: Inspect page source for meta tags, verify OG and Twitter Card tags present

### Verification for User Story 5

- [x] T029 [US5] View page source of homepage and verify Open Graph meta tags present (og:title, og:description, og:image)
- [x] T030 [US5] View page source of a blog post and verify Twitter Card meta tags present
- [x] T031 [US5] Verify featured images appear in social sharing meta tags

**Checkpoint**: User Story 5 complete - SEO and social sharing preserved

---

## Phase 8: Polish & Cleanup

**Purpose**: Remove DoIt references, final verification, documentation updates

- [x] T032 [P] Remove themes/DoIt directory if exists (legacy submodule)
- [x] T033 [P] Remove config/DoIt directory if exists (legacy overrides)
- [x] T034 Update package.json description to reference Blowfish instead of DoIt
- [ ] T035 Run final `hugo build` and verify no warnings or errors
- [ ] T036 Run quickstart.md verification checklist to confirm all items pass
- [ ] T037 Commit all changes with descriptive commit message

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion (can run parallel to US1)
- **User Story 3 (Phase 5)**: Depends on Phase 2 completion (can run parallel to US1, US2)
- **User Story 4 (Phase 6)**: Depends on Phase 2 completion (verification only)
- **User Story 5 (Phase 7)**: Depends on Phase 2 completion (verification only)
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

```
Phase 1 (Setup)
    │
    ▼
Phase 2 (Foundational) ─── BLOCKS ALL USER STORIES
    │
    ├──────────────┬──────────────┬──────────────┬──────────────┐
    ▼              ▼              ▼              ▼              ▼
Phase 3 (US1)  Phase 4 (US2)  Phase 5 (US3)  Phase 6 (US4)  Phase 7 (US5)
    │              │              │              │              │
    └──────────────┴──────────────┴──────────────┴──────────────┘
                                  │
                                  ▼
                          Phase 8 (Polish)
```

### Parallel Opportunities

Within each phase, tasks marked [P] can run in parallel:

**Phase 2 (Foundational)**:
- T005 (params.toml) and T006 (languages.en.toml) can run in parallel

**Phase 8 (Polish)**:
- T031 and T032 (directory cleanup) can run in parallel

**Cross-Phase Parallelism**:
After Phase 2 completes, ALL user stories (US1-US5) can be worked on in parallel by different team members.

---

## Parallel Example: After Foundational Phase

```bash
# After Phase 2 completes, launch user stories in parallel:

# Developer A: User Story 1 (rendering)
Task: "Configure article display settings in config/_default/params.toml"

# Developer B: User Story 2 (sync pipeline)
Task: "Update front matter field mapping in src/render.ts"

# Developer C: User Story 3 (navigation)
Task: "Create menu configuration in config/_default/menus.en.toml"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup (3 tasks)
2. Complete Phase 2: Foundational (4 tasks)
3. Complete Phase 3: User Story 1 (5 tasks)
4. Complete Phase 4: User Story 2 (6 tasks)
5. **STOP and VALIDATE**: Site renders with Blowfish, sync works
6. Deploy/demo MVP

### Incremental Delivery

1. Setup + Foundational → Theme installed, basic config
2. Add US1 → Test rendering → Demo
3. Add US2 → Test sync → Demo (MVP complete!)
4. Add US3 → Test navigation → Demo
5. Add US4 → Verify proxy → Demo
6. Add US5 → Verify SEO → Demo
7. Polish → Final cleanup → Release

---

## Notes

- Total tasks: 37 (T001-T037)
- Tasks marked [P] can be executed in parallel
- [USn] label maps task to specific user story
- US1 and US2 together form the MVP
- US4 and US5 are primarily verification (no code changes)
- Commit after each completed phase or user story
- Use rollback plan in quickstart.md if migration fails
