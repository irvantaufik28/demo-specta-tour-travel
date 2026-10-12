"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SiteHeaderClientProps {
  siteName: string;
  whatsappUrl: string;
}

export default function SiteHeaderClient({ siteName, whatsappUrl }: SiteHeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav">
      <Link className="brand" href="/#home" aria-label={siteName} onClick={closeMenu}>
        <Image src="/specta-navbar-logo.png" alt={siteName} width={420} height={140} priority />
      </Link>
      <button className="menu-button" type="button" aria-label="Buka menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      <nav className={menuOpen ? "open" : ""} aria-label="Navigasi utama">
        <Link href="/#home" onClick={closeMenu}>Beranda</Link>
        <details className="nav-dropdown">
          <summary>Paket Wisata <span>⌄</span></summary>
          <div className="nav-submenu">
            <Link href="/paket/domestik" onClick={closeMenu}>Domestik</Link>
            <Link href="/paket/mancanegara" onClick={closeMenu}>Mancanegara</Link>
          </div>
        </details>
        <Link href="/umrah" onClick={closeMenu}>Umrah</Link>
        <Link href="/group-corporate" onClick={closeMenu}>Group &amp; Corporate</Link>
        <Link href="/layanan" onClick={closeMenu}>Layanan</Link>
        <Link href="/tentang" onClick={closeMenu}>Tentang</Link>
        <Link href="/kontak" onClick={closeMenu}>Kontak</Link>
      </nav>
      <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Tanya Admin <span>↗</span></a>
    </header>
  );
}
