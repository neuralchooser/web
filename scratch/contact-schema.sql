-- DDL to create the contact_messages table in Supabase
-- Run this in the Supabase SQL Editor:

create table if not exists public.contact_messages (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    subject text not null,
    message text not null,
    created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Allow public inserts" on public.contact_messages
    for insert to anon, authenticated
    with check (true);

create policy "Allow service_role full access" on public.contact_messages
    for all to service_role
    using (true);
