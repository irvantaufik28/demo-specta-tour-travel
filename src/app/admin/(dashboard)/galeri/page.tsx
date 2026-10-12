import { createClient } from "@/lib/supabase/server";
import GalleryUploader from "./gallery-uploader";
import { updateMediaMetadata } from "./actions";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase.from("media").select("*").order("collection").order("sort_order").order("created_at", { ascending: false });
  const media = (items ?? []).map((item) => ({ ...item, url: supabase.storage.from(item.storage_bucket).getPublicUrl(item.storage_path).data.publicUrl }));
  return <>
    <div className="admin-heading"><div><h1>Galeri & media</h1><p>Upload gambar, tulis alt text, dan tempatkan gambar ke koleksi halaman.</p></div></div>
    <section className="admin-editor-card admin-upload-card"><header><div><small>Supabase Storage</small><h2>Upload gambar baru</h2></div><p>Gunakan koleksi Umrah agar foto otomatis tersedia untuk galeri halaman Umrah.</p></header><GalleryUploader /></section>
    <div className="admin-gallery-heading"><h2>Pustaka media</h2><span>{media.length} gambar</span></div>
    {error ? <section className="admin-panel"><div className="admin-empty"><strong>Media belum dapat dibaca</strong><p>{error.message}</p></div></section> : !media.length ? <section className="admin-panel"><div className="admin-empty"><strong>Belum ada gambar</strong><p>Upload gambar pertama melalui formulir di atas.</p></div></section> : <section className="admin-media-grid">{media.map((item) => <article className="admin-media-card" key={item.id}><img src={item.url} alt={item.alt_text || item.title || "Media Specta"} /><form action={updateMediaMetadata}><input type="hidden" name="id" value={item.id} /><label>Judul<input name="title" defaultValue={item.title ?? ""} /></label><label>Alt text<input name="alt_text" defaultValue={item.alt_text} /></label><div><label>Koleksi<input name="collection" defaultValue={item.collection} /></label><label>Urutan<input type="number" min="0" name="sort_order" defaultValue={item.sort_order} /></label></div><label className="admin-media-check"><input type="checkbox" name="is_public" defaultChecked={item.is_public} /> Tampil publik</label><button type="submit">Simpan metadata</button></form></article>)}</section>}
  </>;
}
