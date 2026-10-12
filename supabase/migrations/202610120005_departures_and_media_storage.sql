set lock_timeout = '10s';
set statement_timeout = '60s';

create table public.package_departures (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.travel_packages(id) on delete cascade,
  label text,
  departure_date date not null,
  return_date date,
  departure_city text,
  price bigint,
  price_label text,
  quota_total integer,
  quota_remaining integer,
  status text not null default 'scheduled',
  is_public boolean not null default true,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint package_departures_date_check check (return_date is null or return_date >= departure_date),
  constraint package_departures_price_check check (price is null or price >= 0),
  constraint package_departures_quota_total_check check (quota_total is null or quota_total >= 0),
  constraint package_departures_quota_remaining_check check (quota_remaining is null or quota_remaining >= 0),
  constraint package_departures_quota_relation_check check (quota_total is null or quota_remaining is null or quota_remaining <= quota_total),
  constraint package_departures_status_check check (status in ('scheduled', 'sold_out', 'cancelled', 'completed'))
);

create index package_departures_package_date_idx on public.package_departures(package_id, departure_date);
create index package_departures_public_date_idx on public.package_departures(is_public, status, departure_date);

create trigger package_departures_set_updated_at
before update on public.package_departures
for each row execute function public.cms_set_updated_at();

alter table public.package_departures enable row level security;
revoke all on table public.package_departures from anon, authenticated;
grant select on table public.package_departures to anon;
grant select, insert, update, delete on table public.package_departures to authenticated;

create policy "Public can read visible departures"
on public.package_departures for select
to anon
using (is_public and status <> 'cancelled');

create policy "CMS users can manage departures"
on public.package_departures for all
to authenticated
using ((select public.is_cms_user()))
with check ((select public.is_cms_user()));

alter table public.media
  add column collection text not null default 'general',
  add column sort_order integer not null default 0,
  add constraint media_collection_format check (collection ~ '^[a-z][a-z0-9_-]*$'),
  add constraint media_sort_order_check check (sort_order >= 0);

create index media_collection_order_idx on public.media(collection, sort_order, created_at desc);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view CMS media objects"
on storage.objects for select
to anon
using (bucket_id = 'cms-media');

create policy "CMS users can upload media objects"
on storage.objects for insert
to authenticated
with check (bucket_id = 'cms-media' and (select public.is_cms_user()));

create policy "CMS users can update media objects"
on storage.objects for update
to authenticated
using (bucket_id = 'cms-media' and (select public.is_cms_user()))
with check (bucket_id = 'cms-media' and (select public.is_cms_user()));

create policy "CMS users can remove media objects"
on storage.objects for delete
to authenticated
using (bucket_id = 'cms-media' and (select public.is_cms_user()));

comment on table public.package_departures is 'Dated departure inventory attached to travel packages.';
comment on column public.media.collection is 'Code-owned gallery collection key such as umrah, corporate, or general.';
