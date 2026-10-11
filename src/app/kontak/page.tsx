import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import styles from "./kontak.module.css";

export const metadata: Metadata = {
  title: "Kontak | Specta Tour and Travel",
  description: "Hubungi admin Specta Tour and Travel untuk informasi perjalanan wisata, umrah, layanan, serta kebutuhan group dan corporate.",
};

const phone = "6282339593295";
const whatsapp = `https://wa.me/${phone}?text=Halo%20Specta%2C%20saya%20ingin%20bertanya%20tentang%20perjalanan.`;

const topics = [
  ["Paket wisata", "Tanyakan perjalanan domestik atau mancanegara.", "paket%20wisata"],
  ["Program umrah", "Diskusikan program, jadwal, dan kebutuhan jamaah.", "program%20umrah"],
  ["Group & Corporate", "Sampaikan kebutuhan perjalanan perusahaan atau kelompok.", "group%20dan%20corporate"],
  ["Layanan perjalanan", "Tanyakan tiket, hotel, transportasi, atau custom trip.", "layanan%20perjalanan"],
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Kontak Specta</span>
          <h1>Perjalanan berikutnya dimulai dari percakapan.</h1>
          <p>Sampaikan tujuan atau kebutuhan Anda. Admin Specta akan membantu mengarahkan informasi dan pilihan perjalanan yang sesuai.</p>
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
          <a href={whatsapp} target="_blank" rel="noreferrer"><small>01</small><div><span>WhatsApp Admin</span><strong>+62 823-3959-3295</strong></div><i>↗</i></a>
          <a href="https://www.instagram.com/spectatravel/" target="_blank" rel="noreferrer"><small>02</small><div><span>Instagram</span><strong>@spectatravel</strong></div><i>↗</i></a>
          <div><small>03</small><div><span>Lokasi layanan</span><strong>Garut, Jawa Barat</strong></div><i>•</i></div>
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
            <a href={`https://wa.me/${phone}?text=Halo%20Specta%2C%20saya%20ingin%20bertanya%20tentang%20${query}.`} target="_blank" rel="noreferrer" key={title}>
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
