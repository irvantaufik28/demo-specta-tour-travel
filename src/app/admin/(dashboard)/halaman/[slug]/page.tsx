import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { HeroContent } from "@/lib/cms/content";
import { updatePage } from "./actions";

interface EditorPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function PageEditor({ params, searchParams }: EditorPageProps) {
  const { slug } = await params;
  const feedback = await searchParams;
  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("*").eq("slug", slug).maybeSingle();

  if (!page) notFound();

  const { data: heroSection } = await supabase
    .from("page_sections")
    .select("content")
    .eq("page_id", page.id)
    .eq("section_key", "hero")
    .maybeSingle();

  const hero = (heroSection?.content ?? {}) as Partial<HeroContent>;

  return (
    <>
      <div className="admin-heading admin-editor-heading">
        <div>
          <Link className="admin-back" href="/admin/halaman">← Kembali ke halaman</Link>
          <h1>{page.name}</h1>
          <p>Edit teks hero dan metadata SEO untuk <code>{page.route_path}</code>.</p>
        </div>
        <Link className="admin-button admin-button--secondary" href={page.route_path} target="_blank">Lihat halaman ↗</Link>
      </div>

      {feedback.saved && <div className="admin-alert admin-alert--success">{feedback.saved}</div>}
      {feedback.error && <div className="admin-alert admin-alert--error">{feedback.error}</div>}

      <form action={updatePage} className="admin-editor-form">
        <input type="hidden" name="slug" value={page.slug} />

        <section className="admin-editor-card">
          <header><div><small>Konten halaman</small><h2>Hero</h2></div><p>Teks utama yang pertama kali dilihat pengunjung.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field admin-field--full">Eyebrow<input name="hero_eyebrow" defaultValue={hero.eyebrow ?? ""} maxLength={120} required /></label>
            <label className="admin-field admin-field--full">Judul utama<textarea name="hero_title" defaultValue={hero.title ?? ""} maxLength={220} rows={3} required /></label>
            <label className="admin-field admin-field--full">Deskripsi<textarea name="hero_description" defaultValue={hero.description ?? ""} maxLength={700} rows={4} required /></label>
          </div>
        </section>

        <section className="admin-editor-card">
          <header><div><small>Mesin pencari</small><h2>Metadata SEO</h2></div><p>Digunakan untuk judul browser, Google, dan preview saat tautan dibagikan.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field admin-field--full">SEO title<input name="seo_title" defaultValue={page.seo_title ?? ""} maxLength={160} required /></label>
            <label className="admin-field admin-field--full">SEO description<textarea name="seo_description" defaultValue={page.seo_description ?? ""} maxLength={500} rows={4} required /></label>
            <label className="admin-field admin-field--full">Keywords <span>Pisahkan dengan koma</span><input name="seo_keywords" defaultValue={page.seo_keywords.join(", ")} maxLength={800} /></label>
            <label className="admin-field admin-field--full">Canonical URL <span>Opsional</span><input name="canonical_url" type="url" defaultValue={page.canonical_url ?? ""} placeholder="https://spectatravel.id/..." /></label>
          </div>
        </section>

        <section className="admin-editor-card">
          <header><div><small>Social sharing</small><h2>Open Graph</h2></div><p>Preview halaman ketika dibagikan melalui WhatsApp dan media sosial.</p></header>
          <div className="admin-form-grid">
            <label className="admin-field">OG title<input name="og_title" defaultValue={page.og_title ?? ""} maxLength={160} /></label>
            <label className="admin-field">OG image <span>Path atau URL</span><input name="og_image_path" defaultValue={page.og_image_path ?? ""} placeholder="/images/share.jpg" /></label>
            <label className="admin-field admin-field--full">OG description<textarea name="og_description" defaultValue={page.og_description ?? ""} maxLength={500} rows={3} /></label>
            <div className="admin-checks admin-field--full">
              <label><input type="checkbox" name="robots_index" defaultChecked={page.robots_index} /> Izinkan halaman diindeks</label>
              <label><input type="checkbox" name="robots_follow" defaultChecked={page.robots_follow} /> Izinkan mesin pencari mengikuti link</label>
            </div>
          </div>
        </section>

        <div className="admin-editor-actions"><span>Perubahan akan langsung dibaca oleh halaman publik.</span><button type="submit">Simpan perubahan</button></div>
      </form>
    </>
  );
}
