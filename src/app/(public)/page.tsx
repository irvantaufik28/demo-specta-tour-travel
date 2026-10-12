import { getPageMetadata } from "@/lib/cms/metadata";
import { getHeroContent, getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl } from "@/lib/cms/contact";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HomePageClient from "./home-client";

const fallbackMetadata = {
  title: "Specta Tour and Travel | Wisata, Umrah & Corporate Travel",
  description:
    "Rencanakan perjalanan domestik, mancanegara, umrah, private trip, dan perjalanan perusahaan bersama Specta Tour and Travel dari Garut.",
};

export function generateMetadata() {
  return getPageMetadata("home", fallbackMetadata);
}

const fallbackHero = {
  eyebrow: "Tour designer dari Garut",
  title: "Perjalanan domestik dan internasional dari Garut.",
  description: "Jelajahi dunia melalui perjalanan yang disiapkan lebih personal—dari wisata mancanegara, private trip, hingga perjalanan perusahaan.",
};

export default async function HomePage() {
  const [hero, settings] = await Promise.all([getHeroContent("home", fallbackHero), getSiteSettings()]);
  const whatsappUrl = buildWhatsAppUrl(settings?.whatsapp, "Halo Specta, saya ingin bertanya tentang layanan perjalanan.");
  return <main><div className="demo-note">Concept website · presentation only</div><SiteHeader /><HomePageClient hero={hero} whatsappUrl={whatsappUrl} /><SiteFooter /></main>;
}
