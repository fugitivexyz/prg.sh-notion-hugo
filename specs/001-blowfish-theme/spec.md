# Feature Specification: Switch to Blowfish Theme

**Feature Branch**: `001-blowfish-theme`
**Created**: 2026-01-04
**Status**: Draft
**Input**: User description: "Switch to Blowfish theme while maintaining all Notion functionalities"

## Clarifications

### Session 2026-01-04

- Q: Theme installation method (Hugo module vs git submodule)? → A: Hugo module
- Q: Default appearance mode for new visitors? → A: Auto (respects system preference)
- Q: Which Blowfish color scheme to use? → A: Blowfish (default)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Blog Posts with Blowfish Theme (Priority: P1)

A site visitor navigates to the blog/website and sees content styled with the Blowfish theme's modern design. All existing blog posts synced from Notion are displayed correctly with proper formatting, images, and metadata.

**Why this priority**: This is the core value proposition - the site must render correctly with the new theme. Without this, nothing else matters.

**Independent Test**: Can be fully tested by navigating to the homepage and any blog post, verifying the Blowfish theme styling is applied and all content renders correctly.

**Acceptance Scenarios**:

1. **Given** a visitor accesses the homepage, **When** the page loads, **Then** they see the Blowfish theme styling applied with proper navigation, footer, and content layout
2. **Given** a visitor clicks on a blog post, **When** the post page loads, **Then** the content displays with Blowfish's article layout including hero images, reading time, and table of contents
3. **Given** a post has images sourced from Notion, **When** the page loads, **Then** images display correctly via the existing Notion file proxy API

---

### User Story 2 - Content Sync from Notion Preserved (Priority: P1)

A content author creates or updates a page in Notion. When the sync process runs, the content is correctly converted to Markdown with Blowfish-compatible front matter, and the page appears on the site with all formatting intact.

**Why this priority**: The Notion-to-Hugo sync pipeline is the core functionality that must continue working. Without this, the site cannot be updated.

**Independent Test**: Can be tested by creating a test page in Notion, running the sync, and verifying the generated Markdown file has correct Blowfish front matter and content.

**Acceptance Scenarios**:

1. **Given** a new page exists in Notion, **When** the sync runs, **Then** a Markdown file is created with Blowfish-compatible front matter fields (title, date, lastmod, description, authors)
2. **Given** a Notion page has a cover image, **When** the sync runs, **Then** the front matter includes the image as a hero/feature image using Blowfish's expected field name
3. **Given** a Notion page has categories and tags, **When** the sync runs, **Then** these appear in front matter as Blowfish-compatible taxonomy fields

---

### User Story 3 - Navigate Site Using Theme Features (Priority: P2)

A visitor uses the Blowfish theme's navigation features including the main menu, search functionality, dark/light mode toggle, and category/tag browsing to explore the site.

**Why this priority**: Navigation features enhance user experience but the site functions without them. Implementing after core rendering ensures a polished final product.

**Independent Test**: Can be tested by using each navigation feature (menu, search, theme toggle, taxonomies) and verifying they work correctly.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they click menu items, **Then** they navigate to the correct sections (Posts, Tags, Categories, About)
2. **Given** a visitor wants to search, **When** they use the search feature, **Then** they can find posts by title or content
3. **Given** a visitor prefers dark mode, **When** they toggle the theme, **Then** the site switches between light and dark appearances

---

### User Story 4 - Notion File Proxy Continues Working (Priority: P2)

When viewing any page with Notion-hosted images or files, the existing Cloudflare edge function correctly proxies these files, handling S3 URL expiration transparently.

**Why this priority**: Images are critical for content but the infrastructure already exists. This story ensures theme migration doesn't break the existing proxy.

**Independent Test**: Can be tested by viewing a post with Notion-hosted images and verifying they load correctly after S3 URL expiration.

**Acceptance Scenarios**:

1. **Given** a post contains Notion-hosted images, **When** a visitor loads the page, **Then** images display via the `/api?block_id=xxx` proxy endpoint
2. **Given** an image's original Notion S3 URL has expired, **When** the proxy is called, **Then** it fetches a fresh URL from Notion API and returns the image

---

### User Story 5 - Social Sharing and SEO Preserved (Priority: P3)

When sharing a page on social media or when search engines crawl the site, proper Open Graph tags, Twitter cards, and SEO metadata are present using Blowfish's built-in features.

**Why this priority**: SEO and social sharing are important for discoverability but don't affect core functionality.

**Independent Test**: Can be tested by inspecting page source for meta tags and using social media debugger tools.

**Acceptance Scenarios**:

1. **Given** any page on the site, **When** viewing page source, **Then** proper Open Graph and Twitter Card meta tags are present with title, description, and image
2. **Given** a blog post with a featured image, **When** shared on social media, **Then** the image appears in the link preview

---

### Edge Cases

- What happens when a Notion page has properties not supported by Blowfish? The sync should preserve them in front matter without breaking the theme.
- How does the system handle pages with no cover image? Blowfish should gracefully fall back to a text-only layout.
- What happens when a Notion page has very long content? Table of contents should help navigation.
- How does the system handle Notion-specific features like callouts, toggles, and code blocks? These should render using Blowfish shortcodes or standard Markdown.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST replace the DoIt theme with Blowfish theme installed as a Hugo module
- **FR-002**: System MUST configure Blowfish theme settings in `config/_default/` directory following Blowfish conventions, using the "blowfish" color scheme
- **FR-003**: System MUST map existing DoIt-specific front matter fields to Blowfish equivalents (`featuredImage` → `featureimage`)
- **FR-004**: System MUST update the render.ts to generate Blowfish-compatible front matter fields
- **FR-005**: System MUST preserve existing Notion property-to-front-matter mapping functionality
- **FR-006**: System MUST maintain the `NOTION_METADATA` and `MANAGED_BY_NOTION_HUGO` tracking flags in front matter
- **FR-007**: System MUST configure Blowfish menu structure equivalent to current navigation (Posts, Tags, Categories, About)
- **FR-008**: System MUST enable Blowfish's built-in search functionality
- **FR-009**: System MUST configure Blowfish's dark/light mode toggle with "auto" as the default appearance (respects visitor's system preference)
- **FR-010**: System MUST preserve the Cloudflare edge function for Notion file proxying without modification
- **FR-011**: System MUST configure Blowfish's homepage layout to display recent posts
- **FR-012**: System MUST update any theme-specific shortcodes used in content to Blowfish equivalents
- **FR-013**: System MUST remove DoIt theme configuration files and references after migration
- **FR-014**: System MUST configure Blowfish's taxonomy pages for tags and categories
- **FR-015**: System MUST support Blowfish's author display feature using existing `authors` front matter field

### Key Entities

- **Hugo Configuration**: Site-level settings in TOML format controlling theme behavior, menus, and global options
- **Front Matter**: YAML metadata in each Markdown file defining title, date, images, taxonomies, and custom fields
- **Theme Module**: Blowfish theme installed as Hugo module or git submodule providing layouts and assets
- **Content Files**: Markdown files generated by Notion sync with front matter and content body
- **Cloudflare Function**: Edge function proxying Notion file URLs to handle S3 expiration

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All existing blog posts render correctly with the Blowfish theme without manual content edits
- **SC-002**: Site visitors can navigate using main menu, search, and taxonomy pages with 100% functionality
- **SC-003**: Content sync from Notion continues to work with zero configuration changes to Notion workspace
- **SC-004**: Page load performance remains comparable or better than current DoIt theme (within 500ms variance)
- **SC-005**: All Notion-hosted images continue loading via the file proxy without errors
- **SC-006**: Dark/light mode toggle works correctly across all pages
- **SC-007**: Social sharing previews display correct title, description, and image for blog posts
- **SC-008**: Site builds successfully with Hugo using Blowfish theme without warnings or errors

## Assumptions

- Blowfish theme will be installed as a Hugo module, enabling streamlined dependency management and updates
- Existing content in the `content/` directory does not require manual reformatting beyond front matter field mapping
- The Cloudflare edge function (`functions/api.ts`) requires no changes as it's theme-agnostic
- Blowfish's default homepage layout (showing recent posts) is acceptable, matching current DoIt behavior
- The "Blowfish" color scheme (theme default) will be used; custom color schemes are out of scope for this feature
- Existing taxonomies (tags, categories) will work with Blowfish's built-in taxonomy templates
