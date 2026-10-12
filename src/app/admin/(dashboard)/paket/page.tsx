import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const labels: Record<string, string> = { domestic: "Domestik", international: "Mancanegara", umrah: "Umrah" };

export default async function AdminPackagesPage() {
  const supabase = await createClient();
  const { data: packages, error } = await supabase.from("travel_packages").select("id, kind, title, destination, status, price_label, updated_at").order("kind").order("sort_order");
  return (
    <>
      <div className="admin-heading"><div><h1>Paket perjalanan</h1><p>Kelola paket domestik, mancanegara, dan Umrah dari satu tempat.</p></div><Link className="admin-button" href="/admin/paket/tambah">Tambah paket</Link></div>
      <section className="admin-panel">
        {error ? <div className="admin-empty"><strong>Data paket belum dapat dibaca</strong><p>{error.message}</p></div> : (
          <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Paket</th><th>Kategori</th><th>Harga</th><th>Status</th><th aria-label="Aksi" /></tr></thead><tbody>
            {packages?.map((item) => <tr key={item.id}><td><strong>{item.title}</strong><small>{item.destination}</small></td><td>{labels[item.kind]}</td><td>{item.price_label ?? "—"}</td><td><span className={`admin-status admin-status--${item.status}`}>{item.status}</span></td><td><div className="admin-table-actions"><Link href={`/admin/paket/${item.id}`}>Edit</Link></div></td></tr>)}
          </tbody></table></div>
        )}
      </section>
    </>
  );
}
