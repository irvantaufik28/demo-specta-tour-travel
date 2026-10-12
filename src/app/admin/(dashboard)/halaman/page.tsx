import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPagesPage() {
  const supabase = await createClient();
  const { data: pages, error } = await supabase
    .from("pages")
    .select("id, name, slug, route_path, status, updated_at, page_sections(count)")
    .order("route_path");

  return (
    <>
      <div className="admin-heading">
        <div>
          <h1>Halaman website</h1>
          <p>Inventaris konten dan metadata SEO untuk setiap halaman publik.</p>
        </div>
      </div>

      <section className="admin-panel">
        {error ? (
          <div className="admin-empty">
            <strong>Data halaman belum dapat dibaca</strong>
            <p>{error.message}</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Halaman</th>
                  <th>Route</th>
                  <th>Section</th>
                  <th>Status</th>
                  <th aria-label="Aksi" />
                </tr>
              </thead>
              <tbody>
                {pages?.map((page) => (
                  <tr key={page.id}>
                    <td><strong>{page.name}</strong><small>{page.slug}</small></td>
                    <td><code>{page.route_path}</code></td>
                    <td>{page.page_sections[0]?.count ?? 0}</td>
                    <td><span className={`admin-status admin-status--${page.status}`}>{page.status}</span></td>
                    <td><div className="admin-table-actions"><Link href={`/admin/halaman/${page.slug}`}>Edit</Link><Link href={page.route_path} target="_blank">Lihat ↗</Link></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
