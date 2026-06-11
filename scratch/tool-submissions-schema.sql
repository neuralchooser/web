-- DDL to create the tool_submissions table in Supabase
-- Run this in the Supabase SQL Editor:

create table if not exists public.tool_submissions (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    company text,
    website text not null,
    documentation text,
    short_description text not null,
    description text,
    categories text[] not null default '{}',
    tags text[] not null default '{}',
    pricing_free boolean not null default false,
    pricing_paid boolean not null default false,
    api_available boolean not null default false,
    open_source boolean not null default false,
    founder_email text not null,
    status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Enable RLS (Row Level Security) if you want to protect it, or let the service role handle it
alter table public.tool_submissions enable row level security;

-- Create policy to allow inserts from anyone (public submission)
create policy "Allow public inserts" on public.tool_submissions
    for insert to anon, authenticated
    with check (true);

-- Create policy to allow admin (service role) full access
create policy "Allow service_role full access" on public.tool_submissions
    for all to service_role
    using (true);
