-- Migration: introduce editorial `homepage_sections` control for platforms.
-- Run in the Supabase SQL Editor. Safe to run more than once (idempotent).

-- 1. Schema change: add the new column.
alter table public.platforms
  add column if not exists homepage_sections text[] not null default '{}';

-- 2. Data backfill: initialize `homepage_sections` from the legacy flags.
--    Existing values are never overwritten and duplicates are avoided.

-- featured = true  ->  add "featured"
update public.platforms
set homepage_sections = array_append(coalesce(homepage_sections, '{}'), 'featured')
where featured = true
  and not ('featured' = any(coalesce(homepage_sections, '{}')));

-- trending = true  ->  add "trending"
update public.platforms
set homepage_sections = array_append(coalesce(homepage_sections, '{}'), 'trending')
where trending = true
  and not ('trending' = any(coalesce(homepage_sections, '{}')));

-- Note: `featured` and `trending` columns are retained for backward
-- compatibility but are no longer used to drive homepage placement.
