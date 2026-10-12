"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

function text(formData: FormData, name: string, maxLength: number) {
  return String(formData.get(name) ?? "").trim().slice(0, maxLength);
}

function optionalUrl(value: string, allowRelative = false) {
  if (!value) return null;
  if (allowRelative && value.startsWith("/")) return value;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function returnWith(slug: string, kind: "error" | "saved", message: string): never {
  const query = new URLSearchParams({ [kind]: message });
  redirect(`/admin/halaman/${slug}?${query.toString()}`);
}

export async function updatePage(formData: FormData) {
  const claims = await requireAdminSession();
  const userId = String(claims.sub);
  const slug = text(formData, "slug", 80);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    redirect("/admin/halaman");
  }

  const seoTitle = text(formData, "seo_title", 160);
  const seoDescription = text(formData, "seo_description", 500);
  const canonicalInput = text(formData, "canonical_url", 500);
  const ogTitle = text(formData, "og_title", 160);
  const ogDescription = text(formData, "og_description", 500);
  const ogImageInput = text(formData, "og_image_path", 500);
  const eyebrow = text(formData, "hero_eyebrow", 120);
  const heroTitle = text(formData, "hero_title", 220);
  const heroDescription = text(formData, "hero_description", 700);

  if (!seoTitle || !seoDescription || !eyebrow || !heroTitle || !heroDescription) {
    returnWith(slug, "error", "Judul, deskripsi SEO, dan seluruh teks hero wajib diisi.");
  }

  const canonicalUrl = optionalUrl(canonicalInput);
  const ogImagePath = optionalUrl(ogImageInput, true);
  if (canonicalInput && !canonicalUrl) {
    returnWith(slug, "error", "Canonical URL harus berupa alamat http atau https yang valid.");
  }
  if (ogImageInput && !ogImagePath) {
    returnWith(slug, "error", "OG image harus berupa path /gambar atau URL http/https yang valid.");
  }

  const keywords = text(formData, "seo_keywords", 800)
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 20);

  const supabase = await createClient();
  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("id, route_path")
    .eq("slug", slug)
    .single();

  if (pageError || !page) {
    returnWith(slug, "error", "Halaman tidak ditemukan atau tidak dapat dibaca.");
  }

  const { error: metadataError } = await supabase
    .from("pages")
    .update({
      seo_title: seoTitle,
      seo_description: seoDescription,
      seo_keywords: keywords,
      canonical_url: canonicalUrl,
      og_title: ogTitle || null,
      og_description: ogDescription || null,
      og_image_path: ogImagePath,
      robots_index: formData.get("robots_index") === "on",
      robots_follow: formData.get("robots_follow") === "on",
      updated_by: userId,
    })
    .eq("id", page.id);

  if (metadataError) {
    returnWith(slug, "error", "Metadata gagal disimpan. Silakan coba kembali.");
  }

  const heroContent: Json = { eyebrow, title: heroTitle, description: heroDescription };
  const { error: heroError } = await supabase.from("page_sections").upsert(
    {
      page_id: page.id,
      section_key: "hero",
      content: heroContent,
      sort_order: 10,
      is_visible: true,
      status: "published",
      updated_by: userId,
    },
    { onConflict: "page_id,section_key" },
  );

  if (heroError) {
    returnWith(slug, "error", "Metadata tersimpan, tetapi konten hero gagal diperbarui.");
  }

  revalidatePath(page.route_path);
  revalidatePath(`/admin/halaman/${slug}`);
  revalidatePath("/admin/halaman");
  returnWith(slug, "saved", "Perubahan berhasil disimpan dan diterapkan ke halaman publik.");
}
