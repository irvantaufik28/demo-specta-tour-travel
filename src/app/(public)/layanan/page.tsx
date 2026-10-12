import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getHeroContent, getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl } from "@/lib/cms/contact";
import { getPageMetadata } from "@/lib/cms/metadata";
import styles from "./layanan.module.css";

const fallbackMetadata = {
  title: "Layanan Perjalanan | Specta Tour and Travel",
  description: "Tiket pesawat, hotel, transportasi, custom trip, dan konsultasi perjalanan bersama Specta Tour and Travel.",
};

export function generateMetadata() {
  return getPageMetadata("layanan", fallbackMetadata);
}

const fallbackHero = {
  eyebrow: "Layanan perjalanan Specta",
  title: "Kebutuhan perjalanan, dibantu dalam satu tempat.",
  description: "Dari tiket hingga susunan perjalanan khusus, pilih layanan yang Anda perlukan dan diskusikan detailnya langsung bersama admin Specta.",
};

const services = [
  { number: "01", title: "Tiket Pesawat", summary: "Domestik & internasional", text: "Bantuan memilih rute, jadwal, dan penerbangan yang sesuai dengan rencana perjalanan Anda." },
  { number: "02", title: "Reservasi Hotel", summary: "Akomodasi perjalanan", text: "Pilihan hotel disesuaikan dengan tujuan, durasi, kebutuhan peserta, dan kisaran anggaran." },
  { number: "03", title: "Transportasi", summary: "Perjalanan darat", text: "Kendaraan untuk penjemputan, perjalanan kelompok, maupun kebutuhan transportasi selama program." },
  { number: "04", title: "Custom Trip", summary: "Perjalanan sesuai rencana", text: "Destinasi, waktu, aktivitas, dan tempo perjalanan disusun berdasarkan kebutuhan Anda." },
  { number: "05", title: "Konsultasi Perjalanan", summary: "Mulai dari percakapan", text: "Bantuan menentukan tujuan, rute, dan layanan yang paling sesuai sebelum melakukan pemesanan." },
];

const steps = [
  ["01", "Sampaikan kebutuhan", "Ceritakan tujuan, tanggal, jumlah peserta, dan layanan yang diperlukan."],
  ["02", "Terima pilihan", "Admin membantu menyiapkan informasi jadwal, ketersediaan, dan pilihan layanan."],
  ["03", "Konfirmasi", "Tinjau kembali detail perjalanan sebelum melanjutkan proses pemesanan."],
  ["04", "Siap berangkat", "Informasi perjalanan dan kebutuhan akhir dikoordinasikan bersama admin."],
];

export default async function ServicesPage() {
  const [hero, settings] = await Promise.all([getHeroContent("layanan", fallbackHero), getSiteSettings()]);
  const whatsapp = buildWhatsAppUrl(settings?.whatsapp, "Halo Specta, saya ingin bertanya tentang layanan perjalanan.");
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <a href={whatsapp} target="_blank" rel="noreferrer">Tanyakan kebutuhan <span>↗</span></a>
        </div>
        <div className={styles.heroVisual}>
          <Image src="/specta-corporate-departure.png" alt="Dokumen keberangkatan perjalanan bersama Specta" fill sizes="(max-width: 900px) 100vw, 48vw" priority />
          <div className={styles.heroNote}><small>Layanan fleksibel</small><strong>Sesuai kebutuhan perjalanan Anda</strong></div>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.sectionHead}>
          <span>Yang dapat kami bantu</span>
          <h2>Pilih layanan sesuai kebutuhan perjalanan.</h2>
        </div>
        <div className={styles.serviceList}>
          {services.map((service) => (
            <article key={service.number}>
              <small>{service.number}</small>
              <div><span>{service.summary}</span><h3>{service.title}</h3></div>
              <p>{service.text}</p>
              <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`Tanyakan ${service.title}`}>↗</a>
            </article>
          ))}
        </div>
        <p className={styles.availability}>Informasi harga dan ketersediaan dikonfirmasi oleh admin sesuai tanggal perjalanan.</p>
      </section>

      <section className={styles.combine}>
        <div className={styles.combinePhoto}>
          <Image src="/specta-journey-vietnam.webp" alt="Dokumentasi perjalanan bersama Specta" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className={styles.combineCopy}>
          <span className={styles.eyebrow}>Layanan dapat digabungkan</span>
          <h2>Satu percakapan untuk mengatur lebih banyak kebutuhan.</h2>
          <p>Anda tidak harus memesan layanan secara terpisah. Tiket, hotel, transportasi, dan susunan perjalanan dapat dibicarakan dalam satu rencana.</p>
          <div className={styles.combinations}>
            <div><small>01</small><span>Tiket + Hotel</span></div>
            <div><small>02</small><span>Hotel + Transportasi</span></div>
            <div><small>03</small><span>Custom Trip Lengkap</span></div>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.sectionHead}>
          <span>Cara menggunakan layanan</span>
          <h2>Ringkas dari konsultasi hingga siap berangkat.</h2>
        </div>
        <div className={styles.stepGrid}>
          {steps.map(([number, title, text]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={styles.faq}>
        <div><span className={styles.eyebrow}>Pertanyaan umum</span><h2>Sebelum menghubungi admin.</h2></div>
        <div className={styles.faqList}>
          <details><summary>Apakah harga tiket dan hotel selalu sama?<span>+</span></summary><p>Tidak. Harga mengikuti tanggal, rute, tipe akomodasi, serta ketersediaan saat permintaan diproses.</p></details>
          <details><summary>Apakah layanan dapat dipesan secara terpisah?<span>+</span></summary><p>Ya. Anda dapat menanyakan satu layanan saja atau menggabungkan beberapa kebutuhan perjalanan.</p></details>
          <details><summary>Informasi apa yang perlu disiapkan?<span>+</span></summary><p>Sampaikan tujuan, tanggal, jumlah peserta, kota keberangkatan, serta kebutuhan yang ingin dibantu.</p></details>
        </div>
      </section>

      <section className={styles.cta}>
        <span>Belum yakin layanan yang dibutuhkan?</span>
        <h2>Ceritakan rencana perjalanan Anda kepada admin Specta.</h2>
        <a href={whatsapp} target="_blank" rel="noreferrer">Tanya via WhatsApp <i>↗</i></a>
      </section>

      <SiteFooter />
    </main>
  );
}
