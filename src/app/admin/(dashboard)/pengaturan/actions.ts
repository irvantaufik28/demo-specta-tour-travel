"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { normalizeWhatsAppNumber } from "@/lib/cms/contact";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, name: string, maxLength: number) {
  return String(formData.get(name) ?? "").trim().slice(0, maxLength);
}

function absoluteUrl(value: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function imagePath(value: string) {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  return absoluteUrl(value);
}

function finish(kind: "saved" | "error", message: string): never {
  redirect(`/admin/pengaturan?${new URLSearchParams({ [kind]: message }).toString()}`);
}

export async function updateSettings(formData: FormData) {
  const claims = await requireAdminSession();
  const siteName = text(formData, "site_name", 120);
  const siteUrlInput = text(formData, "site_url", 500);
  const defaultTitle = text(formData, "default_seo_title", 160);
  const defaultDescription = text(formData, "default_seo_description", 500);
  const defaultOgInput = text(formData, "default_og_image_path", 500);
  const whatsappInput = text(formData, "whatsapp", 40);
  const instagram = text(formData, "instagram", 300);
  const email = text(formData, "email", 254);
  const address = text(formData, "address", 500);

  if (!siteName || !defaultTitle || !defaultDescription || !whatsappInput || !email || !address) {
    finish("error", "Nama situs, SEO default, WhatsApp, email, dan alamat wajib diisi.");
  }

  const siteUrl = absoluteUrl(siteUrlInput);
  const defaultOgImagePath = imagePath(defaultOgInput);
  const whatsapp = normalizeWhatsAppNumber(whatsappInput);

  if (siteUrlInput && !siteUrl) finish("error", "URL situs harus menggunakan http atau https.");
  if (defaultOgInput && !defaultOgImagePath) finish("error", "OG image harus berupa path /gambar atau URL http/https.");
  if (whatsapp.length < 9) finish("error", "Nomor WhatsApp belum valid.");
  if (!/^\S+@\S+\.\S+$/.test(email)) finish("error", "Alamat email belum valid.");

  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    site_name: siteName,
    site_url: siteUrl,
    default_seo_title: defaultTitle,
    default_seo_description: defaultDescription,
    default_og_image_path: defaultOgImagePath,
    whatsapp,
    instagram: instagram || null,
    email,
    address,
    updated_by: String(claims.sub),
  });

  if (error) finish("error", "Pengaturan gagal disimpan. Silakan coba kembali.");

  revalidatePath("/", "layout");
  revalidatePath("/admin/pengaturan");
  finish("saved", "Pengaturan global berhasil diterapkan ke seluruh website.");
}
