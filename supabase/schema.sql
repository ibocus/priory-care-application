create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  applicant_name text,
  email text,
  phone text,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists applications_created_at_idx on applications (created_at desc);

alter table applications enable row level security;

-- No public policies are created on purpose: this table is only written to
-- and read from the Vercel serverless function (api/apply.ts) using the
-- Supabase service role key, which bypasses row level security. Never
-- expose the service role key to the browser/frontend.
