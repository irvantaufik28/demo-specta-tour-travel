import type { Metadata } from "next";
import "./admin.css";
import "./admin-table.css";
import "./admin-editor.css";
import "./admin-gallery.css";
import "./auth.css";

export const metadata: Metadata = {
  title: "Admin — Specta Travel",
  robots: { index: false, follow: false },
};

export const instant = false;

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="admin-root">{children}</div>;
}
