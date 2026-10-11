import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <Link className="site-footer__brand" href="/" aria-label="Specta Tour and Travel">
          <Image src="/specta-wordmark-transparent.png" alt="Specta Tour and Travel" width={360} height={90} />
        </Link>
        <p>Tour domestik, mancanegara, umrah, private trip, dan layanan perjalanan perusahaan dari Garut.</p>
        <a className="site-footer__action" href="https://wa.me/6280000000000" target="_blank" rel="noreferrer">Tanyakan perjalanan <span>↗</span></a>
      </div>

      <div className="site-footer__column">
        <h2>Perjalanan</h2>
        <Link href="/paket/domestik">Paket domestik</Link>
        <Link href="/paket/mancanegara">Paket mancanegara</Link>
        <Link href="/umrah">Program umrah</Link>
        <Link href="/group-corporate">Group &amp; Corporate</Link>
        <Link href="/layanan">Layanan perjalanan</Link>
      </div>

      <div className="site-footer__column">
        <h2>Informasi</h2>
        <Link href="/tentang">Tentang Specta</Link>
        <Link href="/#tentang">Galeri perjalanan</Link>
        <Link href="/kontak">Hubungi Specta</Link>
        <a href="#">Pertanyaan umum</a>
        <a href="#">Syarat dan ketentuan</a>
        <a href="#">Kebijakan privasi</a>
      </div>

      <div className="site-footer__column site-footer__contact">
        <h2>Hubungi kami</h2>
        <a href="tel:+6281200000000">0812 0000 0000</a>
        <a href="mailto:info@spectatravel.id">info@spectatravel.id</a>
        <p>Jl. Contoh Perjalanan No. 10<br />Garut, Jawa Barat 44100</p>
        <div className="site-footer__social"><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">YouTube</a></div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 Specta Tour and Travel</span>
        <span>Website demo · Informasi kontak dan alamat masih berupa data contoh.</span>
      </div>
    </footer>
  );
}
