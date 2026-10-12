import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [pagesResult, sectionsResult, mediaResult, packagesResult, departuresResult] = await Promise.all([
    supabase.from("pages").select("*", { count: "exact", head: true }),
    supabase.from("page_sections").select("*", { count: "exact", head: true }),
    supabase.from("media").select("*", { count: "exact", head: true }),
    supabase.from("travel_packages").select("*", { count: "exact", head: true }),
    supabase.from("package_departures").select("*", { count: "exact", head: true }),
  ]);

  return (
    <>
      <div className="admin-heading"><div><h1>Ringkasan</h1><p>Fondasi pengelolaan konten Specta Travel.</p></div></div>
      <section className="admin-grid" aria-label="Ringkasan konten">
        <article className="admin-card"><small>Halaman</small><strong>{pagesResult.count ?? 0}</strong><p>Halaman publik yang terdaftar di CMS.</p></article>
        <article className="admin-card"><small>Section konten</small><strong>{sectionsResult.count ?? 0}</strong><p>Bagian halaman yang siap dikelola.</p></article>
        <article className="admin-card"><small>Media</small><strong>{mediaResult.count ?? 0}</strong><p>Foto yang tercatat di pustaka media.</p></article>
        <article className="admin-card"><small>Paket perjalanan</small><strong>{packagesResult.count ?? 0}</strong><p>Paket domestik, mancanegara, dan Umrah.</p></article>
        <article className="admin-card"><small>Jadwal</small><strong>{departuresResult.count ?? 0}</strong><p>Keberangkatan yang tercatat di CMS.</p></article>
      </section>
    </>
  );
}
