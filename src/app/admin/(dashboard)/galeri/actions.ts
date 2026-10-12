"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { createClient } from "@/lib/supabase/server";

export async function updateMediaMetadata(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const collection = String(formData.get("collection") ?? "general").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").slice(0, 60) || "general";
  const title = String(formData.get("title") ?? "").trim().slice(0, 180) || null;
  const altText = String(formData.get("alt_text") ?? "").trim().slice(0, 300);
  const sortOrder = Math.max(0, Number.parseInt(String(formData.get("sort_order") ?? "0"), 10) || 0);
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("media").update({ collection, title, alt_text: altText, sort_order: sortOrder, is_public: formData.get("is_public") === "on" }).eq("id", id);
  revalidatePath("/admin/galeri");
  revalidatePath("/umrah");
}
