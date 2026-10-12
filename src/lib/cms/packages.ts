import "server-only";

import { createClient } from "@supabase/supabase-js";
import { cacheLife } from "next/cache";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database, Json } from "@/types/database";

export type PackageKind = "domestic" | "international" | "umrah";
export type TravelPackageRow = Database["public"]["Tables"]["travel_packages"]["Row"];

function createPublicClient() {
  const { url, key } = getSupabaseConfig();
  return createClient<Database>(url, key, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });
}

export async function getPublishedTravelPackages(kind: PackageKind): Promise<TravelPackageRow[]> {
  "use cache";
  cacheLife("hours");

  try {
    const { data, error } = await createPublicClient()
      .from("travel_packages")
      .select("*")
      .eq("kind", kind)
      .eq("status", "published")
      .order("sort_order")
      .order("created_at");
    return error ? [] : data;
  } catch {
    return [];
  }
}

export function jsonStringArray(value: Json, fallback: string[] = []) {
  if (!Array.isArray(value)) return fallback;
  const items = value.filter((item): item is string => typeof item === "string");
  return items.length ? items : fallback;
}

export function jsonItinerary(value: Json, fallback: Array<{ day: string; text: string }> = []) {
  if (!Array.isArray(value)) return fallback;
  const items = value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const day = item.day;
    const text = item.text;
    return typeof day === "string" && typeof text === "string" ? [{ day, text }] : [];
  });
  return items.length ? items : fallback;
}

export function jsonBoolean(value: Json, key: string, fallback = false) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
  return typeof value[key] === "boolean" ? value[key] : fallback;
}

export function jsonText(value: Json, key: string, fallback = "") {
  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
  return typeof value[key] === "string" ? value[key] : fallback;
}
