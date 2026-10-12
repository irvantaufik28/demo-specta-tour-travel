import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getHeroContent, getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl, formatPhone, instagramHandle, instagramUrl, normalizeWhatsAppNumber } from "@/lib/cms/contact";
import { getPageMetadata } from "@/lib/cms/metadata";
import styles from "./kontak.module.css";

const fallbackMetadata = {
  title: "Kontak | Specta Tour and Travel",
  description: "Hubungi admin Specta Tour and Travel untuk informasi perjalanan wisata, umrah, layanan, serta kebutuhan group dan corporate.",
};

export function generateMetadata() {
  return getPageMetadata("kontak", fallbackMetadata);
}

const fallbackHero = {
  eyebrow: "Kontak Specta",
  title: "Perjalanan berikutnya dimulai dari percakapan.",
  description: "Sampaikan tujuan atau kebutuhan Anda. Admin Specta akan membantu mengarahkan informasi dan pilihan perjalanan yang sesuai.",
};

const topics = [
  ["Paket wisata", "Tanyakan perjalanan domestik atau mancanegara.", "paket wisata"],
  ["Program umrah", "Diskusikan program, jadwal, dan kebutuhan jamaah.", "program umrah"],
  ["Group & Corporate", "Sampaikan kebutuhan perjalanan perusahaan atau kelompok.", "group dan corporate"],
  ["Layanan perjalanan", "Tanyakan tiket, hotel, transportasi, atau custom trip.", "layanan perjalanan"],
];

export default async function ContactPage() {
  const [hero, settings] = await Promise.all([getHeroContent("kontak", fallbackHero), getSiteSettings()]);
  const phone = normalizeWhatsAppNumber(settings?.whatsapp);
  const whatsapp = buildWhatsAppUrl(phone);
  const instagram = instagramHandle(settings?.instagram);
  const email = settings?.email ?? "info@spectatravel.id";
  const address = settings?.address ?? "Garut, Jawa Barat";
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <a href={whatsapp} target="_blank" rel="noreferrer">Mulai percakapan di WhatsApp <span>↗</span></a>
        </div>
        <div className={styles.heroPhoto}>
          <Image src="/specta-about-team.webp" alt="Tim Specta Tour and Travel" fill sizes="(max-width: 900px) 100vw, 48vw" priority />
          <div className={styles.photoTag}><i /><span>Siap membantu kebutuhan perjalanan Anda</span></div>
        </div>
      </section>

      <section className={styles.channels}>
        <div className={styles.sectionHead}>
          <span>Kanal utama</span>
          <h2>Hubungi Specta melalui kanal berikut.</h2>
        </div>
        <div className={styles.channelList}>
          <a href={whatsapp} target="_blank" rel="noreferrer"><small>01</small><div><span>WhatsApp Admin</span><strong>{formatPhone(phone)}</strong></div><i>↗</i></a>
          <a href={instagramUrl(settings?.instagram)} target="_blank" rel="noreferrer"><small>02</small><div><span>Instagram</span><strong>{instagram}</strong></div><i>↗</i></a>
          <a href={`mailto:${email}`}><small>03</small><div><span>Email</span><strong>{email}</strong></div><i>↗</i></a>
          <div><small>04</small><div><span>Lokasi layanan</span><strong>{address}</strong></div><i>•</i></div>
        </div>
      </section>

      <section className={styles.prepare}>
        <div className={styles.prepareCopy}>
          <span className={styles.eyebrow}>Sebelum menghubungi admin</span>
          <h2>Siapkan gambaran singkat perjalanan Anda.</h2>
          <p>Informasi awal membantu admin memahami kebutuhan dan memberikan jawaban yang lebih relevan.</p>
        </div>
        <div className={styles.checklist}>
          <div><small>01</small><span>Tujuan atau destinasi</span></div>
          <div><small>02</small><span>Perkiraan tanggal</span></div>
          <div><small>03</small><span>Jumlah peserta</span></div>
          <div><small>04</small><span>Kota keberangkatan</span></div>
          <div><small>05</small><span>Layanan yang dibutuhkan</span></div>
        </div>
      </section>

      <section className={styles.topics}>
        <div className={styles.sectionHead}>
          <span>Pilih topik</span>
          <h2>Langsung tanyakan kebutuhan Anda.</h2>
        </div>
        <div className={styles.topicGrid}>
          {topics.map(([title, text, query], index) => (
            <a href={buildWhatsAppUrl(phone, `Halo Specta, saya ingin bertanya tentang ${query}.`)} target="_blank" rel="noreferrer" key={title}>
              <small>0{index + 1}</small><h3>{title}</h3><p>{text}</p><i>↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.note}>
        <span>Catatan</span>
        <p>Informasi harga, jadwal, dan ketersediaan dikonfirmasi langsung oleh admin berdasarkan tanggal serta kebutuhan perjalanan.</p>
      </section>

      <section className={styles.cta}>
        <span>Masih belum yakin harus mulai dari mana?</span>
        <h2>Ceritakan saja rencana Anda. Admin akan membantu mengarahkannya.</h2>
        <a href={whatsapp} target="_blank" rel="noreferrer">Hubungi admin Specta <i>↗</i></a>
      </section>

      <SiteFooter />
    </main>
  );
}
