-- 0001_subscriptions.sql
-- CaseDive monetization: per-user subscription state.
-- Run in the Supabase SQL editor (no migration CLI is wired into this repo yet).
--
-- The Stripe webhook (service role) is the SOLE writer. The webhook is the source
-- of truth for plan/status; clients may only read their own row via RLS.

create table if not exists public.subscriptions (
  user_id                uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  plan                   text not null default 'free'
                           check (plan in ('free', 'plus', 'student')),
  status                 text not null default 'inactive'
                           check (status in ('inactive', 'active', 'trialing',
                                             'past_due', 'canceled')),
  current_period_end     timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- Lookups by Stripe customer id (webhook maps customer -> user).
create index if not exists subscriptions_stripe_customer_id_idx
  on public.subscriptions (stripe_customer_id);

-- Row Level Security: a user can read only their own row.
-- No client INSERT/UPDATE/DELETE policy is granted, so all writes must use the
-- service role key (the Stripe webhook), bypassing RLS by design.
alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

-- Keep updated_at fresh on every write.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();
