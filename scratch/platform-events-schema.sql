-- Create platform_events table
create table if not exists public.platform_events (
    id bigint generated always as identity primary key,
    platform_id uuid not null references public.platforms(id) on delete cascade,
    event_type text not null,
    created_at timestamptz not null default now()
);

-- Create indexes
create index if not exists idx_platform_events_platform_id
on public.platform_events(platform_id);

create index if not exists idx_platform_events_event_type
on public.platform_events(event_type);

create index if not exists idx_platform_events_created_at
on public.platform_events(created_at desc);

-- Create view to aggregate event counts by platform and event type
create or replace view public.platform_event_counts as
select 
    platform_id, 
    event_type, 
    count(*) as count
from 
    public.platform_events
group by 
    platform_id, 
    event_type;
