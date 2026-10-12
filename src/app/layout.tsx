import type { Metadata, Viewport } from "next";
import { getSiteSettings } from "@/lib/cms/content";
import "./globals.css";

function getMetadataBase(value?: string | null) {
  if (!value) return undefined;
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.default_seo_title ?? "Specta Tour and Travel";
  const description = settings?.default_seo_description ?? "Perjalanan wisata, umrah, dan kebutuhan kelompok bersama Specta Tour and Travel.";

  return {
    metadataBase: getMetadataBase(settings?.site_url),
    title,
    description,
    openGraph: {
      title,
      description,
      images: settings?.default_og_image_path ? [{ url: settings.default_og_image_path }] : undefined,
      type: "website",
    },
    icons: {
      icon: "/specta-symbol-yellow.svg",
      shortcut: "/specta-symbol-yellow.svg",
      apple: "/specta-symbol-yellow.svg",
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a3037",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
