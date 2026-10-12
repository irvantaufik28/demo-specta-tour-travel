insert into public.site_settings (
  id,
  site_name,
  default_seo_title,
  default_seo_description,
  whatsapp,
  instagram,
  email,
  address,
  additional
)
values (
  1,
  'Specta Tour and Travel',
  'Specta Tour and Travel | Wisata, Umrah & Corporate Travel',
  'Rencanakan perjalanan domestik, mancanegara, umrah, private trip, dan perjalanan perusahaan bersama Specta Tour and Travel dari Garut.',
  '6280000000000',
  '@spectatravel',
  'info@spectatravel.id',
  'Garut, Jawa Barat',
  '{"contact_is_placeholder": true}'::jsonb
)
on conflict (id) do nothing;

insert into public.pages (
  slug,
  route_path,
  name,
  status,
  seo_title,
  seo_description,
  og_title,
  og_description,
  robots_index,
  robots_follow
)
values
  (
    'home',
    '/',
    'Beranda',
    'published',
    'Specta Tour and Travel | Wisata, Umrah & Corporate Travel',
    'Rencanakan perjalanan domestik, mancanegara, umrah, private trip, dan perjalanan perusahaan bersama Specta Tour and Travel dari Garut.',
    'Specta Tour and Travel',
    'Perjalanan domestik, mancanegara, umrah, private trip, dan kebutuhan perusahaan dari Garut.',
    true,
    true
  ),
  (
    'tentang',
    '/tentang',
    'Tentang Specta',
    'published',
    'Tentang Specta | Specta Tour and Travel',
    'Mengenal Specta Tour and Travel, tim dan cara kami mendampingi perjalanan wisata, umrah, serta kebutuhan kelompok.',
    'Tentang Specta Tour and Travel',
    'Mengenal tim, cara kerja, dan nilai pelayanan Specta Tour and Travel.',
    true,
    true
  ),
  (
    'layanan',
    '/layanan',
    'Layanan',
    'published',
    'Layanan Perjalanan | Specta Tour and Travel',
    'Tiket pesawat, hotel, transportasi, custom trip, dan konsultasi perjalanan bersama Specta Tour and Travel.',
    'Layanan Perjalanan Specta',
    'Tiket, hotel, transportasi, custom trip, dan konsultasi perjalanan dalam satu layanan.',
    true,
    true
  ),
  (
    'group-corporate',
    '/group-corporate',
    'Group & Corporate',
    'published',
    'Group & Corporate | Specta Tour and Travel',
    'Layanan perjalanan grup dan perusahaan yang disusun sesuai kebutuhan bersama Specta Tour and Travel.',
    'Group & Corporate Travel',
    'Perjalanan grup dan perusahaan yang disusun sesuai agenda, peserta, dan anggaran.',
    true,
    true
  ),
  (
    'kontak',
    '/kontak',
    'Kontak',
    'published',
    'Kontak | Specta Tour and Travel',
    'Hubungi admin Specta Tour and Travel untuk informasi perjalanan wisata, umrah, layanan, serta kebutuhan group dan corporate.',
    'Hubungi Specta Tour and Travel',
    'Diskusikan kebutuhan perjalanan wisata, umrah, maupun perjalanan grup bersama admin Specta.',
    true,
    true
  ),
  (
    'umrah',
    '/umrah',
    'Program Umrah',
    'published',
    'Program Umrah | Specta Tour and Travel',
    'Pilihan program Umrah Ekonomis, Private, dan Eksklusif bersama Specta Tour and Travel.',
    'Program Umrah Bersama Specta',
    'Pilihan Umrah Ekonomis, Private, Eksklusif, dan Umrah Plus bersama Specta.',
    true,
    true
  ),
  (
    'paket-domestik',
    '/paket/domestik',
    'Paket Domestik',
    'published',
    'Paket Wisata Domestik | Specta Tour and Travel',
    'Pilihan open trip dan private trip domestik Specta Tour and Travel.',
    'Paket Wisata Domestik Specta',
    'Pilihan perjalanan domestik, open trip, dan private trip bersama Specta.',
    true,
    true
  ),
  (
    'paket-mancanegara',
    '/paket/mancanegara',
    'Paket Mancanegara',
    'published',
    'Paket Wisata Mancanegara | Specta Tour and Travel',
    'Pilihan perjalanan mancanegara Specta Tour and Travel.',
    'Paket Wisata Mancanegara Specta',
    'Pilihan destinasi dan perjalanan luar negeri bersama Specta Tour and Travel.',
    true,
    true
  )
on conflict (slug) do nothing;

with initial_sections(slug, section_key, sort_order, content) as (
  values
    ('home', 'hero', 10, '{"eyebrow":"Tour designer dari Garut","title":"Perjalanan domestik dan internasional dari Garut.","description":"Jelajahi dunia melalui perjalanan yang disiapkan lebih personal—dari wisata mancanegara, private trip, hingga perjalanan perusahaan."}'::jsonb),
    ('tentang', 'hero', 10, '{"eyebrow":"Tentang Specta","title":"Perjalanan yang baik dimulai dari tim yang peduli.","description":"Specta Tour and Travel membantu merencanakan perjalanan wisata, umrah, serta kebutuhan kelompok dengan pelayanan yang terkoordinasi."}'::jsonb),
    ('layanan', 'hero', 10, '{"eyebrow":"Layanan perjalanan Specta","title":"Kebutuhan perjalanan, dibantu dalam satu tempat.","description":"Dari tiket hingga susunan perjalanan khusus, pilih layanan yang Anda perlukan dan diskusikan detailnya langsung bersama admin Specta."}'::jsonb),
    ('group-corporate', 'hero', 10, '{"eyebrow":"Group & Corporate Travel","title":"Perjalanan bersama, dirancang lebih terarah.","description":"Dari gathering hingga perjalanan dinas, Specta membantu menyusun kebutuhan kelompok dalam satu koordinasi."}'::jsonb),
    ('kontak', 'hero', 10, '{"eyebrow":"Kontak Specta","title":"Perjalanan berikutnya dimulai dari percakapan.","description":"Sampaikan tujuan atau kebutuhan Anda. Admin Specta akan membantu mengarahkan informasi dan pilihan perjalanan yang sesuai."}'::jsonb),
    ('umrah', 'hero', 10, '{"eyebrow":"Perjalanan ibadah bersama Specta","title":"Program umrah bersama Specta","description":"Pilih program yang sesuai dengan kebutuhan Anda—dari pilihan ekonomis, perjalanan private, hingga pengalaman yang lebih eksklusif."}'::jsonb),
    ('paket-domestik', 'hero', 10, '{"eyebrow":"Jelajahi Indonesia bersama Specta","title":"Paket wisata domestik","description":"Dari perjalanan satu hari hingga private trip beberapa malam, pilih pengalaman yang paling sesuai dengan waktu dan cara bepergian Anda."}'::jsonb),
    ('paket-mancanegara', 'hero', 10, '{"eyebrow":"Perjalanan luar negeri bersama Specta","title":"Paket wisata mancanegara","description":"Pilih tujuan yang menarik perhatian Anda. Admin Specta akan membantu menjelaskan pilihan jadwal, rute, fasilitas, dan estimasi biaya terbaru."}'::jsonb)
)
insert into public.page_sections (page_id, section_key, content, sort_order, status)
select pages.id, initial_sections.section_key, initial_sections.content, initial_sections.sort_order, 'published'
from initial_sections
join public.pages using (slug)
on conflict (page_id, section_key) do nothing;
