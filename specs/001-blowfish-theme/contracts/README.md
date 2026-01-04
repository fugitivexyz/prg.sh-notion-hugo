# Contracts: Switch to Blowfish Theme

**Feature Branch**: `001-blowfish-theme`
**Date**: 2026-01-04

## No API Contracts Required

This feature involves a Hugo theme migration and does not introduce or modify any API endpoints.

### Existing Endpoints (Unchanged)

The existing Cloudflare Functions endpoint remains unchanged:

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api` | GET | Notion file proxy | **No changes** |

Query parameters:
- `block_id`: Fetch file from a Notion block
- `page_id`: Fetch cover from a Notion page

### Why No New Contracts

1. **No new API endpoints** - The Blowfish theme is purely a frontend change
2. **No backend modifications** - The Notion sync pipeline output format is adjusted but no new APIs
3. **Existing proxy preserved** - FR-010 specifies no modification to Cloudflare edge function

### Related Documentation

For data structure contracts, see:
- [data-model.md](../data-model.md) - Front matter field definitions
- [research.md](../research.md) - Configuration decisions
