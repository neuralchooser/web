-- RLS policies and constraints for the platforms table.
-- Run in Supabase SQL Editor.

-- Enable Row Level Security
alter table public.platforms enable row level security;

-- Anonymous users: read published (non-deleted) rows only
create policy "Allow public read access" on public.platforms
  for select to anon, authenticated
  using (is_deleted = false);

-- Service role: unrestricted access for all admin operations
create policy "Allow service_role full access" on public.platforms
  for all to service_role
  using (true)
  with check (true);

-- UNIQUE constraint on slug.
-- If duplicate slugs exist, run this first to identify them:
--   select slug, count(*) from public.platforms group by slug having count(*) > 1;
-- Then resolve duplicates before applying the constraint.
alter table public.platforms
  add constraint if not exists platforms_slug_unique unique (slug);
