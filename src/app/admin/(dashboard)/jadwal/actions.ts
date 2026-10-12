"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { createClient } from "@/lib/supabase/server";

const statuses = ["scheduled", "sold_out", "cancelled", "completed"] as const;
const value = (data: FormData, name: string, max = 500) => String(data.get(name) ?? "").trim().slice(0, max);
const integer = (data: FormData, name: string) => { const raw = value(data, name, 30).replace(/[^0-9]/g, ""); return raw ? Number(raw) : null; };
function finish(path: string, key: "saved" | "error", message: string): never { redirect(`${path}?${new URLSearchParams({ [key]: message })}`); }

export async function saveDeparture(formData: FormData) {
  const claims = await requireAdminSession();
  const id = value(formData, "id", 50);
  const target = id ? `/admin/jadwal/${id}` : "/admin/jadwal/tambah";
  const packageId = value(formData, "package_id", 50);
  const departureDate = value(formData, "departure_date", 20);
  const returnDate = value(formData, "return_date", 20) || null;
  const statusInput = value(formData, "status", 30);
  const status = statuses.find((item) => item === statusInput);
  const quotaTotal = integer(formData, "quota_total");
  const quotaRemaining = integer(formData, "quota_remaining");
  if (!packageId || !departureDate || !status) finish(target, "error", "Paket, tanggal keberangkatan, dan status wajib diisi.");
  if (returnDate && returnDate < departureDate) finish(target, "error", "Tanggal pulang tidak boleh lebih awal dari keberangkatan.");
  if (quotaTotal !== null && quotaRemaining !== null && quotaRemaining > quotaTotal) finish(target, "error", "Sisa kuota tidak boleh melebihi kuota total.");

  const supabase = await createClient();
  const payload = {
    package_id: packageId,
    label: value(formData, "label", 120) || null,
    departure_date: departureDate,
    return_date: returnDate,
    departure_city: value(formData, "departure_city", 120) || null,
    price: integer(formData, "price"),
    price_label: value(formData, "price_label", 160) || null,
    quota_total: quotaTotal,
    quota_remaining: quotaRemaining,
    status,
    is_public: formData.get("is_public") === "on",
    notes: value(formData, "notes", 1500) || null,
    updated_by: String(claims.sub),
  };
  if (id) {
    const { error } = await supabase.from("package_departures").update(payload).eq("id", id);
    if (error) finish(target, "error", "Jadwal gagal disimpan.");
  } else {
    const { data, error } = await supabase.from("package_departures").insert({ ...payload, created_by: String(claims.sub) }).select("id").single();
    if (error || !data) finish(target, "error", "Jadwal gagal dibuat.");
    revalidatePath("/admin/jadwal");
    revalidatePath("/paket/domestik"); revalidatePath("/paket/mancanegara"); revalidatePath("/umrah");
    finish(`/admin/jadwal/${data.id}`, "saved", "Jadwal berhasil dibuat.");
  }
  revalidatePath("/admin/jadwal");
  revalidatePath("/paket/domestik"); revalidatePath("/paket/mancanegara"); revalidatePath("/umrah");
  finish(target, "saved", "Perubahan jadwal berhasil disimpan.");
}
