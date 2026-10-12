import Link from "next/link";
import styles from "../packages.module.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getHeroContent, getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl } from "@/lib/cms/contact";
import { getPageMetadata } from "@/lib/cms/metadata";
import { getPublishedTravelPackages } from "@/lib/cms/packages";
import { formatDepartureDate, getUpcomingDepartures } from "@/lib/cms/departures";

const fallbackMetadata = {
  title: "Paket Wisata Mancanegara | Specta Tour and Travel",
  description: "Pilihan perjalanan mancanegara Specta Tour and Travel.",
};

export function generateMetadata() {
  return getPageMetadata("paket-mancanegara", fallbackMetadata);
}

const fallbackHero = {
  eyebrow: "Perjalanan luar negeri bersama Specta",
  title: "Paket wisata mancanegara",
  description: "Pilih tujuan yang menarik perhatian Anda. Admin Specta akan membantu menjelaskan pilihan jadwal, rute, fasilitas, dan estimasi biaya terbaru.",
};

const fallbackDestinations = [
  { slug: "thailand", place: "Thailand", description: "Budaya, kuliner, pusat kota, dan pengalaman Asia Tenggara yang penuh warna.", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=88" },
  { slug: "singapore", place: "Singapore", description: "Perjalanan kota yang modern, nyaman, dan mudah dinikmati bersama keluarga maupun kelompok.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=88" },
  { slug: "vietnam", place: "Vietnam", description: "Lanskap khas, budaya lokal, dan pengalaman autentik dalam rangkaian perjalanan yang berkesan.", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=88" },
  { slug: "malaysia", place: "Malaysia", description: "Kota modern, warisan budaya, pilihan kuliner, dan destinasi keluarga dalam satu perjalanan.", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=88" },
];

export default async function InternationalPackagesPage() {
  const [hero, settings, cmsPackages, departures] = await Promise.all([
    getHeroContent("paket-mancanegara", fallbackHero),
    getSiteSettings(),
    getPublishedTravelPackages("international"),
    getUpcomingDepartures("international"),
  ]);
  const destinations = cmsPackages.length
    ? cmsPackages.map((record) => {
        const fallback = fallbackDestinations.find((item) => item.place.toLowerCase() === record.destination.toLowerCase());
        return {
          slug: record.slug,
          place: record.destination || record.title,
          description: record.summary,
          image: record.cover_image_path ?? fallback?.image ?? "/specta-symbol-yellow.svg",
        };
      })
    : fallbackDestinations;
  const schedulesBySlug = departures.reduce((map, item) => { const current = map.get(item.travel_packages.slug) ?? []; current.push(item); map.set(item.travel_packages.slug, current); return map; }, new Map<string, typeof departures>());
  const whatsapp = buildWhatsAppUrl(settings?.whatsapp, "Halo Specta, saya ingin bertanya tentang paket wisata mancanegara.");
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div><span className={styles.eyebrow}>{hero.eyebrow}</span><h1>{hero.title}</h1></div>
        <div className={styles.heroCopy}><p>{hero.description}</p><div className={styles.heroStats}><div><b>{destinations.length}</b><span>Negara tujuan</span></div><div><b>1</b><span>Admin untuk berdiskusi</span></div></div></div>
      </section>

      <nav className={styles.tabs} aria-label="Kategori paket"><Link href="/#paket">Semua Paket</Link><Link href="/paket/domestik">Domestik</Link><Link className={styles.active} href="/paket/mancanegara">Mancanegara</Link></nav>

      <section className={styles.catalogue}>
        <div className={styles.sectionHead}><h2>Destinasi yang tersedia</h2><p>Harga, jadwal keberangkatan, rute, dan fasilitas belum dicantumkan karena materi brosur rinci belum tersedia. Informasi tersebut tidak dibuat-buat dan akan dilengkapi setelah data resmi diterima.</p></div>
        <div className={styles.internationalGrid}>
          {destinations.map((item) => (
            <article className={styles.internationalCard} style={{backgroundImage:`url(${item.image})`}} key={item.place}>
              <small>Tour mancanegara</small><h2>{item.place}</h2><p>{item.description}</p>{schedulesBySlug.get(item.slug)?.length ? <div className={styles.scheduleBox}>{schedulesBySlug.get(item.slug)?.slice(0, 2).map((schedule) => <div key={schedule.id}><span><b>{formatDepartureDate(schedule.departure_date)}</b>{schedule.departure_city && ` · ${schedule.departure_city}`}</span><strong>{schedule.status === "sold_out" ? "Penuh" : schedule.price_label ?? "Tanya admin"}</strong></div>)}</div> : null}<Link href={whatsapp}>Tanyakan paket & jadwal ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}><h2>Rencanakan perjalanan ke luar negeri bersama Specta</h2><p>Sampaikan negara tujuan, waktu perjalanan, dan jumlah peserta kepada admin.</p><Link href={whatsapp}>Mulai diskusi via WhatsApp ↗</Link></section>
      <SiteFooter />
    </main>
  );
}
