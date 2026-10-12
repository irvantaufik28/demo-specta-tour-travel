import { getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl } from "@/lib/cms/contact";
import SiteHeaderClient from "./site-header-client";

export default async function SiteHeader() {
  const settings = await getSiteSettings();
  const whatsappUrl = buildWhatsAppUrl(
    settings?.whatsapp,
    "Halo Specta, saya ingin bertanya tentang layanan perjalanan.",
  );

  return <SiteHeaderClient siteName={settings?.site_name ?? "Specta Tour and Travel"} whatsappUrl={whatsappUrl} />;
}
