-- Messages sent through the portfolio contact form.
-- Only the Cloudflare function writes here, using the server-side secret key.
create table if not exists public.contact_messages (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 100),
  email       text not null check (char_length(email) <= 254),
  phone       text not null check (char_length(phone) <= 30),
  message     text not null check (char_length(message) between 10 and 2000),
  ip_address  text,
  handled     boolean not null default false
);

-- Row Level Security with no policies: the public (anon) key can't read or write
-- anything. The server-side secret key bypasses RLS.
alter table public.contact_messages enable row level security;

revoke all on public.contact_messages from anon, authenticated;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
