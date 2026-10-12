import Link from "next/link";
import { saveDeparture } from "./actions";
import type { DepartureRow } from "@/lib/cms/departures";

interface Props {
  item?: DepartureRow | null;
  packages: Array<{ id: string; title: string; kind: string }>;
  feedback: { saved?: string; error?: string };
}
const labels: Record<string, string> = { domestic: "Domestik", international: "Mancanegara", umrah: "Umrah" };

export default function ScheduleForm({ item, packages, feedback }: Props) {
  return <>
    <div className="admin-heading admin-editor-heading"><div><Link className="admin-back" href="/admin/jadwal">← Kembali ke jadwal</Link><h1>{item ? "Edit jadwal" : "Tambah jadwal"}</h1><p>Hubungkan tanggal keberangkatan dengan paket yang sudah tersedia.</p></div></div>
    {feedback.saved && <div className="admin-alert admin-alert--success">{feedback.saved}</div>}
    {feedback.error && <div className="admin-alert admin-alert--error">{feedback.error}</div>}
    <form action={saveDeparture} className="admin-editor-form">
      {item && <input type="hidden" name="id" value={item.id} />}
      <section className="admin-editor-card"><header><div><small>Keberangkatan</small><h2>Detail jadwal</h2></div><p>Jadwal publik akan tampil pada katalog paket terkait.</p></header>
        <div className="admin-form-grid">
          <label className="admin-field admin-field--full">Paket<select name="package_id" defaultValue={item?.package_id ?? ""} required><option value="" disabled>Pilih paket</option>{packages.map((pkg) => <option key={pkg.id} value={pkg.id}>{labels[pkg.kind] ?? pkg.kind} · {pkg.title}</option>)}</select></label>
          <label className="admin-field">Label jadwal<input name="label" defaultValue={item?.label ?? ""} placeholder="Batch 01 / Libur sekolah" /></label>
          <label className="admin-field">Status<select name="status" defaultValue={item?.status ?? "scheduled"}><option value="scheduled">Dijadwalkan</option><option value="sold_out">Kuota penuh</option><option value="cancelled">Dibatalkan</option><option value="completed">Selesai</option></select></label>
          <label className="admin-field">Tanggal berangkat<input type="date" name="departure_date" defaultValue={item?.departure_date ?? ""} required /></label>
          <label className="admin-field">Tanggal pulang<input type="date" name="return_date" defaultValue={item?.return_date ?? ""} /></label>
          <label className="admin-field">Kota keberangkatan<input name="departure_city" defaultValue={item?.departure_city ?? ""} /></label>
          <label className="admin-field">Harga <span>Angka tanpa Rp atau titik</span><input inputMode="numeric" name="price" defaultValue={item?.price ?? ""} /></label>
          <label className="admin-field admin-field--full">Label harga<input name="price_label" defaultValue={item?.price_label ?? ""} placeholder="Rp1.250.000/pax" /></label>
          <label className="admin-field">Kuota total<input type="number" min="0" name="quota_total" defaultValue={item?.quota_total ?? ""} /></label>
          <label className="admin-field">Sisa kuota<input type="number" min="0" name="quota_remaining" defaultValue={item?.quota_remaining ?? ""} /></label>
          <label className="admin-field admin-field--full">Catatan<textarea name="notes" rows={4} defaultValue={item?.notes ?? ""} /></label>
          <div className="admin-checks admin-field--full"><label><input type="checkbox" name="is_public" defaultChecked={item?.is_public ?? true} /> Tampilkan jadwal di website</label></div>
        </div>
      </section>
      <div className="admin-editor-actions"><span>Pastikan harga dan kuota sudah dikonfirmasi sebelum dipublikasikan.</span><button type="submit">{item ? "Simpan jadwal" : "Buat jadwal"}</button></div>
    </form>
  </>;
}
