import Link from "next/link";
import { signOut } from "@/app/admin/actions";

const navigation = [
  ["Ringkasan", "/admin"],
  ["Halaman website", "/admin/halaman"],
  ["Paket perjalanan", "/admin/paket"],
  ["Jadwal", "/admin/jadwal"],
  ["Galeri", "/admin/galeri"],
  ["Pengaturan", "/admin/pengaturan"],
] as const;

export default function AdminShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span>S</span> Specta CMS</div>
        <nav className="admin-nav" aria-label="Navigasi admin">
          {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <small>Konten dikelola melalui dashboard internal Specta Travel.</small>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar"><b>Content Management</b><form action={signOut}><button className="admin-logout" type="submit">Keluar</button></form></header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
