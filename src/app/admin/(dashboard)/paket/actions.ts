"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

const kinds = ["domestic", "international", "umrah"] as const;
const statuses = ["draft", "published", "archived"] as const;

function text(formData: FormData, name: string, maxLength: number) {
  return String(formData.get(name) ?? "").trim().slice(0, maxLength);
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
}

function lines(value: string): Json {
  return value.split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 60);
}

function itinerary(value: string): Json {
  return value.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 40).map((line) => {
    const [day, ...description] = line.split("|");
    return { day: day.trim(), text: description.join("|").trim() };
  }).filter((item) => item.day && item.text);
}

function imagePath(value: string) {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function finish(target: string, kind: "saved" | "error", message: string): never {
  redirect(`${target}?${new URLSearchParams({ [kind]: message }).toString()}`);
}

function publicPath(kind: string) {
  return kind === "domestic" ? "/paket/domestik" : kind === "international" ? "/paket/mancanegara" : "/umrah";
}

export async function savePackage(formData: FormData) {
  const claims = await requireAdminSession();
  const id = text(formData, "id", 50);
  const kindInput = text(formData, "kind", 30);
  const statusInput = text(formData, "status", 30);
  const kind = kinds.find((value) => value === kindInput);
  const status = statuses.find((value) => value === statusInput);
  const title = text(formData, "title", 180);
  const slug = slugify(text(formData, "slug", 120) || title);
  const destination = text(formData, "destination", 160);
  const summary = text(formData, "summary", 1200);
  const coverInput = text(formData, "cover_image_path", 700);
  const coverImagePath = imagePath(coverInput);
  const priceInput = text(formData, "starting_price", 30).replace(/[^0-9]/g, "");
  const startingPrice = priceInput ? Number(priceInput) : null;
  const target = id ? `/admin/paket/${id}` : "/admin/paket/tambah";

  if (!kind || !status || !title || !slug || !destination || !summary) {
    finish(target, "error", "Kategori, status, judul, slug, destinasi, dan ringkasan wajib diisi.");
  }
  if (coverInput && !coverImagePath) finish(target, "error", "Gambar harus berupa path /gambar atau URL http/https.");
  if (startingPrice !== null && (!Number.isSafeInteger(startingPrice) || startingPrice < 0)) finish(target, "error", "Harga mulai belum valid.");

  const supabase = await createClient();
  const existing = id
    ? await supabase.from("travel_packages").select("extra, kind, published_at").eq("id", id).maybeSingle()
    : { data: null, error: null };
  if (existing.error) finish(target, "error", "Paket tidak ditemukan.");

  const values = {
    kind,
    slug,
    title,
    destination,
    summary,
    trip_type: text(formData, "trip_type", 120) || null,
    duration: text(formData, "duration", 100) || null,
    origin: text(formData, "origin", 120) || null,
    starting_price: startingPrice,
    price_label: text(formData, "price_label", 160) || null,
    cover_image_path: coverImagePath,
    featured: formData.get("featured") === "on",
    status,
    sort_order: Math.max(0, Number.parseInt(text(formData, "sort_order", 8), 10) || 0),
    included: lines(text(formData, "included", 8000)),
    excluded: lines(text(formData, "excluded", 8000)),
    highlights: lines(text(formData, "highlights", 8000)),
    price_options: lines(text(formData, "price_options", 5000)),
    itinerary: itinerary(text(formData, "itinerary", 12000)),
    extra: existing.data?.extra ?? {},
    published_at: status === "published" ? (existing.data?.published_at ?? new Date().toISOString()) : null,
    updated_by: String(claims.sub),
  };

  if (id) {
    const { error } = await supabase.from("travel_packages").update(values).eq("id", id);
    if (error) finish(target, "error", error.code === "23505" ? "Slug sudah digunakan paket lain." : "Paket gagal disimpan.");
  } else {
    const { data, error } = await supabase.from("travel_packages").insert({ ...values, created_by: String(claims.sub) }).select("id").single();
    if (error || !data) finish(target, "error", error?.code === "23505" ? "Slug sudah digunakan paket lain." : "Paket gagal dibuat.");
    revalidatePath("/admin/paket");
    revalidatePath(publicPath(kind));
    finish(`/admin/paket/${data.id}`, "saved", "Paket berhasil dibuat.");
  }

  revalidatePath("/admin/paket");
  revalidatePath(publicPath(kind));
  if (existing.data?.kind && existing.data.kind !== kind) revalidatePath(publicPath(existing.data.kind));
  finish(target, "saved", "Perubahan paket berhasil disimpan.");
}
