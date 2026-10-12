set lock_timeout = '10s';
set statement_timeout = '60s';

create extension if not exists pgcrypto with schema extensions;

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  route_path text not null unique,
  name text not null,
  status text not null default 'draft',
  seo_title text,
  seo_description text,
  seo_keywords text[] not null default '{}',
  canonical_url text,
  og_title text,
  og_description text,
  og_image_path text,
  robots_index boolean not null default true,
  robots_follow boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pages_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint pages_route_path_format check (route_path ~ '^/'),
  constraint pages_status_check check (status in ('draft', 'published', 'archived'))
);

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  section_key text not null,
  content jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  status text not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint page_sections_page_key_unique unique (page_id, section_key),
  constraint page_sections_key_format check (section_key ~ '^[a-z][a-z0-9_]*$'),
  constraint page_sections_content_object check (jsonb_typeof(content) = 'object'),
  constraint page_sections_sort_order_check check (sort_order >= 0),
  constraint page_sections_status_check check (status in ('draft', 'published', 'archived'))
);

create table public.site_settings (
  id smallint primary key default 1,
  site_name text not null default 'Specta Tour and Travel',
  site_url text,
  default_seo_title text,
  default_seo_description text,
  default_og_image_path text,
  whatsapp text,
  instagram text,
  email text,
  address text,
  additional jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1),
  constraint site_settings_additional_object check (jsonb_typeof(additional) = 'object')
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  storage_bucket text not null default 'cms-media',
  storage_path text not null,
  title text,
  alt_text text not null default '',
  mime_type text,
  size_bytes bigint,
  width integer,
  height integer,
  is_public boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_storage_object_unique unique (storage_bucket, storage_path),
  constraint media_size_check check (size_bytes is null or size_bytes >= 0),
  constraint media_width_check check (width is null or width > 0),
  constraint media_height_check check (height is null or height > 0)
);

create index pages_status_idx on public.pages(status);
create index page_sections_page_order_idx on public.page_sections(page_id, sort_order);
create index page_sections_publication_idx on public.page_sections(status, is_visible);
create index media_created_at_idx on public.media(created_at desc);

create function public.cms_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create function public.is_cms_user()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and not coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false);
$$;

create trigger pages_set_updated_at
before update on public.pages
for each row execute function public.cms_set_updated_at();

create trigger page_sections_set_updated_at
before update on public.page_sections
for each row execute function public.cms_set_updated_at();

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.cms_set_updated_at();

create trigger media_set_updated_at
before update on public.media
for each row execute function public.cms_set_updated_at();

alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.site_settings enable row level security;
alter table public.media enable row level security;

revoke all on table public.pages from anon, authenticated;
revoke all on table public.page_sections from anon, authenticated;
revoke all on table public.site_settings from anon, authenticated;
revoke all on table public.media from anon, authenticated;

grant select on table public.pages to anon;
grant select on table public.page_sections to anon;
grant select on table public.site_settings to anon;
grant select on table public.media to anon;

grant select, insert, update, delete on table public.pages to authenticated;
grant select, insert, update, delete on table public.page_sections to authenticated;
grant select, insert, update, delete on table public.site_settings to authenticated;
grant select, insert, update, delete on table public.media to authenticated;

revoke execute on function public.is_cms_user() from public, anon;
grant execute on function public.is_cms_user() to authenticated;

create policy "Public can read published pages"
on public.pages for select
to anon
using (status = 'published');

create policy "CMS users can manage pages"
on public.pages for all
to authenticated
using ((select public.is_cms_user()))
with check ((select public.is_cms_user()));

create policy "Public can read published page sections"
on public.page_sections for select
to anon
using (
  status = 'published'
  and is_visible
  and exists (
    select 1
    from public.pages
    where pages.id = page_sections.page_id
      and pages.status = 'published'
  )
);

create policy "CMS users can manage page sections"
on public.page_sections for all
to authenticated
using ((select public.is_cms_user()))
with check ((select public.is_cms_user()));

create policy "Public can read site settings"
on public.site_settings for select
to anon
using (true);

create policy "CMS users can manage site settings"
on public.site_settings for all
to authenticated
using ((select public.is_cms_user()))
with check ((select public.is_cms_user()));

create policy "Public can read public media"
on public.media for select
to anon
using (is_public);

create policy "CMS users can manage media"
on public.media for all
to authenticated
using ((select public.is_cms_user()))
with check ((select public.is_cms_user()));

comment on table public.pages is 'CMS page identity, publication state, and SEO metadata.';
comment on table public.page_sections is 'Structured JSON content for fixed, code-owned page sections.';
comment on table public.site_settings is 'Singleton record for global website and SEO defaults.';
comment on table public.media is 'Metadata for files stored in Supabase Storage.';
