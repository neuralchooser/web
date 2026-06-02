-- DDL to create the blogs table in Supabase
-- Run this in the Supabase SQL Editor:

create table if not exists public.blogs (
    id uuid default gen_random_uuid() primary key,
    slug text not null unique,
    title text not null,
    excerpt text not null,
    content text not null,
    cover_image text,
    author text not null,
    published boolean not null default false,
    featured boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    published_at timestamptz
);

-- Enable RLS (Row Level Security)
alter table public.blogs enable row level security;

-- Create policy to allow public read access to published blogs
create policy "Allow public read access to published blogs" on public.blogs
    for select to anon, authenticated
    using (published = true);

-- Create policy to allow admin (service role) full access
create policy "Allow service_role full access to blogs" on public.blogs
    for all to service_role
    using (true);
