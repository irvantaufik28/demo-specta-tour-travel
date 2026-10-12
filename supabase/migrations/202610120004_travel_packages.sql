create table public.travel_packages (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  slug text not null unique,
  title text not null,
  destination text not null,
  summary text not null default '',
  trip_type text,
  duration text,
  origin text,
  starting_price bigint,
  price_label text,
  currency text not null default 'IDR',
  cover_image_path text,
  featured boolean not null default false,
  status text not null default 'draft',
  sort_order integer not null default 0,
  included jsonb not null default '[]'::jsonb,
  excluded jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  price_options jsonb not null default '[]'::jsonb,
  itinerary jsonb not null default '[]'::jsonb,
  extra jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint travel_packages_kind_check check (kind in ('domestic', 'international', 'umrah')),
  constraint travel_packages_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint travel_packages_status_check check (status in ('draft', 'published', 'archived')),
  constraint travel_packages_price_check check (starting_price is null or starting_price >= 0),
  constraint travel_packages_sort_order_check check (sort_order >= 0),
  constraint travel_packages_included_array check (jsonb_typeof(included) = 'array'),
  constraint travel_packages_excluded_array check (jsonb_typeof(excluded) = 'array'),
  constraint travel_packages_highlights_array check (jsonb_typeof(highlights) = 'array'),
  constraint travel_packages_price_options_array check (jsonb_typeof(price_options) = 'array'),
  constraint travel_packages_itinerary_array check (jsonb_typeof(itinerary) = 'array'),
  constraint travel_packages_extra_object check (jsonb_typeof(extra) = 'object')
);

create index travel_packages_public_idx on public.travel_packages(kind, status, sort_order);
create index travel_packages_featured_idx on public.travel_packages(featured, status);

create trigger travel_packages_set_updated_at
before update on public.travel_packages
for each row execute function public.cms_set_updated_at();

alter table public.travel_packages enable row level security;

revoke all on table public.travel_packages from anon, authenticated;
grant select on table public.travel_packages to anon;
grant select, insert, update, delete on table public.travel_packages to authenticated;

create policy "Public can read published travel packages"
on public.travel_packages for select
to anon
using (status = 'published');

create policy "CMS users can manage travel packages"
on public.travel_packages for all
to authenticated
using ((select public.is_cms_user()))
with check ((select public.is_cms_user()));

comment on table public.travel_packages is 'Travel packages for domestic, international, and Umrah catalogues.';

insert into public.travel_packages (
  kind, slug, title, destination, summary, trip_type, duration, origin,
  starting_price, price_label, cover_image_path, featured, status, sort_order,
  highlights, price_options, extra, published_at
)
values
  ('domestic', 'pulau-tidung', 'Pulau Tidung Escape', 'Pulau Tidung', 'Perjalanan pulau dengan aktivitas snorkeling, bersepeda, sunset, dan kebersamaan dalam suasana santai.', 'Open Trip', '2H1M', 'Garut', 885000, 'Mulai dari Rp885.000/pax', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=88', true, 'published', 10, '[]', '[]', '{}', now()),
  ('domestic', 'dufan', 'Dufan Fun Day', 'Dufan', 'Perjalanan satu hari ke kawasan Ancol dan Dunia Fantasi dengan transportasi dan tiket yang sudah disiapkan.', 'Open Trip', '1 hari', 'Garut', 365000, 'Mulai dari Rp365.000/pax', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=88', false, 'published', 20, '[]', '[]', '{}', now()),
  ('domestic', 'malang-bromo', 'Malang & Bromo Journey', 'Malang–Bromo', 'Rangkaian wisata Bromo dan Malang yang memadukan lanskap alam, pengalaman jeep, serta destinasi keluarga.', 'Open Trip', '4H3M', 'Bandung', 1585000, 'Mulai dari Rp1.585.000/pax', 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=88', true, 'published', 30, '[]', '[]', '{}', now()),
  ('domestic', 'seaworld', 'SeaWorld & Ocean Dream', 'SeaWorld', 'Wisata edukasi keluarga ke SeaWorld dan Ocean Dream Samudra dalam satu perjalanan sehari.', 'Open Trip', '1 hari', 'Garut', 400000, 'Mulai dari Rp400.000/pax', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=88', false, 'published', 40, '[]', '[]', '{}', now()),
  ('domestic', 'yogyakarta', 'Yogyakarta Heritage Trip', 'Yogyakarta', 'Perjalanan budaya dan rekreasi ke Merapi, destinasi kota Yogyakarta, serta waktu bebas di Malioboro.', 'Open Trip', '2H1M', 'Bandung', 1100000, 'Mulai dari Rp1.100.000/pax', 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1600&q=88', false, 'published', 50, '[]', '[]', '{}', now()),
  ('domestic', 'taman-safari', 'Taman Safari Journey', 'Taman Safari', 'Perjalanan keluarga menuju Taman Safari Bogor untuk menikmati Safari Journey dan mengeksplorasi kawasan.', 'Open Trip', '1 hari', 'Garut', 365000, 'Mulai dari Rp365.000/pax', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=88', false, 'published', 60, '[]', '[]', '{}', now()),
  ('domestic', 'bali-nusa-penida', 'Bali & Nusa Penida', 'Bali', 'Private trip Bali dan Nusa Penida dengan harga per orang yang menyesuaikan jumlah peserta.', 'Private Trip', '4H3M', 'Bali', 2750000, 'Mulai dari Rp2.750.000/pax', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=88', true, 'published', 70, '[]', '["9–14 pax · Rp2.750.000","5–8 pax · Rp3.250.000","2–4 pax · Rp3.350.000"]', '{}', now()),

  ('international', 'thailand', 'Thailand', 'Thailand', 'Budaya, kuliner, pusat kota, dan pengalaman Asia Tenggara yang penuh warna.', 'Tour Mancanegara', null, null, null, 'Tanyakan paket & jadwal', 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=88', true, 'published', 10, '[]', '[]', '{}', now()),
  ('international', 'singapore', 'Singapore', 'Singapore', 'Perjalanan kota yang modern, nyaman, dan mudah dinikmati bersama keluarga maupun kelompok.', 'Tour Mancanegara', null, null, null, 'Tanyakan paket & jadwal', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=88', true, 'published', 20, '[]', '[]', '{}', now()),
  ('international', 'vietnam', 'Vietnam', 'Vietnam', 'Lanskap khas, budaya lokal, dan pengalaman autentik dalam rangkaian perjalanan yang berkesan.', 'Tour Mancanegara', null, null, null, 'Tanyakan paket & jadwal', 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=88', true, 'published', 30, '[]', '[]', '{}', now()),
  ('international', 'malaysia', 'Malaysia', 'Malaysia', 'Kota modern, warisan budaya, pilihan kuliner, dan destinasi keluarga dalam satu perjalanan.', 'Tour Mancanegara', null, null, null, 'Tanyakan paket & jadwal', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=88', true, 'published', 40, '[]', '[]', '{}', now()),

  ('umrah', 'umrah-ekonomis', 'Umrah Ekonomis', 'Makkah & Madinah', 'Pilihan perjalanan ibadah dengan susunan fasilitas yang efisien dan tetap didampingi sejak persiapan.', 'Program Umrah', 'Sesuai jadwal', 'Jakarta', null, 'Tanyakan jadwal & harga', '/specta-umrah-hero.webp', false, 'published', 10, '[]', '[]', '{"label":"Lebih terjangkau"}', now()),
  ('umrah', 'umrah-private', 'Umrah Private', 'Makkah & Madinah', 'Perjalanan untuk keluarga atau kelompok dengan jumlah peserta dan biaya yang menyesuaikan ukuran rombongan.', 'Program Umrah', 'Sesuai jadwal', 'Jakarta', 29000000, 'Mulai Rp29 juta/orang', '/specta-umrah-hero.webp', true, 'published', 20, '[]', '[]', '{"label":"Program utama"}', now()),
  ('umrah', 'umrah-eksklusif', 'Umrah Eksklusif', 'Makkah & Madinah', 'Pilihan bagi jamaah yang menginginkan pengalaman lebih personal, tenang, dan fleksibel.', 'Program Umrah', 'Sesuai jadwal', 'Jakarta', null, 'Tanyakan pilihan fasilitas', '/specta-umrah-hero.webp', false, 'published', 30, '[]', '[]', '{"label":"Kenyamanan lebih"}', now()),
  ('umrah', 'umrah-plus-thaif', 'Umrah Plus Thaif', 'Thaif', 'Program umrah yang dilengkapi perjalanan ke Thaif.', 'Umrah Plus', '9–12 hari', 'Jakarta', 30900000, 'Rp30,9 juta', '/specta-umrah-thaif.jpg', true, 'published', 40, '["City tour Thaif","Kereta gantung","Haramain Express"]', '[]', '{"popular":true}', now()),
  ('umrah', 'umrah-al-ula', 'Umrah Al-Ula', 'Al-Ula', 'Program umrah yang dilengkapi perjalanan ke Al-Ula.', 'Umrah Plus', '10 hari', 'Jakarta', 31900000, 'Rp31,9 juta', 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=88', false, 'published', 50, '["Kota tua Al-Ula","Madain Saleh","Haramain Express"]', '[]', '{}', now()),
  ('umrah', 'umrah-plus-dubai', 'Umrah Plus Dubai', 'Dubai', 'Program umrah yang dilengkapi perjalanan ke Dubai.', 'Umrah Plus', '10–12 hari', 'Jakarta', 38900000, 'Rp38,9 juta', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=88', false, 'published', 60, '["Dubai dua malam","Burj Khalifa","City tour"]', '[]', '{}', now()),
  ('umrah', 'umrah-plus-turki', 'Umrah Plus Turki', 'Turki', 'Program umrah yang dilengkapi perjalanan ke Turki.', 'Umrah Plus', '12–15 hari', 'Jakarta', 42900000, 'Rp42,9 juta', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=88', false, 'published', 70, '["Istanbul","Masjid Biru","Bosphorus"]', '[]', '{}', now())
on conflict (slug) do nothing;
