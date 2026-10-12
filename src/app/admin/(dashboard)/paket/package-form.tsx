import Link from "next/link";
import { savePackage } from "./actions";
import type { TravelPackageRow } from "@/lib/cms/packages";

function stringLines(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").join("\n") : "";
}

function itineraryLines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const day = item.day;
    const text = item.text;
    return typeof day === "string" && typeof text === "string" ? [`${day} | ${text}`] : [];
  }).join("\n");
}

interface PackageFormProps {
  item?: TravelPackageRow | null;
  feedback: { saved?: string; error?: string };
}

export default function PackageForm({ item, feedback }: PackageFormProps) {
  const editing = Boolean(item);
  return (
    <>
      <div className="admin-heading admin-editor-heading">
        <div><Link className="admin-back" href="/admin/paket">← Kembali ke paket</Link><h1>{editing ? item?.title : "Tambah paket"}</h1><p>{editing ? "Perbarui informasi paket dan publikasinya." : "Buat paket domestik, mancanegara, atau Umrah baru."}</p></div>
      </div>
      {feedback.saved && <div className="admin-alert admin-alert--success">{feedback.saved}</div>}
      {feedback.error && <div className="admin-alert admin-alert--error">{feedback.error}</div>}

      <form action={savePackage} className="admin-editor-form">
        {item && <input type="hidden" name="id" value={item.id} />}
        <section className="admin-editor-card">
          <header><div><small>Informasi utama</small><h2>Identitas paket</h2></div><p>Data utama yang tampil pada kartu dan katalog perjalanan.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field">Kategori<select name="kind" defaultValue={item?.kind ?? "domestic"}><option value="domestic">Domestik</option><option value="international">Mancanegara</option><option value="umrah">Umrah</option></select></label>
            <label className="admin-field">Status<select name="status" defaultValue={item?.status ?? "draft"}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
            <label className="admin-field admin-field--full">Judul paket<input name="title" defaultValue={item?.title ?? ""} maxLength={180} required /></label>
            <label className="admin-field">Slug<input name="slug" defaultValue={item?.slug ?? ""} placeholder="otomatis-dari-judul" /></label>
            <label className="admin-field">Destinasi<input name="destination" defaultValue={item?.destination ?? ""} required /></label>
            <label className="admin-field">Jenis perjalanan<input name="trip_type" defaultValue={item?.trip_type ?? ""} placeholder="Open Trip / Umrah Plus" /></label>
            <label className="admin-field">Durasi<input name="duration" defaultValue={item?.duration ?? ""} placeholder="4H3M" /></label>
            <label className="admin-field">Kota keberangkatan<input name="origin" defaultValue={item?.origin ?? ""} /></label>
            <label className="admin-field">Urutan<input name="sort_order" type="number" min="0" defaultValue={item?.sort_order ?? 0} /></label>
            <label className="admin-field admin-field--full">Ringkasan<textarea name="summary" defaultValue={item?.summary ?? ""} rows={4} required /></label>
            <label className="admin-field admin-field--full">Gambar cover <span>Path /gambar atau URL</span><input name="cover_image_path" defaultValue={item?.cover_image_path ?? ""} /></label>
            <div className="admin-checks admin-field--full"><label><input type="checkbox" name="featured" defaultChecked={item?.featured ?? false} /> Tampilkan sebagai paket unggulan</label></div>
          </div>
        </section>

        <section className="admin-editor-card">
          <header><div><small>Harga</small><h2>Informasi biaya</h2></div><p>Harga numerik dipakai untuk pengurutan; label dipakai untuk tampilan.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field">Harga mulai <span>Angka tanpa Rp atau titik</span><input name="starting_price" inputMode="numeric" defaultValue={item?.starting_price ?? ""} /></label>
            <label className="admin-field">Label harga<input name="price_label" defaultValue={item?.price_label ?? ""} placeholder="Mulai dari Rp885.000/pax" /></label>
            <label className="admin-field admin-field--full">Pilihan harga <span>Satu pilihan per baris</span><textarea name="price_options" defaultValue={stringLines(item?.price_options)} rows={4} /></label>
          </div>
        </section>

        <section className="admin-editor-card">
          <header><div><small>Rincian</small><h2>Fasilitas & itinerary</h2></div><p>Gunakan satu fasilitas per baris. Itinerary memakai format “Hari | Deskripsi”.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field">Termasuk<textarea name="included" defaultValue={stringLines(item?.included)} rows={8} /></label>
            <label className="admin-field">Belum termasuk<textarea name="excluded" defaultValue={stringLines(item?.excluded)} rows={8} /></label>
            <label className="admin-field admin-field--full">Highlight<textarea name="highlights" defaultValue={stringLines(item?.highlights)} rows={5} /></label>
            <label className="admin-field admin-field--full">Itinerary<textarea name="itinerary" defaultValue={itineraryLines(item?.itinerary)} rows={8} placeholder="Hari 1 | Berangkat dari meeting point" /></label>
          </div>
        </section>
        <div className="admin-editor-actions"><span>{editing ? "Perubahan paket akan diterapkan sesuai status publikasi." : "Paket baru dapat disimpan sebagai draft."}</span><button type="submit">{editing ? "Simpan paket" : "Buat paket"}</button></div>
      </form>
    </>
  );
}
