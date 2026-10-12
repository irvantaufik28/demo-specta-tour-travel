# Supabase foundation

This directory contains the database lifecycle for the Specta CMS.

- `migrations/` contains versioned SQL migrations.
- `seed.sql` is reserved for optional local development content.
- Generated database types belong in `src/types/database.ts`.

## Current schema

`202610120001_cms_core.sql` creates the first CMS foundation:

- pages and their SEO metadata;
- code-owned page sections with editable JSON content;
- global site settings;
- media metadata for a later Supabase Storage integration;
- Row Level Security for public reading and authenticated CMS management.

The migration file is ready locally. Applying it to the remote Supabase project
requires the project to be linked with the Supabase CLI first.
