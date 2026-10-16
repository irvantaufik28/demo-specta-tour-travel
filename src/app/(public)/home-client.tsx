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

const departureCampaigns = [
  { id: "dufan-oct-2026", month: "2026-10", date: "2026-10-25", dateLabel: "25 Okt 2026", name: "Open Trip Dufan", category: "Domestik", duration: "1 hari", departureFrom: "Garut", seats: 4 },
  { id: "thailand-nov-2026", month: "2026-11", date: "2026-11-14", dateLabel: "14 Nov 2026", name: "Thailand Highlights", category: "Mancanegara", duration: "6H5M", departureFrom: "Bandung", seats: 10 },
  { id: "bali-nov-2026", month: "2026-11", date: "2026-11-28", dateLabel: "28 Nov 2026", name: "Bali & Nusa Penida", category: "Domestik", duration: "4H3M", departureFrom: "Garut", seats: 0 },
  { id: "singapore-dec-2026", month: "2026-12", date: "2026-12-12", dateLabel: "12 Des 2026", name: "Singapore City Escape", category: "Mancanegara", duration: "4H3M", departureFrom: "Bandung", seats: 8 },
  { id: "bromo-dec-2026", month: "2026-12", date: "2026-12-29", dateLabel: "29 Des 2026", name: "Bromo Year End", category: "Domestik", duration: "4H3M", departureFrom: "Garut", seats: 0 },
];

const departureMonths = [
  { value: "all", label: "Semua jadwal" },
  { value: "2026-10", label: "Oktober 2026" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "Desember 2026" },
];

const departureCategories = ["Semua", "Domestik", "Mancanegara"];

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
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const visibleDepartures = departureCampaigns.filter((campaign) => {
    const matchesMonth = selectedMonth === "all" || campaign.month === selectedMonth;
    const matchesCategory = selectedCategory === "Semua" || campaign.category === selectedCategory;
    return matchesMonth && matchesCategory;
  });

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

      <section className="departures section" id="jadwal">
        <div className="departure-heading">
          <div>
            <span className="eyebrow"><i /> Data contoh untuk presentasi</span>
            <h2>Jadwal keberangkatan terdekat</h2>
          </div>
          <p>Pilih bulan keberangkatan untuk melihat campaign open trip yang tersedia.</p>
        </div>

        <div className="departure-panel">
          <div className="departure-months" aria-label="Filter bulan keberangkatan">
            {departureMonths.map((month) => {
              const count = month.value === "all"
                ? departureCampaigns.length
                : departureCampaigns.filter((campaign) => campaign.month === month.value).length;
              return (
                <button
                  className={selectedMonth === month.value ? "active" : ""}
                  type="button"
                  aria-pressed={selectedMonth === month.value}
                  onClick={() => setSelectedMonth(month.value)}
                  key={month.value}
                >
                  <strong>{month.label}</strong>
                  <span>{count} jadwal</span>
                </button>
              );
            })}
          </div>

          <div className="departure-categories" aria-label="Filter kategori perjalanan">
            {departureCategories.map((category) => (
              <button
                className={selectedCategory === category ? "active" : ""}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="departure-legend">
            <div><span><i className="available" /> Tersedia, dapat ditanyakan</span><span><i className="full" /> Penuh, pilih jadwal lain</span></div>
            <strong>{visibleDepartures.length} keberangkatan ditampilkan</strong>
          </div>
        </div>

        <div className="departure-list" aria-live="polite">
          {visibleDepartures.map((campaign) => {
            const [day, month, year] = campaign.dateLabel.split(" ");
            return (
              <article className={`departure-row${campaign.seats === 0 ? " is-full" : ""}`} key={campaign.id}>
                <div className="departure-date">
                  <time dateTime={campaign.date}><strong>{day}</strong><span>{month}</span></time>
                  <small>{year}</small>
                </div>
                <div className="departure-trip">
                  <span className={`departure-category ${campaign.category.toLowerCase()}`}>{campaign.category}</span>
                  <h3>{campaign.name}</h3>
                  <p>{campaign.duration} · Berangkat dari {campaign.departureFrom}</p>
                </div>
                <div className="departure-availability">
                  <span className={`departure-seats${campaign.seats === 0 ? " full" : ""}`}>
                    {campaign.seats === 0 ? "Penuh" : `Tersisa ${campaign.seats} kursi`}
                  </span>
                  <small>{campaign.seats === 0 ? "Pilih keberangkatan lain" : "Konfirmasi kepada admin"}</small>
                </div>
                <div className="departure-action-cell">
                  {campaign.seats === 0 ? (
                    <span className="departure-action departure-action-full">Lihat jadwal lain <span aria-hidden="true">→</span></span>
                  ) : (
                    <span className="departure-action">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5.4 17.2 4 21l4.2-1.2A8.5 8.5 0 1 0 5.4 17.2Z" />
                        <path d="M8 10h8M8 14h5" />
                      </svg>
                      Tanya ketersediaan
                    </span>
                  )}
                </div>
              </article>
            );
          })}
          {visibleDepartures.length === 0 && <p className="departure-empty">Belum ada jadwal untuk filter ini.</p>}
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
