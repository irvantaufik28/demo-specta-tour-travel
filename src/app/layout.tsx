import type { Metadata, Viewport } from "next";
import FloatingContact from "@/components/floating-contact";
import "./globals.css";

export const metadata: Metadata = {
  title: "Specta Tour and Travel — Concept Website",
  description: "Konsep website presentasi untuk Specta Tour and Travel.",
  icons: {
    icon: "/specta-symbol-yellow.svg",
    shortcut: "/specta-symbol-yellow.svg",
    apple: "/specta-symbol-yellow.svg",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a3037",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
