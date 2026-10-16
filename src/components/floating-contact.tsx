import { getSiteSettings } from "@/lib/cms/content";
import { buildWhatsAppUrl, instagramUrl } from "@/lib/cms/contact";

export default async function FloatingContact() {
  const settings = await getSiteSettings();
  const instagram = instagramUrl(settings?.instagram);
  const whatsapp = buildWhatsAppUrl(settings?.whatsapp);
  return (
    <aside className="floating-contact" aria-label="Kontak cepat">
      <a
        className="floating-contact__button floating-contact__instagram"
        href={instagram}
        target="_blank"
        rel="noreferrer"
        aria-label="Buka Instagram Specta Travel"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>

      <a
        className="floating-contact__button floating-contact__whatsapp"
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi Specta Travel melalui WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.17 6.45 6.59 2 12.04 2c2.64 0 5.09 1.03 6.95 2.89a9.8 9.8 0 0 1 2.88 6.96c0 5.45-4.43 9.88-9.87 9.88m8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.25-6.16-3.53-8.47" />
        </svg>
      </a>
    </aside>
  );
}
