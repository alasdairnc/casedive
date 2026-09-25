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
--
-- Verified 2026-09-25 against production: all three tables already exist with
-- these columns (uuid ids, camelCase timestamp columns), RLS enabled, and only
-- own-row policies. This file reproduces that state in a fresh environment
-- and, because it resets the policy set, also repairs a drifted one.

create table if not exists public.user_bookmarks (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  citation       text not null default '',
  summary        text not null default '',
  type           text not null default '',
  "bookmarkedAt" bigint not null,
  verification   jsonb,
  created_at     timestamptz not null default now()
);

create table if not exists public.user_history (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  query          text not null default '',
  filters        jsonb not null default '{}'::jsonb,
  "resultCounts" jsonb not null default '{}'::jsonb,
  timestamp      bigint not null,
  created_at     timestamptz not null default now()
);

create table if not exists public.user_scenarios (
  id             uuid primary key default gen_random_uuid(),
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

-- Make the policy set AUTHORITATIVE (fail closed). Postgres combines
-- permissive policies with OR, so merely adding own-row policies next to a
-- pre-existing broad one (e.g. `using (true)`) would leave that hole open.
-- Drop every existing policy on these three tables, then create exactly one
-- own-row policy per table covering all commands. The API is unaffected: it
-- uses the service role, which bypasses RLS and scopes every query itself.
do $$
declare
  p record;
begin
  for p in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('user_bookmarks', 'user_history', 'user_scenarios')
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      p.policyname, p.schemaname, p.tablename
    );
  end loop;
end
$$;

create policy "user_bookmarks_own_rows"
  on public.user_bookmarks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_history_own_rows"
  on public.user_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_scenarios_own_rows"
  on public.user_scenarios for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
