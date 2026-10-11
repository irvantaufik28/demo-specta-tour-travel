import type { Metadata } from "next";
import Link from "next/link";
import styles from "../packages.module.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Paket Wisata Domestik | Specta Tour and Travel",
  description: "Pilihan open trip dan private trip domestik Specta Tour and Travel.",
};

const whatsapp = "https://wa.me/6280000000000?text=Halo%20Specta%2C%20saya%20ingin%20bertanya%20tentang%20paket%20wisata%20domestik.";

const packages = [
  {
    slug: "pulau-tidung", type: "Open Trip", place: "Pulau Tidung", title: "Pulau Tidung Escape", duration: "2H1M", origin: "Garut", price: "Mulai dari Rp885.000/pax",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=88",
    summary: "Perjalanan pulau dengan aktivitas snorkeling, bersepeda, sunset, dan kebersamaan dalam suasana santai.",
    included: ["Bus pariwisata pulang-pergi", "BBM dan tip pengemudi", "Kapal Muara Angke–Pulau Tidung", "Makan sesuai program 5 kali", "Makan prasmanan 3 kali", "Banana boat dan kapal snorkeling", "Sewa sepeda", "BBQ ikan dan sate cumi", "Foto bawah air", "Air mineral, banner, local guide, dan tour leader"],
    excluded: ["Aktivitas di luar program", "Makan dan minum di luar fasilitas", "Keperluan pribadi"],
    itinerary: [
      { day: "Hari 1", text: "Meeting point, perjalanan ke Muara Angke, menyeberang ke Pulau Tidung, check-in, banana boat atau snorkeling, sunset di Jembatan Cinta, lalu BBQ malam." },
      { day: "Hari 2", text: "Sunrise, sarapan, bersepeda mengelilingi pulau, Saung Cemara Kasih, hutan mangrove, penangkaran penyu, Museum Tulang Paus, check-out, dan kembali ke Jakarta." },
    ],
  },
  {
    slug: "dufan", type: "Open Trip", place: "Dufan", title: "Dufan Fun Day", duration: "1 hari", origin: "Garut", price: "Mulai dari Rp365.000/pax",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=88",
    summary: "Perjalanan satu hari ke kawasan Ancol dan Dunia Fantasi dengan transportasi dan tiket yang sudah disiapkan.",
    included: ["Bus pariwisata", "BBM dan tip pengemudi", "Biaya tol dan parkir", "Tiket masuk Ancol", "Tiket masuk Dufan", "Air mineral satu botol", "Banner dan tour leader"],
    excluded: ["Aktivitas di luar program", "Makan dan minum", "Keperluan pribadi"],
    itinerary: [{ day: "Rencana perjalanan", text: "Penjemputan pukul 03.00, perjalanan melalui Tol Cipularang, tiba di Ancol, menikmati wahana Dufan, persiapan pulang pukul 16.30, istirahat dan makan di rest area, estimasi tiba kembali pukul 23.00." }],
  },
  {
    slug: "malang-bromo", type: "Open Trip", place: "Malang–Bromo", title: "Malang & Bromo Journey", duration: "4H3M", origin: "Bandung", price: "Mulai dari Rp1.585.000/pax",
    image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=88",
    summary: "Rangkaian wisata Bromo dan Malang yang memadukan lanskap alam, pengalaman jeep, serta destinasi keluarga.",
    included: ["Bus pariwisata pulang-pergi", "BBM dan tip pengemudi", "Satu malam hotel bintang tiga", "Makan sesuai program 5 kali", "Tiket masuk objek wisata", "Sewa jeep Bromo", "Air mineral satu botol per hari", "Banner, dokumentasi, dan tour leader"],
    excluded: ["Aktivitas di luar program", "Makan dan minum di luar fasilitas", "Keperluan pribadi"],
    itinerary: [
      { day: "Hari 1", text: "Berkumpul di meeting point dan perjalanan menuju Probolinggo." },
      { day: "Hari 2", text: "Jeep Bromo menuju Pananjakan, Lembah Widodaren, Kawah Bromo, Pura Luhur, Pasir Berbisik, Bukit Savana Teletubbies, lalu check-in hotel." },
      { day: "Hari 3", text: "Check-out, petik apel, Batu Malang, Museum Angkut atau Jatim Park, dan wisata oleh-oleh khas Malang." },
      { day: "Hari 4", text: "Sarapan di restoran lokal, singgah di Malioboro Yogyakarta, kemudian perjalanan pulang." },
    ],
  },
  {
    slug: "seaworld", type: "Open Trip", place: "SeaWorld", title: "SeaWorld & Ocean Dream", duration: "1 hari", origin: "Garut", price: "Mulai dari Rp400.000/pax",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=88",
    summary: "Wisata edukasi keluarga ke SeaWorld dan Ocean Dream Samudra dalam satu perjalanan sehari.",
    included: ["Bus pariwisata", "BBM dan tip pengemudi", "Biaya tol dan parkir", "Tiket masuk Ancol", "Tiket SeaWorld", "Tiket Ocean Dream Samudra", "Air mineral satu botol", "Banner dan tour leader"],
    excluded: ["Aktivitas di luar program", "Makan dan minum", "Keperluan pribadi"],
    itinerary: [{ day: "Rencana perjalanan", text: "Penjemputan pukul 03.00, menuju Ancol melalui Tol Cipularang, kunjungan ke SeaWorld, dilanjutkan ke Ocean Dream Samudra, persiapan pulang pukul 17.00, istirahat di rest area, dan estimasi tiba kembali pukul 23.00." }],
  },
  {
    slug: "yogyakarta", type: "Open Trip", place: "Yogyakarta", title: "Yogyakarta Heritage Trip", duration: "2H1M", origin: "Bandung", price: "Mulai dari Rp1.100.000/pax",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1600&q=88",
    summary: "Perjalanan budaya dan rekreasi ke Merapi, destinasi kota Yogyakarta, serta waktu bebas di Malioboro.",
    included: ["Bus pariwisata pulang-pergi", "BBM dan tip pengemudi", "Satu malam hotel bintang tiga", "Makan sesuai program 3 kali", "Tiket masuk tempat wisata", "Sewa mobil jeep", "Air mineral satu botol per hari", "Banner dan tour leader"],
    excluded: ["Aktivitas di luar program", "Makan dan minum di luar fasilitas", "Keperluan pribadi"],
    itinerary: [
      { day: "Hari 1", text: "Menuju Yogyakarta, Lava Tour Merapi, Museum Sisa Hartaku, The Lost World Castle, Bunker Kaliadem, HeHa Sky View, lalu check-in hotel dan acara bebas." },
      { day: "Hari 2", text: "Sarapan dan check-out, Taman Sari, pusat oleh-oleh khas Yogyakarta, waktu bebas di Malioboro, kemudian perjalanan pulang." },
    ],
  },
  {
    slug: "taman-safari", type: "Open Trip", place: "Taman Safari", title: "Taman Safari Journey", duration: "1 hari", origin: "Garut", price: "Mulai dari Rp365.000/pax",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=88",
    summary: "Perjalanan keluarga menuju Taman Safari Bogor untuk menikmati Safari Journey dan mengeksplorasi kawasan.",
    included: ["Bus pariwisata", "BBM dan tip pengemudi", "Biaya tol dan parkir", "Tiket masuk Taman Safari", "Air mineral satu botol", "Banner dan tour leader"],
    excluded: ["Aktivitas di luar program", "Makan dan minum", "Keperluan pribadi"],
    itinerary: [{ day: "Rencana perjalanan", text: "Penjemputan pukul 03.00, perjalanan melalui Tol Cipularang, tiba di Taman Safari Bogor, Safari Journey, eksplorasi kawasan, persiapan pulang pukul 16.30, istirahat dan makan di rest area, estimasi tiba kembali pukul 23.00." }],
  },
  {
    slug: "bali-nusa-penida", type: "Private Trip", place: "Bali", title: "Bali & Nusa Penida", duration: "4H3M", origin: "Bali", price: "Mulai dari Rp2.750.000/pax",
    priceOptions: ["9–14 pax · Rp2.750.000", "5–8 pax · Rp3.250.000", "2–4 pax · Rp3.350.000"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=88",
    summary: "Private trip Bali dan Nusa Penida dengan harga per orang yang menyesuaikan jumlah peserta.",
    included: ["Hotel dua malam sesuai pilihan", "Transportasi mobil, van, atau elf", "Speedboat Bali–Nusa Penida pulang-pergi", "Tiket masuk objek wisata", "Tour guide", "Makan sesuai program", "Air mineral dan welcome flower"],
    excluded: ["Tiket pesawat dan bagasi", "Tip guide dan pengemudi", "Aktivitas di luar program", "Tambahan makan dan minum", "Keperluan pribadi"],
    itinerary: [
      { day: "Hari 1", text: "Bertemu di bandara, Pantai Melasti, Uluwatu Temple, Pantai Jimbaran, Cafe Jimbaran, lalu check-in hotel." },
      { day: "Hari 2", text: "Pantai Sanur, Nusa Penida, Pantai Kelingking atau Karang Dewa, Crystal Bay, Angel’s Billabong, Broken Bay atau Pasih Uug, kembali ke Sanur dan hotel." },
      { day: "Hari 3", text: "Bali Handara Gate, Pura Ulun Danu Bedugul, check-out, Tanah Lot, kemudian check-in hotel." },
      { day: "Hari 4", text: "Check-out, pusat oleh-oleh Krisna atau Joger Bali, lalu keberangkatan pulang." },
    ],
  },
];

export default function DomesticPackagesPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div><span className={styles.eyebrow}>Jelajahi Indonesia bersama Specta</span><h1>Paket wisata domestik</h1></div>
        <div className={styles.heroCopy}><p>Dari perjalanan satu hari hingga private trip beberapa malam, pilih pengalaman yang paling sesuai dengan waktu dan cara bepergian Anda.</p><div className={styles.heroStats}><div><b>7</b><span>Pilihan perjalanan</span></div><div><b>1–4</b><span>Hari perjalanan</span></div></div></div>
      </section>

      <nav className={styles.tabs} aria-label="Kategori paket"><Link href="/#paket">Semua Paket</Link><Link className={styles.active} href="/paket/domestik">Domestik</Link><Link href="/paket/mancanegara">Mancanegara</Link></nav>

      <section className={styles.catalogue}>
        <div className={styles.sectionHead}><h2>Pilihan perjalanan yang tersedia</h2><p>Informasi di bawah disusun dari brosur resmi Specta. Harga, jadwal, dan ketersediaan tetap perlu dikonfirmasi kembali kepada admin.</p></div>
        <div className={styles.packageList}>
          {packages.map((item) => (
            <article className={styles.package} id={item.slug} key={item.slug}>
              <div className={styles.packageTop}>
                <div className={styles.cover} style={{backgroundImage:`url(${item.image})`}} role="img" aria-label={`Ilustrasi perjalanan ${item.place}`}><span className={styles.coverBadge}>{item.type}</span><div><h2>{item.place}</h2><p>{item.duration} · Start {item.origin}</p></div></div>
                <div className={styles.summary}><span className={styles.summaryLabel}>Paket domestik</span><h3>{item.title}</h3><p className={styles.summaryText}>{item.summary}</p><div className={styles.facts}><div><small>Durasi</small><b>{item.duration}</b></div><div><small>Keberangkatan</small><b>{item.origin}</b></div><div><small>Jenis</small><b>{item.type}</b></div></div><strong className={styles.price}>{item.price}</strong>{item.priceOptions && <div className={styles.priceOptions}>{item.priceOptions.map((price) => <span key={price}>{price}</span>)}</div>}</div>
              </div>
              <div className={styles.packageDetails}>
                <div className={styles.detailBox}><h4>Harga termasuk</h4><ul>{item.included.map((facility) => <li key={facility}>{facility}</li>)}</ul></div>
                <div className={`${styles.detailBox} ${styles.excluded}`}><h4>Belum termasuk</h4><ul>{item.excluded.map((facility) => <li key={facility}>{facility}</li>)}</ul></div>
                <div className={styles.detailBox}><h4>Rencana perjalanan</h4><div className={styles.itinerary}>{item.itinerary.map((step) => <div className={styles.day} key={step.day}><b>{step.day}</b><p>{step.text}</p></div>)}</div></div>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.notice}>Harga tidak mengikat dan dapat berubah mengikuti biaya transportasi, akomodasi, tanggal keberangkatan, serta jumlah peserta. Aktivitas di luar program dan kebutuhan pribadi tidak termasuk kecuali dinyatakan lain.</p>
      </section>

      <section className={styles.cta}><h2>Butuh informasi jadwal dan ketersediaan?</h2><p>Tanyakan jadwal terbaru, ketersediaan kursi, dan detail pemesanan kepada admin Specta.</p><Link href={whatsapp}>Tanya admin via WhatsApp ↗</Link></section>
      <SiteFooter />
    </main>
  );
}
