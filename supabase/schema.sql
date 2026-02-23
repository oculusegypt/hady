-- Khidmati Supabase schema
create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key default uuid_generate_v4(),
  phone text unique not null,
  full_name text,
  role text check (role in ('customer','provider','admin')) not null,
  avatar_url text,
  created_at timestamptz default now()
);

create table provider_services (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid references profiles(id) on delete cascade,
  service_name text not null,
  documents jsonb default '[]'::jsonb,
  is_available boolean default false,
  current_lat double precision,
  current_lng double precision,
  updated_at timestamptz default now()
);

create table addresses (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references profiles(id) on delete cascade,
  gps_lat double precision,
  gps_lng double precision,
  manual_address text,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  customer_id uuid references profiles(id),
  provider_id uuid references profiles(id),
  service_name text not null,
  state text check (state in ('created','assigned','arriving','in_progress','completed','cancelled')) default 'created',
  chat_state jsonb not null,
  pricing_breakdown jsonb not null,
  total_price numeric(10,2) not null,
  payment_method text check (payment_method in ('cash','wallet')),
  rating int check (rating between 1 and 5),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table order_photos (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  uploader_id uuid references profiles(id),
  photo_url text not null,
  phase text check (phase in ('issue','before','after')) not null,
  created_at timestamptz default now()
);

create table chat_messages (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  sender_id uuid references profiles(id),
  sender_type text check (sender_type in ('bot','customer','provider')),
  body text,
  attachments jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table chat_messages;
alter publication supabase_realtime add table provider_services;
