import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDepartureDate } from "@/lib/cms/departures";

const statuses: Record<string, string> = { scheduled: "Dijadwalkan", sold_out: "Penuh", cancelled: "Dibatalkan", completed: "Selesai" };
export default async function AdminSchedulesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("package_departures").select("*, travel_packages(title, destination)").order("departure_date");
  return <><div className="admin-heading"><div><h1>Jadwal keberangkatan</h1><p>Kelola tanggal, harga, dan kuota setiap paket.</p></div><Link className="admin-button" href="/admin/jadwal/tambah">Tambah jadwal</Link></div>
    <section className="admin-panel">{error ? <div className="admin-empty"><strong>Jadwal belum dapat dibaca</strong><p>{error.message}</p></div> : !data?.length ? <div className="admin-empty"><strong>Belum ada jadwal</strong><p>Tambahkan jadwal saat tanggal keberangkatan resmi sudah tersedia.</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Paket</th><th>Berangkat</th><th>Harga</th><th>Kuota</th><th>Status</th><th /></tr></thead><tbody>{data.map((item) => { const pkg = Array.isArray(item.travel_packages) ? item.travel_packages[0] : item.travel_packages; return <tr key={item.id}><td><strong>{pkg?.title ?? "Paket"}</strong><small>{item.label ?? pkg?.destination ?? "—"}</small></td><td>{formatDepartureDate(item.departure_date)}<small>{item.departure_city ?? "Kota belum diisi"}</small></td><td>{item.price_label ?? "—"}</td><td>{item.quota_remaining ?? "—"} / {item.quota_total ?? "—"}</td><td><span className={`admin-status admin-status--${item.status}`}>{statuses[item.status] ?? item.status}</span></td><td><Link href={`/admin/jadwal/${item.id}`}>Edit</Link></td></tr>; })}</tbody></table></div>}</section>
  </>;
}
