-- Contact geocoding + per-profile feature toggles.
-- Safe to run against an existing schema: every statement is guarded.

-- 1. Contacts -------------------------------------------------------------

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.contacts
  add column if not exists nickname text,
  add column if not exists address text,
  add column if not exists lat double precision,
  add column if not exists lng double precision,
  -- the exact address string that produced lat/lng. Geocoding is skipped
  -- while address = geocoded_address, so a trip never re-geocodes.
  add column if not exists geocoded_address text,
  add column if not exists geocoded_at timestamptz;

create index if not exists contacts_user_id_idx on public.contacts (user_id);
create index if not exists contacts_nickname_lower_idx on public.contacts (lower(nickname));
create index if not exists contacts_name_lower_idx on public.contacts (lower(name));

alter table public.contacts enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'contacts' and policyname = 'contacts_owner_all'
  ) then
    create policy contacts_owner_all on public.contacts
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

-- 2. Profile feature toggles ---------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists settings jsonb not null default jsonb_build_object(
    'brain_games', true,
    'mapping', true,
    'camera_id', true,
    'contacts', true,
    'voice_nav', true,
    'caregiver_mode', false
  );

alter table public.profiles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles_owner_all'
  ) then
    create policy profiles_owner_all on public.profiles
      for all using (auth.uid() = id) with check (auth.uid() = id);
  end if;
end $$;

-- Backfill any row created before the column existed.
update public.profiles
set settings = '{}'::jsonb
where settings is null;
