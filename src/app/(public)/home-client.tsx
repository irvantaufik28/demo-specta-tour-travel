"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const featuredPackages = [
  { category: "Domestik", type: "Open Trip", place: "Pulau Tidung", title: "Pulau Tidung Escape", meta: "2H1M · Start Garut · Snorkeling, sepeda, dan BBQ", price: "Mulai dari Rp885.000 /pax", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=86" },
  { category: "Domestik", type: "Open Trip", place: "Malang–Bromo", title: "Malang & Bromo Journey", meta: "4H3M · Start Bandung · Bromo, Batu, dan Malang", price: "Mulai dari Rp1.585.000 /pax", image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1400&q=86" },
  { category: "Domestik", type: "Private Trip", place: "Bali", title: "Bali & Nusa Penida", meta: "4H3M · 2–14 pax · Bali dan Nusa Penida", price: "Mulai dari Rp2.750.000 /pax", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=86" },
];

const heroSlides = [
  { place: "Thailand", region: "Southeast Asia", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2200&q=90" },
  { place: "Singapore", region: "Southeast Asia", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2200&q=90" },
  { place: "Vietnam", region: "Southeast Asia", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=90" },
  { place: "Malaysia", region: "Southeast Asia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=2200&q=90" },
];

interface HomePageClientProps {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  whatsappUrl: string;
}

export default function Home({ hero, whatsappUrl }: HomePageClientProps) {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-photos">
          {heroSlides.map((slide, index) => (
            <div
              className={`hero-photo${index === activeHero ? " active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              role={index === activeHero ? "img" : undefined}
              aria-label={index === activeHero ? `Pemandangan destinasi ${slide.place}` : undefined}
              aria-hidden={index !== activeHero}
              key={slide.place}
            />
          ))}
        </div>
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light"><i /> {hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="hero-actions">
            <a className="button yellow" href="#paket">Temukan perjalanan <span>↘</span></a>
            <a className="link-button" href={whatsappUrl} target="_blank" rel="noreferrer">Rancang perjalanan <span>↗</span></a>
          </div>
        </div>
        <div className="hero-destination"><span>Featured destination</span><b>{heroSlides[activeHero].place}</b><small>{heroSlides[activeHero].region}</small></div>
        <div className="hero-index"><b>{String(activeHero + 1).padStart(2, "0")}</b><i /><span>{String(heroSlides.length).padStart(2, "0")}</span></div>
      </section>

      <section className="intro section" id="layanan">
        <div>
          <span className="eyebrow"><i /> Perjalanan, dirancang lebih personal</span>
          <h2>Perjalanan yang sesuai dengan kebutuhan Anda.</h2>
        </div>
        <div className="intro-copy">
          <p>Specta membantu menerjemahkan rencana menjadi perjalanan yang tertata—mulai dari pemilihan destinasi, transportasi, akomodasi, hingga pengalaman selama perjalanan.</p>
          <a href="#tentang">Kenali cara kami bekerja <span>→</span></a>
          <div className="service-strip">
            <div><b>01</b><span>Tour<br />Planning</span></div>
            <div><b>02</b><span>Ticket &<br />Hotel</span></div>
            <div><b>03</b><span>Transport &<br />Assistance</span></div>
          </div>
        </div>
      </section>

      <section className="destinations section dark">
        <div className="section-head">
          <div><span className="eyebrow light"><i /> Pilihan perjalanan</span><h2>Destinasi mancanegara pilihan</h2></div>
          <p>Mulai dari kota penuh cerita hingga lanskap yang menenangkan. Pilih tujuan, lalu biarkan perjalanan disiapkan bersama Anda.</p>
        </div>
        <div className="destination-grid">
          <article className="destination-card thailand" tabIndex={0}><div><span>01 · Southeast Asia</span><h3>Thailand</h3><p>Perpaduan budaya, kuliner, kota yang hidup, dan pengalaman yang beragam.</p></div><b>Lihat perjalanan <i aria-hidden="true">›</i></b></article>
          <article className="destination-card singapore" tabIndex={0}><div><span>02 · Southeast Asia</span><h3>Singapore</h3><p>City escape yang ringkas, modern, nyaman, dan selalu menyenangkan.</p></div><b>Lihat perjalanan <i aria-hidden="true">›</i></b></article>
          <article className="destination-card vietnam" tabIndex={0}><div><span>03 · Southeast Asia</span><h3>Vietnam</h3><p>Budaya lokal, lanskap khas, dan pengalaman autentik dalam satu perjalanan.</p></div><b>Lihat perjalanan <i aria-hidden="true">›</i></b></article>
          <article className="destination-card malaysia" tabIndex={0}><div><span>04 · Southeast Asia</span><h3>Malaysia</h3><p>Kota modern, warisan budaya, dan ragam kuliner yang mudah dinikmati.</p></div><b>Lihat perjalanan <i aria-hidden="true">›</i></b></article>
        </div>
      </section>

      <section className="packages section" id="paket">
        <div className="package-heading">
          <div><span className="eyebrow"><i /> Paket domestik pilihan</span><h2>Pilihan perjalanan domestik</h2></div>
          <a className="package-view-all" href="/paket/domestik">Lihat perjalanan lengkap <span>↗</span></a>
        </div>
        <div className="package-grid">
          {featuredPackages.map((item) => (
            <article className="package-card" key={item.title}>
              <div className="package-image" style={{ backgroundImage: `url(${item.image})` }} role="img" aria-label={`Foto perjalanan ${item.place}`}><span>{item.type}</span><b>{item.place}</b></div>
              <div className="package-info"><small>{item.category}</small><h3>{item.title}</h3><p>{item.meta}</p><div><strong>{item.price}</strong><a href="/paket/domestik" aria-label={`Lihat detail ${item.title}`}>↗</a></div></div>
            </article>
          ))}
        </div>
        <p className="package-note">Harga diambil dari materi referensi Specta dan dapat berubah mengikuti tanggal keberangkatan, transportasi, akomodasi, serta jumlah peserta. Konfirmasikan ketersediaan kepada admin.</p>
      </section>

      <section className="custom section">
        <div className="custom-visual" role="img" aria-label="Perjalanan pegunungan untuk ilustrasi custom trip">
          <span className="photo-label">YOUR TRIP · YOUR PACE</span>
          <div className="trip-card">
            <small>Contoh perjalanan</small>
            <strong>Swiss Alps</strong>
            <div><span>8 hari</span><span>Private journey</span></div>
            <i>↗</i>
          </div>
        </div>
        <div className="custom-copy">
          <span className="eyebrow light"><i /> Private & custom journey</span>
          <h2>Private trip yang disusun sesuai rencana Anda</h2>
          <p>Ceritakan tempat yang ingin dikunjungi, waktu, dan siapa yang akan ikut. Specta membantu menyusun perjalanan yang lebih sesuai dengan kebutuhan Anda.</p>
          <a className="button yellow" href={whatsappUrl} target="_blank" rel="noreferrer">Mulai dari percakapan <span>↗</span></a>
        </div>
      </section>

      <section className="corporate section" id="corporate">
        <div className="corporate-copy">
          <span className="eyebrow"><i /> Group &amp; Corporate</span>
          <h2>Layanan perjalanan untuk perusahaan dan kelompok</h2>
          <p>Dukungan perjalanan untuk perusahaan, institusi, dan komunitas—mulai dari corporate trip hingga kebutuhan transportasi kelompok.</p>
          <a href="/group-corporate">Lihat layanan Group &amp; Corporate <span>↗</span></a>
        </div>
        <div className="corporate-list">
          {["Corporate Trip", "Company Gathering", "Business Travel", "Meeting & Incentive Trip"].map((name, index) => <div key={name}><b>0{index + 1}</b><span>{name}</span><i>↗</i></div>)}
        </div>
      </section>

      <section className="umrah" id="umrah">
        <div className="umrah-photo" role="img" aria-label="Arsitektur masjid untuk ilustrasi layanan umrah" />
        <div className="umrah-copy">
          <span className="eyebrow light"><i /> Perjalanan ibadah</span>
          <h2>Program umrah untuk kebutuhan perjalanan yang berbeda</h2>
          <p>Temukan pilihan perjalanan umrah dan jadwal keberangkatan dalam layanan terpisah yang lebih fokus dan mudah dipahami.</p>
          <div className="umrah-links"><a href="/umrah">Lihat paket umrah <span>↗</span></a><a href="/umrah#program">Pilihan program <span>→</span></a></div>
        </div>
      </section>

      <section className="journal section" id="tentang">
        <div className="section-head light-head"><div><span className="eyebrow"><i /> Dokumentasi perjalanan</span><h2>Perjalanan bersama Specta</h2></div><p>Dokumentasi perjalanan nyata bersama Specta—momen sederhana yang menjadi bagian dari cerita setiap peserta.</p></div>
        <div className="journal-grid">
          <div className="journal-photo one" role="img" aria-label="Rombongan Specta Travel di Ho Chi Minh City, Vietnam"><span>VIETNAM · HO CHI MINH CITY</span></div>
          <div className="journal-quote"><blockquote>“Setiap perjalanan menyimpan cerita. Kami membantu menyiapkan ruang untuk menjalaninya.”</blockquote><small>— SPECTA TOUR AND TRAVEL</small></div>
          <div className="journal-photo two" role="img" aria-label="Peserta Specta Travel saat perjalanan di Thailand"><span>THAILAND · OPEN TRIP</span></div>
          <div className="journal-photo three" role="img" aria-label="Dokumentasi perjalanan Specta Travel di Thailand"><span>TOUR 3 NEGARA · MOMENTS</span></div>
        </div>
      </section>

      <section className="closing section" id="kontak">
        <div className="closing-mark"><Image src="/specta-symbol-yellow.svg" alt="Specta" width={180} height={180} /></div>
        <span className="eyebrow light"><i /> Your next journey</span>
        <h2>Bicarakan rencana perjalanan Anda dengan admin Specta</h2>
        <p>Ceritakan rencana Anda kepada admin Specta. Kami akan membantu mengarahkan pilihan perjalanan yang sesuai.</p>
        <a className="button yellow" href={whatsappUrl} target="_blank" rel="noreferrer">Tanya admin via WhatsApp <span>↗</span></a>
      </section>
    </>
  );
}
