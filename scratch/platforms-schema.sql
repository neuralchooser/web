

create table public.platforms (
  id uuid not null default gen_random_uuid (),
  slug text not null,
  name text null,
  company text null,
  logo text null,
  accent_color text null,
  short_description text null,
  description text null,
  website text null,
  documentation text null,
  categories text[] null,
  tags text[] null,
  pricing_free boolean null default false,
  pricing_paid boolean null default false,
  pricing_notes text null,
  api_available boolean null default false,
  open_source boolean null default false,
  featured boolean null default false,
  trending boolean null default false,
  homepage_sections text[] not null default '{}',
  last_updated date null,
  is_monochrome_logo boolean not null default false,
  is_active boolean not null default true,
  is_deleted boolean not null default false,
  constraint platforms_pkey primary key (id),
  constraint platforms_slug_key unique (slug)
) TABLESPACE pg_default;


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
