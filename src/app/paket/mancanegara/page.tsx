import type { Metadata } from "next";
import Link from "next/link";
import styles from "../packages.module.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Paket Wisata Mancanegara | Specta Tour and Travel",
  description: "Pilihan perjalanan mancanegara Specta Tour and Travel.",
};

const whatsapp = "https://wa.me/6280000000000?text=Halo%20Specta%2C%20saya%20ingin%20bertanya%20tentang%20paket%20wisata%20mancanegara.";

const destinations = [
  { place: "Thailand", description: "Budaya, kuliner, pusat kota, dan pengalaman Asia Tenggara yang penuh warna.", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=88" },
  { place: "Singapore", description: "Perjalanan kota yang modern, nyaman, dan mudah dinikmati bersama keluarga maupun kelompok.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=88" },
  { place: "Vietnam", description: "Lanskap khas, budaya lokal, dan pengalaman autentik dalam rangkaian perjalanan yang berkesan.", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=88" },
  { place: "Malaysia", description: "Kota modern, warisan budaya, pilihan kuliner, dan destinasi keluarga dalam satu perjalanan.", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=88" },
];

export default function InternationalPackagesPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div><span className={styles.eyebrow}>Perjalanan luar negeri bersama Specta</span><h1>Paket wisata mancanegara</h1></div>
        <div className={styles.heroCopy}><p>Pilih tujuan yang menarik perhatian Anda. Admin Specta akan membantu menjelaskan pilihan jadwal, rute, fasilitas, dan estimasi biaya terbaru.</p><div className={styles.heroStats}><div><b>4</b><span>Negara tujuan</span></div><div><b>1</b><span>Admin untuk berdiskusi</span></div></div></div>
      </section>

      <nav className={styles.tabs} aria-label="Kategori paket"><Link href="/#paket">Semua Paket</Link><Link href="/paket/domestik">Domestik</Link><Link className={styles.active} href="/paket/mancanegara">Mancanegara</Link></nav>

      <section className={styles.catalogue}>
        <div className={styles.sectionHead}><h2>Destinasi yang tersedia</h2><p>Harga, jadwal keberangkatan, rute, dan fasilitas belum dicantumkan karena materi brosur rinci belum tersedia. Informasi tersebut tidak dibuat-buat dan akan dilengkapi setelah data resmi diterima.</p></div>
        <div className={styles.internationalGrid}>
          {destinations.map((item) => (
            <article className={styles.internationalCard} style={{backgroundImage:`url(${item.image})`}} key={item.place}>
              <small>Tour mancanegara</small><h2>{item.place}</h2><p>{item.description}</p><Link href={whatsapp}>Tanyakan paket & jadwal ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}><h2>Rencanakan perjalanan ke luar negeri bersama Specta</h2><p>Sampaikan negara tujuan, waktu perjalanan, dan jumlah peserta kepada admin.</p><Link href={whatsapp}>Mulai diskusi via WhatsApp ↗</Link></section>
      <SiteFooter />
    </main>
  );
}
