const instagramUrl = "https://www.instagram.com/spectatravel/";
const whatsappUrl =
  "https://wa.me/6282339593295?text=Halo%20Specta%2C%20saya%20ingin%20bertanya%20tentang%20perjalanan.";

export default function FloatingContact() {
  return (
    <aside className="floating-contact" aria-label="Kontak cepat">
      <a
        className="floating-contact__button floating-contact__instagram"
        href={instagramUrl}
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
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi Specta Travel melalui WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4l-4.6 1.4 1.4-4.4a8.4 8.4 0 1 1 15.6-4.4Z" />
          <path d="M8.2 7.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.9 2.1c.1.2.1.4-.1.6l-.7.9c-.1.2-.2.3 0 .5.7 1.2 1.7 2.2 3 2.8.2.1.4.1.6-.1l1-.9c.2-.2.4-.2.6-.1l2 .9c.2.1.4.3.4.5 0 .5-.2 1.5-.7 2-.5.5-1.4.8-2.3.8-1 0-2.3-.4-4-1.3-2.5-1.4-4.1-3.9-4.2-4.1-.1-.2-1-1.3-1-2.6 0-1.3.6-2 1-2.3Z" />
        </svg>
      </a>
    </aside>
  );
}
