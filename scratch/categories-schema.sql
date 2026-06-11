-- RLS policies and constraints for the categories table.
-- Run in Supabase SQL Editor.

-- Enable Row Level Security
alter table public.categories enable row level security;

-- Anonymous users: SELECT only
create policy "Allow public read access" on public.categories
  for select to anon, authenticated
  using (true);

-- Service role: unrestricted access for all admin operations
create policy "Allow service_role full access" on public.categories
  for all to service_role
  using (true)
  with check (true);

-- UNIQUE constraint on slug.
-- If duplicate slugs exist, run this first to identify them:
--   select slug, count(*) from public.categories group by slug having count(*) > 1;
-- Then resolve duplicates before applying the constraint.
alter table public.categories
  add constraint if not exists categories_slug_unique unique (slug);
