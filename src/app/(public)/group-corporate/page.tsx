import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getHeroContent, getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl } from "@/lib/cms/contact";
import { getPageMetadata } from "@/lib/cms/metadata";
import styles from "./group-corporate.module.css";

const fallbackMetadata = {
  title: "Group & Corporate | Specta Tour and Travel",
  description: "Layanan perjalanan grup dan perusahaan yang disusun sesuai kebutuhan bersama Specta Tour and Travel.",
};

export function generateMetadata() {
  return getPageMetadata("group-corporate", fallbackMetadata);
}

const fallbackHero = {
  eyebrow: "Group & Corporate Travel",
  title: "Perjalanan bersama, dirancang lebih terarah.",
  description: "Dari gathering hingga perjalanan dinas, Specta membantu menyusun kebutuhan kelompok dalam satu koordinasi.",
};

const services = [
  { number: "01", label: "Kebersamaan", title: "Company Gathering", text: "Waktu berkualitas untuk berbagi pengalaman, menikmati perjalanan, dan mempererat hubungan di luar rutinitas kerja.", image: "/specta-corporate-together.png" },
  { number: "02", label: "Aktivitas tim", title: "Corporate Outing", text: "Aktivitas rekreatif yang dirancang agar tim dapat bersantai, berinteraksi, dan menikmati destinasi bersama.", image: "/specta-corporate-outing.png" },
  { number: "03", label: "Keberangkatan", title: "Business Travel", text: "Dukungan tiket, dokumen perjalanan, hotel, transportasi, dan koordinasi keberangkatan dalam satu layanan.", image: "/specta-corporate-departure.png" },
  { number: "04", label: "Pendampingan", title: "Meeting, Training & Event Trip", text: "Koordinator perjalanan membantu menyelaraskan agenda meeting, pelatihan, atau acara dengan kebutuhan peserta.", image: "/specta-corporate-coordinator.png" },
  { number: "05", label: "Apresiasi", title: "Incentive Trip", text: "Pengalaman bersama di destinasi pilihan sebagai bentuk penghargaan untuk karyawan, mitra, atau pelanggan.", image: "/specta-corporate-group.png" },
  { number: "06", label: "Sesuai kebutuhan", title: "Custom Group Tour", text: "Destinasi, aktivitas, tempo perjalanan, dan kebutuhan peserta disusun menjadi program khusus untuk kelompok Anda.", image: "/specta-corporate-outing.png" },
];

const steps = [
  ["01", "Ceritakan kebutuhan", "Sampaikan tujuan, jumlah peserta, tanggal, dan gambaran kegiatan."],
  ["02", "Rancangan perjalanan", "Tim Specta menyiapkan pilihan rute, transportasi, akomodasi, dan aktivitas."],
  ["03", "Penyesuaian program", "Rencana disempurnakan bersama hingga sesuai dengan kebutuhan kelompok."],
  ["04", "Koordinasi perjalanan", "Tim mendampingi persiapan dan pelaksanaan dari awal hingga perjalanan selesai."],
];

export default async function GroupCorporatePage() {
  const [hero, settings] = await Promise.all([getHeroContent("group-corporate", fallbackHero), getSiteSettings()]);
  const whatsapp = buildWhatsAppUrl(settings?.whatsapp, "Halo Specta, saya ingin berkonsultasi tentang perjalanan group dan corporate.");
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className={styles.heroActions}>
            <a href={whatsapp} target="_blank" rel="noreferrer">Konsultasikan perjalanan <span>↗</span></a>
            <Link href="#layanan">Lihat layanan <span>↓</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.reasons}>
        <div className={styles.reasonsHead}>
          <span>Perjalanan perusahaan</span>
          <h2>Kenapa Perusahaan Memerlukan Agen Travel?</h2>
        </div>
        <div className={styles.reasonList}>
          <article><small>01</small><h3>Efisiensi Waktu dan Biaya</h3><p>Detail teknis perjalanan dikoordinasikan dalam satu alur sehingga tim internal dapat lebih fokus pada tujuan kegiatan.</p></article>
          <article><small>02</small><h3>Kenyamanan Karyawan &amp; Grup</h3><p>Transportasi, akomodasi, konsumsi, dan agenda disusun dengan mempertimbangkan kebutuhan peserta.</p></article>
          <article><small>03</small><h3>Pengalaman Berkesan</h3><p>Itinerary dan aktivitas yang tepat membantu perjalanan terasa lebih menyenangkan dan berarti bagi kelompok.</p></article>
          <article><small>04</small><h3>Akses Destinasi Premium</h3><p>Pilihan destinasi, hotel, dan aktivitas dapat didiskusikan sesuai karakter acara serta kebutuhan perusahaan.</p></article>
        </div>
      </section>

      <section className={styles.services} id="layanan">
        <div className={styles.sectionHead}>
          <span>Pilihan program</span>
          <h2>Jenis Paket Corporate &amp; Gathering Perusahaan</h2>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article key={service.number} style={{ backgroundImage: `url(${service.image})` }}>
              <div className={styles.serviceTop}><small>{service.number}</small><span>{service.label}</span></div>
              <div className={styles.serviceCopy}><h3>{service.title}</h3><p>{service.text}</p><i aria-hidden="true">↗</i></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.destinations}>
        <div className={styles.destinationHead}>
          <span className={styles.kicker}>Pilihan tujuan perjalanan</span>
          <h2>Destinasi Favorit untuk Corporate Gathering</h2>
          <p>Tujuan akhir tetap dapat disesuaikan dengan titik keberangkatan, jumlah peserta, agenda, dan karakter kegiatan perusahaan.</p>
        </div>
        <div className={styles.destinationList}>
          <article><small>01</small><h3>Puncak &amp; Bogor</h3><p>Suasana sejuk untuk outing, kegiatan tim, dan perjalanan singkat dari kawasan perkotaan.</p><span>Alam &amp; outing</span></article>
          <article><small>02</small><h3>Bandung</h3><p>Pilihan kuliner, wisata kota, dan aktivitas kelompok dalam akses perjalanan yang relatif mudah.</p><span>Kota &amp; aktivitas</span></article>
          <article><small>03</small><h3>Yogyakarta</h3><p>Perjalanan kelompok dengan kombinasi budaya, kuliner, dan beragam pilihan aktivitas.</p><span>Budaya &amp; pengalaman</span></article>
          <article><small>04</small><h3>Bali</h3><p>Cocok untuk gathering, incentive trip, dan agenda perusahaan dengan pilihan pengalaman yang luas.</p><span>Gathering &amp; incentive</span></article>
          <article><small>05</small><h3>Labuan Bajo</h3><p>Alternatif perjalanan apresiasi dengan lanskap khas dan pengalaman yang lebih eksklusif.</p><span>Premium journey</span></article>
        </div>
      </section>

      <section className={styles.flexible}>
        <div className={styles.flexiblePhoto} role="img" aria-label="Perjalanan kelompok perusahaan" />
        <div className={styles.flexibleCopy}>
          <span className={styles.kicker}>Disusun untuk kelompok Anda</span>
          <h2>Satu tim untuk mengoordinasikan seluruh perjalanan.</h2>
          <p>Mulai dari keberangkatan hingga kepulangan, kebutuhan perjalanan dapat dirancang dalam satu alur koordinasi yang lebih ringkas.</p>
          <div className={styles.features}>
            <span>Transportasi</span><span>Akomodasi</span><span>Aktivitas tim</span><span>Tiket &amp; perjalanan</span><span>Dokumentasi</span><span>Pendampingan</span>
          </div>
          <p className={styles.note}>Penawaran disesuaikan dengan jumlah peserta dan kebutuhan perjalanan.</p>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.sectionHead}>
          <span>Cara memulai</span>
          <h2>Proses Pemesanan Paket Corporate</h2>
        </div>
        <div className={styles.stepList}>
          {steps.map(([number, title, text]) => (
            <article key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.faqHead}>
          <span className={styles.kicker}>Pertanyaan umum</span>
          <h2>Hal yang biasanya ditanyakan sebelum menyusun perjalanan.</h2>
        </div>
        <div className={styles.faqList}>
          <details><summary>Apakah program dapat menyesuaikan anggaran perusahaan?<span>+</span></summary><p>Sampaikan kisaran anggaran, jumlah peserta, dan kebutuhan utama. Admin akan membantu menyusun arah program serta pilihan layanan yang dapat dipertimbangkan.</p></details>
          <details><summary>Apa perbedaan company gathering dan incentive trip?<span>+</span></summary><p>Company gathering berfokus pada kebersamaan tim, sedangkan incentive trip umumnya dirancang sebagai bentuk apresiasi bagi karyawan, mitra, atau pelanggan.</p></details>
          <details><summary>Apakah perjalanan dapat dibuat di dalam atau luar negeri?<span>+</span></summary><p>Rencana dapat didiskusikan untuk tujuan domestik maupun mancanegara dengan menyesuaikan peserta, waktu, serta kebutuhan perjalanan.</p></details>
          <details><summary>Informasi apa yang perlu disiapkan saat konsultasi?<span>+</span></summary><p>Siapkan tujuan perjalanan, perkiraan tanggal, jumlah peserta, kota keberangkatan, agenda utama, dan kisaran kebutuhan.</p></details>
        </div>
      </section>

      <section className={styles.cta}>
        <span>Rencanakan perjalanan kelompok</span>
        <h2>Ceritakan kebutuhan perusahaan atau kelompok Anda.</h2>
        <p>Admin Specta akan membantu menyiapkan arah program dan informasi yang diperlukan.</p>
        <a href={whatsapp} target="_blank" rel="noreferrer">Konsultasi via WhatsApp <span>↗</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
