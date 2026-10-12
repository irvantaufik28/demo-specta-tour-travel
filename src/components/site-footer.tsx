import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl, formatPhone, instagramHandle, instagramUrl, normalizeWhatsAppNumber } from "@/lib/cms/contact";

export default async function SiteFooter() {
  const settings = await getSiteSettings();
  const siteName = settings?.site_name ?? "Specta Tour and Travel";
  const phone = normalizeWhatsAppNumber(settings?.whatsapp);
  const whatsappUrl = buildWhatsAppUrl(settings?.whatsapp);
  const email = settings?.email ?? "info@spectatravel.id";
  const address = settings?.address ?? "Garut, Jawa Barat";
  const instagram = instagramHandle(settings?.instagram);

  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <Link className="site-footer__brand" href="/" aria-label={siteName}>
          <Image src="/specta-wordmark-transparent.png" alt={siteName} width={360} height={90} />
        </Link>
        <p>Tour domestik, mancanegara, umrah, private trip, dan layanan perjalanan perusahaan dari Garut.</p>
        <a className="site-footer__action" href={whatsappUrl} target="_blank" rel="noreferrer">Tanyakan perjalanan <span>↗</span></a>
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
        <a href={`tel:+${phone}`}>{formatPhone(phone)}</a>
        <a href={`mailto:${email}`}>{email}</a>
        <p>{address}</p>
        <div className="site-footer__social"><a href={instagramUrl(settings?.instagram)} target="_blank" rel="noreferrer">{instagram}</a></div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 {siteName}</span>
        <span>Informasi perjalanan dikonfirmasi langsung bersama admin Specta.</span>
      </div>
    </footer>
  );
}
