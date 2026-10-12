const FALLBACK_PHONE = "6282339593295";
const FALLBACK_INSTAGRAM = "@spectatravel";

export function normalizeWhatsAppNumber(value?: string | null) {
  const digits = (value ?? "").replace(/\D/g, "");
  if (!digits) return FALLBACK_PHONE;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

export function buildWhatsAppUrl(value?: string | null, message?: string) {
  const phone = normalizeWhatsAppNumber(value);
  const text = message ?? "Halo Specta, saya ingin bertanya tentang perjalanan.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function formatPhone(value?: string | null) {
  const phone = normalizeWhatsAppNumber(value);
  if (!phone.startsWith("62")) return `+${phone}`;
  const local = phone.slice(2);
  const groups = local.length > 3
    ? [local.slice(0, 3), ...(local.slice(3).match(/.{1,4}/g) ?? [])].join(" ")
    : local;
  return `+62 ${groups}`;
}

export function instagramHandle(value?: string | null) {
  const input = (value ?? FALLBACK_INSTAGRAM).trim();
  if (input.startsWith("http://") || input.startsWith("https://")) {
    try {
      const segment = new URL(input).pathname.split("/").filter(Boolean)[0];
      return segment ? `@${segment.replace(/^@/, "")}` : FALLBACK_INSTAGRAM;
    } catch {
      return FALLBACK_INSTAGRAM;
    }
  }
  return `@${input.replace(/^@/, "")}`;
}

export function instagramUrl(value?: string | null) {
  const input = (value ?? FALLBACK_INSTAGRAM).trim();
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  return `https://www.instagram.com/${input.replace(/^@/, "")}/`;
}
