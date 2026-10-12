import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { updateSettings } from "./actions";

interface SettingsPageProps {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default function AdminSettingsPage({ searchParams }: SettingsPageProps) {
  return (
    <>
      <div className="admin-heading"><div><h1>Pengaturan</h1><p>Kontak, identitas website, dan metadata SEO default.</p></div></div>

      <Suspense fallback={<SettingsFallback />}>
        <SettingsForm searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function SettingsForm({ searchParams }: SettingsPageProps) {
  const feedback = await searchParams;
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <>
      {feedback.saved && <div className="admin-alert admin-alert--success">{feedback.saved}</div>}
      {feedback.error && <div className="admin-alert admin-alert--error">{feedback.error}</div>}

      <form action={updateSettings} className="admin-editor-form">
        <section className="admin-editor-card">
          <header><div><small>Identitas</small><h2>Informasi website</h2></div><p>Nama dan alamat utama yang digunakan oleh website.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field">Nama situs<input name="site_name" defaultValue={settings?.site_name ?? "Specta Tour and Travel"} maxLength={120} required /></label>
            <label className="admin-field">URL situs <span>Isi setelah domain produksi tersedia</span><input name="site_url" type="url" defaultValue={settings?.site_url ?? ""} placeholder="https://spectatravel.id" /></label>
          </div>
        </section>

        <section className="admin-editor-card">
          <header><div><small>Kontak publik</small><h2>Hubungi Specta</h2></div><p>Dipakai oleh navbar, footer, tombol WhatsApp, dan halaman kontak.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field">Nomor WhatsApp<input name="whatsapp" inputMode="tel" defaultValue={settings?.whatsapp ?? ""} placeholder="6282339593295" required /></label>
            <label className="admin-field">Instagram<input name="instagram" defaultValue={settings?.instagram ?? ""} placeholder="@spectatravel" /></label>
            <label className="admin-field admin-field--full">Email<input name="email" type="email" defaultValue={settings?.email ?? ""} required /></label>
            <label className="admin-field admin-field--full">Alamat<textarea name="address" defaultValue={settings?.address ?? ""} rows={3} maxLength={500} required /></label>
          </div>
        </section>

        <section className="admin-editor-card">
          <header><div><small>Fallback global</small><h2>SEO default</h2></div><p>Digunakan ketika sebuah halaman belum memiliki metadata khusus.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field admin-field--full">Default SEO title<input name="default_seo_title" defaultValue={settings?.default_seo_title ?? ""} maxLength={160} required /></label>
            <label className="admin-field admin-field--full">Default SEO description<textarea name="default_seo_description" defaultValue={settings?.default_seo_description ?? ""} rows={4} maxLength={500} required /></label>
            <label className="admin-field admin-field--full">Default OG image <span>Path atau URL</span><input name="default_og_image_path" defaultValue={settings?.default_og_image_path ?? ""} placeholder="/images/share.jpg" /></label>
          </div>
        </section>

        <div className="admin-editor-actions"><span>Kontak dan SEO default akan diperbarui secara global.</span><button type="submit">Simpan pengaturan</button></div>
      </form>
    </>
  );
}

function SettingsFallback() {
  return (
    <section className="admin-editor-card" aria-busy="true" aria-live="polite">
      <header>
        <div><small>Pengaturan</small><h2>Memuat informasi website…</h2></div>
        <p>Kontak dan metadata SEO sedang disiapkan.</p>
      </header>
    </section>
  );
}
