import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getHeroContent, getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl } from "@/lib/cms/contact";
import { getPageMetadata } from "@/lib/cms/metadata";
import { getPublishedTravelPackages, jsonBoolean, jsonStringArray, jsonText } from "@/lib/cms/packages";
import { formatDepartureDate, getUpcomingDepartures } from "@/lib/cms/departures";
import { getPublicMedia } from "@/lib/cms/media";
import styles from "./umrah.module.css";

const fallbackMetadata = {
  title: "Program Umrah | Specta Tour and Travel",
  description: "Pilihan program Umrah Ekonomis, Private, dan Eksklusif bersama Specta Tour and Travel.",
};

export function generateMetadata() {
  return getPageMetadata("umrah", fallbackMetadata);
}

const fallbackHero = {
  eyebrow: "Perjalanan ibadah bersama Specta",
  title: "Program umrah bersama Specta",
  description: "Pilih program yang sesuai dengan kebutuhan Anda—dari pilihan ekonomis, perjalanan private, hingga pengalaman yang lebih eksklusif.",
};

const fallbackPrograms = [
  {
    number: "01",
    name: "Umrah Ekonomis",
    label: "Lebih terjangkau",
    description: "Pilihan perjalanan ibadah dengan susunan fasilitas yang efisien dan tetap didampingi sejak persiapan.",
    price: "Tanyakan jadwal & harga",
    summary: [
      ["Hotel", "Standar nyaman"], ["Kamar", "Quad / sharing"], ["Transportasi", "Bus rombongan"], ["Jadwal", "Jadwal tersedia"],
    ],
    facilities: [
      ["Pendampingan sebelum keberangkatan", "✓"], ["Manasik Umrah", "✓"], ["Tiket pesawat PP", "✓"], ["Hotel Makkah & Madinah", "Standar nyaman"], ["Tipe kamar", "Quad / sharing"], ["Makan selama program", "3x sehari"], ["Transportasi selama Umrah", "Bus rombongan"], ["Muthawwif / pembimbing", "✓"], ["City tour Makkah & Madinah", "✓"], ["Handling bandara", "✓"], ["Air Zamzam", "Sesuai ketentuan maskapai"], ["Perlengkapan jamaah", "Standar"], ["Jadwal keberangkatan", "Jadwal tersedia"], ["Jumlah peserta", "Rombongan"], ["Itinerary", "Program tetap"], ["Konsultasi personal", "—"],
    ],
  },
  {
    number: "02",
    name: "Umrah Private",
    label: "Program utama",
    description: "Perjalanan untuk keluarga atau kelompok dengan jumlah peserta dan biaya yang menyesuaikan ukuran rombongan.",
    price: "Mulai Rp29 juta/orang",
    featured: true,
    summary: [
      ["Hotel", "Sesuai rombongan"], ["Kamar", "Sesuai kebutuhan"], ["Transportasi", "Sesuai peserta"], ["Jadwal", "Lebih fleksibel"],
    ],
    facilities: [
      ["Pendampingan sebelum keberangkatan", "✓"], ["Manasik Umrah", "✓"], ["Tiket pesawat PP", "✓"], ["Hotel Makkah & Madinah", "Menyesuaikan rombongan"], ["Tipe kamar", "Menyesuaikan kebutuhan"], ["Makan selama program", "3x sehari"], ["Transportasi selama Umrah", "Kendaraan menyesuaikan peserta"], ["Muthawwif / pembimbing", "✓"], ["City tour Makkah & Madinah", "✓"], ["Handling bandara", "✓"], ["Air Zamzam", "Sesuai ketentuan maskapai"], ["Perlengkapan jamaah", "Standar"], ["Jadwal keberangkatan", "Lebih fleksibel"], ["Jumlah peserta", "Keluarga / grup kecil"], ["Itinerary", "Bisa disesuaikan"], ["Konsultasi personal", "✓"],
    ],
  },
  {
    number: "03",
    name: "Umrah Eksklusif",
    label: "Kenyamanan lebih",
    description: "Pilihan bagi jamaah yang menginginkan pengalaman lebih personal, tenang, dan fleksibel.",
    price: "Tanyakan pilihan fasilitas",
    summary: [
      ["Hotel", "Pilihan premium"], ["Kamar", "Double / Triple"], ["Transportasi", "Lebih privat"], ["Jadwal", "Lebih fleksibel"],
    ],
    facilities: [
      ["Pendampingan sebelum keberangkatan", "✓"], ["Manasik Umrah", "✓"], ["Tiket pesawat PP", "✓"], ["Hotel Makkah & Madinah", "Pilihan hotel premium"], ["Tipe kamar", "Double / Triple"], ["Makan selama program", "3x sehari + opsi khusus"], ["Transportasi selama Umrah", "Transportasi lebih privat"], ["Muthawwif / pembimbing", "✓"], ["City tour Makkah & Madinah", "✓"], ["Handling bandara", "✓"], ["Air Zamzam", "Sesuai ketentuan maskapai"], ["Perlengkapan jamaah", "Premium"], ["Jadwal keberangkatan", "Lebih fleksibel"], ["Jumlah peserta", "Grup terbatas"], ["Itinerary", "Lebih fleksibel"], ["Konsultasi personal", "✓"],
    ],
  },
];

const inclusions = ["Tiket pesawat ekonomi PP", "Manasik umrah", "Visa", "Antar-jemput bandara", "Hotel di Arab Saudi", "Transportasi bus full AC"];

const fallbackPlusPrograms = [
  {
    destination: "Thaif",
    name: "Umrah Plus Thaif",
    price: "Rp30,9 juta",
    duration: "9–12 hari",
    highlights: ["City tour Thaif", "Kereta gantung", "Haramain Express"],
    image: "/specta-umrah-thaif.jpg",
    popular: true,
  },
  {
    destination: "Al-Ula",
    name: "Umrah Al-Ula",
    price: "Rp31,9 juta",
    duration: "10 hari",
    highlights: ["Kota tua Al-Ula", "Madain Saleh", "Haramain Express"],
    image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=88",
  },
  {
    destination: "Dubai",
    name: "Umrah Plus Dubai",
    price: "Rp38,9 juta",
    duration: "10–12 hari",
    highlights: ["Dubai dua malam", "Burj Khalifa", "City tour"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=88",
  },
  {
    destination: "Turki",
    name: "Umrah Plus Turki",
    price: "Rp42,9 juta",
    duration: "12–15 hari",
    highlights: ["Istanbul", "Masjid Biru", "Bosphorus"],
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=88",
  },
];

export default async function UmrahPage() {
  const [hero, settings, cmsPackages, departures, cmsGallery] = await Promise.all([
    getHeroContent("umrah", fallbackHero),
    getSiteSettings(),
    getPublishedTravelPackages("umrah"),
    getUpcomingDepartures("umrah"),
    getPublicMedia("umrah", 4),
  ]);
  const regularCms = cmsPackages.filter((item) => item.trip_type === "Program Umrah");
  const plusCms = cmsPackages.filter((item) => item.trip_type === "Umrah Plus");
  const programs = regularCms.length
    ? regularCms.map((record, index) => {
        const fallback = fallbackPrograms.find((item) => item.name === record.title) ?? fallbackPrograms[index];
        return {
          number: String(index + 1).padStart(2, "0"),
          name: record.title,
          label: jsonText(record.extra, "label", fallback?.label ?? "Program Umrah"),
          description: record.summary,
          price: record.price_label ?? fallback?.price ?? "Tanyakan harga",
          featured: record.featured,
          summary: fallback?.summary ?? [["Durasi", record.duration ?? "Sesuai jadwal"], ["Keberangkatan", record.origin ?? "Konfirmasi admin"]],
          facilities: fallback?.facilities ?? jsonStringArray(record.included).map((item) => [item, "✓"]),
        };
      })
    : fallbackPrograms.map((item) => ({ ...item, featured: item.featured ?? false }));
  const plusPrograms = plusCms.length
    ? plusCms.map((record) => {
        const fallback = fallbackPlusPrograms.find((item) => item.name === record.title);
        return {
          destination: record.destination,
          name: record.title,
          price: record.price_label ?? fallback?.price ?? "Tanyakan harga",
          duration: record.duration ?? fallback?.duration ?? "Konfirmasi admin",
          highlights: jsonStringArray(record.highlights, fallback?.highlights ?? []),
          image: record.cover_image_path ?? fallback?.image ?? "/specta-symbol-yellow.svg",
          popular: jsonBoolean(record.extra, "popular", fallback?.popular ?? false),
        };
      })
    : fallbackPlusPrograms.map((item) => ({ ...item, popular: item.popular ?? false }));
  const whatsapp = buildWhatsAppUrl(settings?.whatsapp, "Halo Specta, saya ingin bertanya tentang program umrah.");
  const fallbackGallery = [
    { url: "/specta-umrah-gallery-01.webp", title: "Kebersamaan di Tanah Suci", alt_text: "Jamaah Specta bersama di Tanah Suci" },
    { url: "/specta-umrah-gallery-02.png", title: "Perjalanan dalam kebersamaan", alt_text: "Kebersamaan jamaah dalam perjalanan Umrah" },
    { url: "/specta-umrah-gallery-03.png", title: "Pendampingan selama ibadah", alt_text: "Pendampingan jamaah selama ibadah" },
    { url: "/specta-umrah-gallery-04.webp", title: "Rangkaian ibadah jamaah", alt_text: "Rangkaian ibadah jamaah Specta" },
  ];
  const galleryItems = cmsGallery.length ? cmsGallery.map((item) => ({ url: item.url, title: item.title ?? "Perjalanan jamaah bersama Specta", alt_text: item.alt_text })) : fallbackGallery;
  const galleryClasses = [styles.galleryMain, styles.gallerySecond, styles.galleryThird, styles.galleryWide];
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroImage} role="img" aria-label="Suasana ibadah umrah di Masjidil Haram" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className={styles.heroActions}>
            <Link href="#program">Lihat pilihan program <span>↓</span></Link>
            <a href={whatsapp} target="_blank" rel="noreferrer">Konsultasi dengan admin <span>↗</span></a>
          </div>
        </div>
        <aside className={styles.depositCard}>
          <small>Uang muka</small>
          <strong>Mulai<br />Rp5 juta</strong>
          <p>Amankan rencana keberangkatan, lalu konfirmasikan skema pembayaran kepada admin.</p>
        </aside>
      </section>

      <section className={styles.programSection} id="program">
        <header className={styles.sectionHead}>
          <div><span>Tiga pilihan perjalanan</span><h2>Pilih program umrah</h2></div>
          <p>Harga, jadwal, hotel, dan fasilitas dapat menyesuaikan periode keberangkatan. Admin Specta akan membantu menjelaskan pilihan terbaru.</p>
        </header>
        <div className={styles.programGrid}>
          {programs.map((program) => (
            <article className={`${styles.programCard} ${program.featured ? styles.featured : ""}`} key={program.name}>
              <div className={styles.cardTop}><span>{program.number}</span><small>{program.label}</small></div>
              <h3>{program.name}</h3>
              <p>{program.description}</p>
              <div className={styles.programSummary}>
                {program.summary.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
              </div>
              <details className={styles.programDetails}>
                <summary>Rincian fasilitas <span>+</span></summary>
                <div className={styles.facilityList}>
                  {program.facilities.map(([label, value]) => <div key={label}><span>{label}</span><strong className={value === "✓" ? styles.included : value === "—" ? styles.unavailable : ""}>{value}</strong></div>)}
                </div>
              </details>
              <div className={styles.cardBottom}><strong>{program.price}</strong><a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`Tanyakan ${program.name}`}>↗</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.plusSection}>
        <header className={styles.plusHeading}>
          <div><span>Perjalanan ibadah dan destinasi pilihan</span><h2>Program Umrah Plus</h2></div>
          <p>Program umrah yang dilengkapi perjalanan ke destinasi pilihan. Harga ditampilkan sebagai estimasi awal dan perlu dikonfirmasi kembali kepada admin.</p>
        </header>
        <div className={styles.plusGrid}>
          {plusPrograms.map((program) => (
            <article className={styles.plusCard} key={program.name}>
              <div className={styles.plusImage} style={{ backgroundImage: `url(${program.image})` }} role="img" aria-label={`Destinasi ${program.destination}`}>
                {program.popular && <span className={styles.popularBadge}>Populer</span>}
                <strong>{program.destination}</strong>
              </div>
              <div className={styles.plusBody}>
                <h3>{program.name}</h3>
                <div className={styles.plusPrice}><small>Mulai dari</small><b>{program.price}</b><span>/jamaah</span></div>
                <div className={styles.plusDuration}><span aria-hidden="true">◷</span>{program.duration}</div>
                <ul>{program.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                <a href={whatsapp} target="_blank" rel="noreferrer">Tanya jadwal <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.plusHelp}>
          <div><strong>Belum yakin program mana yang sesuai?</strong><p>Sampaikan rencana tanggal keberangkatan dan jumlah jamaah. Admin Specta akan membantu membandingkan pilihannya.</p></div>
          <a href={whatsapp} target="_blank" rel="noreferrer">Minta saran admin <span>↗</span></a>
        </div>
        <p className={styles.plusNote}>Harga per jamaah dapat berubah mengikuti tanggal keberangkatan, kurs, maskapai, hotel, dan tipe kamar. Konfirmasikan detail terbaru kepada admin Specta.</p>
      </section>

      {departures.length > 0 && <section className={styles.departureSection}>
        <header><div><span>Jadwal terkonfirmasi</span><h2>Keberangkatan mendatang</h2></div><p>Kuota dan harga dapat berubah. Hubungi admin untuk mengamankan kursi pada jadwal pilihan.</p></header>
        <div className={styles.departureGrid}>{departures.slice(0, 6).map((schedule) => <article key={schedule.id}><small>{schedule.label ?? schedule.travel_packages.title}</small><h3>{formatDepartureDate(schedule.departure_date)}</h3><p>{schedule.departure_city ? `Berangkat dari ${schedule.departure_city}` : "Kota keberangkatan dikonfirmasi admin"}</p><div><strong>{schedule.status === "sold_out" ? "Kuota penuh" : schedule.price_label ?? "Tanyakan harga"}</strong>{schedule.quota_remaining !== null && <span>Sisa {schedule.quota_remaining} kursi</span>}</div><a href={whatsapp} target="_blank" rel="noreferrer">Tanya jadwal ↗</a></article>)}</div>
      </section>}

      <section className={styles.journeyGallery}>
        <header className={styles.galleryHeading}>
          <div><span>Dokumentasi perjalanan</span><h2>Perjalanan jamaah bersama Specta</h2></div>
          <p>Pendampingan tidak berhenti pada persiapan. Specta menemani jamaah menjalani rangkaian perjalanan dan ibadah di Tanah Suci.</p>
        </header>
        <div className={styles.galleryGrid}>{galleryItems.map((item, index) => <figure aria-label={item.alt_text} className={`${styles.galleryPhoto} ${galleryClasses[index] ?? ""}`} style={{ backgroundImage: `url('${item.url}')` }} key={`${item.url}-${index}`}><figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong></figcaption></figure>)}</div>
      </section>

      <section className={styles.privateDetail}>
        <div className={styles.privateIntro}>
          <span>Paket Umrah Private</span>
          <h2>Informasi Umrah Private</h2>
          <p>Referensi paket private dari materi Specta menggunakan penerbangan Garuda Indonesia dengan rute Jakarta–Jeddah dan Jeddah–Jakarta.</p>
          <div className={styles.hotelRow}><div><small>Makkah</small><strong>Maisan Al Maqom</strong><span>Hotel bintang 3</span></div><div><small>Madinah</small><strong>Alfakhma Golden</strong><span>Hotel bintang 3</span></div></div>
        </div>
        <div className={styles.pricePanel}>
          <div className={styles.pricePanelHead}><span>Estimasi berdasarkan jumlah peserta</span><small>Harga per orang</small></div>
          <div className={styles.priceLine}><span>10 peserta</span><strong>Rp34 juta</strong></div>
          <div className={styles.priceLine}><span>17 peserta</span><strong>Rp31 juta</strong></div>
          <div className={styles.priceLine}><span>27 peserta</span><strong>Rp29 juta</strong></div>
          <p>Harga merupakan referensi materi program dan perlu dikonfirmasi kembali untuk periode keberangkatan terbaru.</p>
        </div>
      </section>

      <section className={styles.includedSection}>
        <div className={styles.includedTitle}><span>Fasilitas program</span><h2>Fasilitas yang termasuk</h2></div>
        <div className={styles.inclusionGrid}>{inclusions.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i>✓</i></div>)}</div>
      </section>

      <section className={styles.steps}>
        <header><span>Alur pendaftaran</span><h2>Cara pendaftaran</h2></header>
        <div className={styles.stepGrid}>
          <div><b>01</b><h3>Konsultasi program</h3><p>Sampaikan kebutuhan, jumlah jamaah, dan rencana waktu keberangkatan.</p></div>
          <div><b>02</b><h3>Pilih program</h3><p>Admin menjelaskan pilihan paket, fasilitas, jadwal, dan biaya terbaru.</p></div>
          <div><b>03</b><h3>Uang muka</h3><p>Konfirmasi pendaftaran dengan uang muka mulai Rp5 juta sesuai ketentuan.</p></div>
          <div><b>04</b><h3>Persiapan jamaah</h3><p>Lengkapi dokumen dan ikuti arahan persiapan serta manasik sebelum berangkat.</p></div>
        </div>
      </section>

      <section className={styles.cta}>
        <span>Informasi program & pendaftaran</span>
        <h2>Tanyakan jadwal dan biaya keberangkatan terbaru</h2>
        <p>Hubungi admin untuk memastikan jadwal, ketersediaan, fasilitas, dan biaya keberangkatan terbaru.</p>
        <a href={whatsapp} target="_blank" rel="noreferrer">Tanyakan program via WhatsApp <span>↗</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
