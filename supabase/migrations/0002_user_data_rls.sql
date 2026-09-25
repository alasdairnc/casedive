-- 0002_user_data_rls.sql
-- Row Level Security for the cloud-sync tables written by api/user-data.js.
--
-- These three tables were created by hand in the Supabase dashboard (no
-- migration existed), so their RLS state could not be verified from the repo.
-- The API reaches them with the service-role key, which bypasses RLS by design
-- and scopes every query to the authenticated user id. The browser only holds
-- the anon key. WITHOUT RLS, any signed-in user could read every other user's
-- bookmarks, search history and saved scenarios straight through PostgREST.
--
-- Idempotent: safe to run against existing tables (the CREATE statements are
-- no-ops when the table already exists). Run in the Supabase SQL editor, then
-- confirm in Table Editor that each table shows the RLS shield as enabled.

create table if not exists public.user_bookmarks (
  id             bigint generated always as identity primary key,
  user_id        uuid not null references auth.users (id) on delete cascade,
  citation       text not null default '',
  summary        text not null default '',
  type           text not null default '',
  "bookmarkedAt" bigint not null,
  verification   jsonb,
  created_at     timestamptz not null default now()
);

create table if not exists public.user_history (
  id             bigint generated always as identity primary key,
  user_id        uuid not null references auth.users (id) on delete cascade,
  query          text not null default '',
  filters        jsonb not null default '{}'::jsonb,
  "resultCounts" jsonb not null default '{}'::jsonb,
  timestamp      bigint not null,
  created_at     timestamptz not null default now()
);

create table if not exists public.user_scenarios (
  id             bigint generated always as identity primary key,
  user_id        uuid not null references auth.users (id) on delete cascade,
  name           text not null default '',
  text           text not null default '',
  "savedAt"      bigint not null,
  created_at     timestamptz not null default now()
);

-- Every API query filters on user_id; the replace-on-sync delete does too.
create index if not exists user_bookmarks_user_id_idx on public.user_bookmarks (user_id);
create index if not exists user_history_user_id_idx   on public.user_history (user_id);
create index if not exists user_scenarios_user_id_idx on public.user_scenarios (user_id);

-- Enable RLS. With RLS on and no permissive policy for a given command, the
-- anon and authenticated roles are denied that command outright.
alter table public.user_bookmarks enable row level security;
alter table public.user_history   enable row level security;
alter table public.user_scenarios enable row level security;

-- A signed-in user may read only their own rows. No client INSERT, UPDATE or
-- DELETE policy is granted: all writes go through api/user-data.js with the
-- service role, exactly like the subscriptions table in 0001.
drop policy if exists "user_bookmarks_select_own" on public.user_bookmarks;
create policy "user_bookmarks_select_own"
  on public.user_bookmarks for select
  using (auth.uid() = user_id);

drop policy if exists "user_history_select_own" on public.user_history;
create policy "user_history_select_own"
  on public.user_history for select
  using (auth.uid() = user_id);

drop policy if exists "user_scenarios_select_own" on public.user_scenarios;
create policy "user_scenarios_select_own"
  on public.user_scenarios for select
  using (auth.uid() = user_id);
