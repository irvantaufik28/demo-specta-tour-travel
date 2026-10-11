import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import styles from "./tentang.module.css";

export const metadata: Metadata = {
  title: "Tentang Specta | Specta Tour and Travel",
  description: "Mengenal Specta Tour and Travel, tim dan cara kami mendampingi perjalanan wisata, umrah, serta kebutuhan kelompok.",
};

const whatsapp = "https://wa.me/6280000000000?text=Halo%20Specta%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20perjalanan.";

const values = [
  ["01", "Personal", "Setiap percakapan dimulai dengan memahami kebutuhan perjalanan."],
  ["02", "Terkoordinasi", "Detail perjalanan disusun dalam alur yang jelas dan mudah diikuti."],
  ["03", "Fleksibel", "Program dapat menyesuaikan peserta, tujuan, waktu, dan kebutuhan."],
  ["04", "Bertanggung jawab", "Komunikasi dan pendampingan dijaga selama proses perjalanan."],
];

const services = ["Wisata domestik", "Wisata mancanegara", "Program umrah", "Private trip", "Group & Corporate", "Tiket, hotel & transportasi"];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Tentang Specta</span>
          <h1>Perjalanan yang baik dimulai dari tim yang peduli.</h1>
          <p>Specta Tour and Travel membantu merencanakan perjalanan wisata, umrah, serta kebutuhan kelompok dengan pelayanan yang terkoordinasi.</p>
        </div>
        <div className={styles.heroPhoto}>
          <Image src="/specta-about-team.webp" alt="Tim Specta Tour and Travel di depan kendaraan perjalanan" fill sizes="(max-width: 900px) 100vw, 55vw" priority />
          <div className={styles.photoLabel}><span>Tim Specta</span><small>Garut, Indonesia</small></div>
        </div>
      </section>

      <section className={styles.story}>
        <span className={styles.sectionLabel}>Cerita kami</span>
        <div className={styles.storyCopy}>
          <h2>Membantu perjalanan terasa lebih jelas sejak awal.</h2>
          <div className={styles.storyText}>
            <p>Berbasis di Garut, Specta hadir untuk membantu wisatawan, jamaah, keluarga, komunitas, dan perusahaan menyiapkan perjalanan sesuai kebutuhannya.</p>
            <p>Kami percaya perjalanan bukan hanya soal tujuan. Ada banyak detail yang perlu dipahami, disusun, dan dikoordinasikan agar setiap peserta dapat berangkat dengan lebih tenang.</p>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.processHead}>
          <span className={styles.sectionLabel}>Cara Specta bekerja</span>
          <h2>Satu alur yang mendampingi perjalanan dari awal.</h2>
        </div>
        <div className={styles.processTrack}>
          {[
            ["01", "Mendengarkan", "Memahami tujuan, waktu, peserta, dan kebutuhan utama."],
            ["02", "Menyusun", "Mengembangkan pilihan program dan detail perjalanan."],
            ["03", "Mengoordinasikan", "Menyelaraskan kebutuhan peserta dan persiapan keberangkatan."],
            ["04", "Mendampingi", "Menjaga komunikasi selama perjalanan berlangsung."],
          ].map(([number, title, text]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={styles.partnership}>
        <div className={styles.partnershipPhoto}>
          <Image src="/specta-about-partnership.webp" alt="Dokumentasi kerja sama Specta Tour and Travel" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className={styles.partnershipCopy}>
          <span className={styles.eyebrow}>Kemitraan &amp; kepercayaan</span>
          <h2>Tumbuh melalui kerja sama yang saling dipercaya.</h2>
          <p>Specta membangun hubungan dengan mitra untuk menghadirkan layanan perjalanan yang semakin terarah dan berkelanjutan.</p>
          <blockquote>“Setiap kerja sama adalah bagian dari upaya kami menjaga kualitas perjalanan.”</blockquote>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.valuesHead}><span className={styles.sectionLabel}>Nilai dalam pelayanan</span><h2>Hal-hal yang kami jaga dalam setiap perjalanan.</h2></div>
        <div className={styles.valueGrid}>
          {values.map(([number, title, text]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={styles.scope}>
        <div><span className={styles.sectionLabel}>Ruang lingkup layanan</span><h2>Satu tim untuk berbagai kebutuhan perjalanan.</h2></div>
        <div className={styles.scopeList}>{services.map((service, index) => <div key={service}><small>0{index + 1}</small><span>{service}</span><i>↗</i></div>)}</div>
      </section>

      <section className={styles.cta}>
        <span>Kenali kebutuhan Anda bersama kami</span>
        <h2>Mari mulai perjalanan dari sebuah percakapan.</h2>
        <a href={whatsapp} target="_blank" rel="noreferrer">Hubungi Specta via WhatsApp <i>↗</i></a>
      </section>

      <SiteFooter />
    </main>
  );
}
