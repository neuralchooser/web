-- Rate limiting table for admin login brute-force protection.
-- Run in Supabase SQL Editor.

create table if not exists public.login_attempts (
  id uuid default gen_random_uuid() primary key,
  ip text not null,
  attempted_at timestamptz not null default now()
);

-- Index for fast IP + time range lookups
create index if not exists login_attempts_ip_time_idx
  on public.login_attempts(ip, attempted_at desc);

-- Enable RLS: only the service role can read/write this table
alter table public.login_attempts enable row level security;

create policy "service_role full access" on public.login_attempts
  for all to service_role
  using (true)
  with check (true);

-- Optional: periodic cleanup of records older than 24 hours.
-- Can be run via Supabase cron (pg_cron) or a scheduled function:
-- delete from public.login_attempts where attempted_at < now() - interval '24 hours';
