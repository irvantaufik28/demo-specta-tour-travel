"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

export default function GalleryUploader() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function upload(formData: FormData) {
    const file = formData.get("file");
    if (!(file instanceof File) || !file.size) return setMessage("Pilih gambar terlebih dahulu.");
    if (!allowed.has(file.type)) return setMessage("Format harus JPG, PNG, WebP, atau GIF.");
    if (file.size > 8 * 1024 * 1024) return setMessage("Ukuran gambar maksimal 8 MB.");
    setBusy(true); setMessage("");
    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) { setBusy(false); return setMessage("Sesi login berakhir. Silakan login kembali."); }
    const collection = String(formData.get("collection") ?? "general").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-") || "general";
    const path = `${collection}/${Date.now()}-${crypto.randomUUID()}.${extensions[file.type]}`;
    const { error: uploadError } = await supabase.storage.from("cms-media").upload(path, file, { contentType: file.type, upsert: false });
    if (uploadError) { setBusy(false); return setMessage(`Upload gagal: ${uploadError.message}`); }
    const { error: insertError } = await supabase.from("media").insert({ storage_bucket: "cms-media", storage_path: path, title: String(formData.get("title") ?? "").trim() || null, alt_text: String(formData.get("alt_text") ?? "").trim(), mime_type: file.type, size_bytes: file.size, collection, created_by: auth.user.id });
    if (insertError) { await supabase.storage.from("cms-media").remove([path]); setBusy(false); return setMessage(`Metadata gagal disimpan: ${insertError.message}`); }
    formRef.current?.reset(); setBusy(false); setMessage("Gambar berhasil diunggah."); router.refresh();
  }
  return <form ref={formRef} action={upload} className="admin-upload-form">
    <div className="admin-upload-grid">
      <label className="admin-field">Gambar<input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/gif" required /></label>
      <label className="admin-field">Koleksi<select name="collection" defaultValue="general"><option value="general">Umum</option><option value="umrah">Umrah</option><option value="corporate">Group & Corporate</option><option value="about">Tentang</option></select></label>
      <label className="admin-field">Judul<input name="title" maxLength={180} /></label>
      <label className="admin-field">Alt text<input name="alt_text" maxLength={300} placeholder="Deskripsi gambar untuk aksesibilitas" /></label>
    </div>
    <div className="admin-upload-actions"><span>{message || "JPG, PNG, WebP, atau GIF · maksimal 8 MB"}</span><button type="submit" disabled={busy}>{busy ? "Mengunggah…" : "Upload gambar"}</button></div>
  </form>;
}
