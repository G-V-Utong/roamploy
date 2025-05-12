-- Create newsletter_subscribers table
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table newsletter_subscribers enable row level security;

-- Create policies
create policy "Enable insert for all users" on newsletter_subscribers
  for insert with check (true);

create policy "Enable read access for all users" on newsletter_subscribers
  for select using (true);
