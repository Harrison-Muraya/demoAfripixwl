-- Industries and demos content tables, replacing the static src/data/demos.ts
-- as the source of truth. Public (anon + authenticated) can read; only
-- authenticated users (the admin) can write. There is no public sign-up —
-- the only account is created by the one-time setup flow.

create table public.industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  blurb text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.demos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  industry_slug text not null references public.industries (slug) on update cascade on delete restrict,
  description text not null default '',
  demo_url text not null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index demos_industry_slug_idx on public.demos (industry_slug);
create index demos_featured_idx on public.demos (featured);

grant select on public.industries to anon;
grant select, insert, update, delete on public.industries to authenticated;
grant all on public.industries to service_role;

grant select on public.demos to anon;
grant select, insert, update, delete on public.demos to authenticated;
grant all on public.demos to service_role;

-- Keep updated_at current on every row change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger industries_set_updated_at
before update on public.industries
for each row execute function public.set_updated_at();

create trigger demos_set_updated_at
before update on public.demos
for each row execute function public.set_updated_at();

alter table public.industries enable row level security;
alter table public.demos enable row level security;

-- Anyone (including logged-out visitors) can read — this powers the public site.
create policy "Public can read industries"
on public.industries for select
to anon, authenticated
using (true);

create policy "Public can read demos"
on public.demos for select
to anon, authenticated
using (true);

-- Only a logged-in admin can write. There's exactly one admin account,
-- created via the setup flow, so "authenticated" == "admin" here.
create policy "Authenticated can manage industries"
on public.industries for all
to authenticated
using (true)
with check (true);

create policy "Authenticated can manage demos"
on public.demos for all
to authenticated
using (true)
with check (true);