import "server-only";

import { createClient } from "@supabase/supabase-js";
import { cacheLife } from "next/cache";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/database";

export type PublicMedia = Database["public"]["Tables"]["media"]["Row"] & { url: string };

export async function getPublicMedia(collection: string, limit = 20): Promise<PublicMedia[]> {
  "use cache";
  cacheLife("hours");

  try {
    const { url, key } = getSupabaseConfig();
    const client = createClient<Database>(url, key, { auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false } });
    const { data, error } = await client.from("media").select("*").eq("collection", collection).eq("is_public", true).order("sort_order").order("created_at", { ascending: false }).limit(limit);
    if (error) return [];
    return data.map((item) => ({ ...item, url: client.storage.from(item.storage_bucket).getPublicUrl(item.storage_path).data.publicUrl }));
  } catch {
    return [];
  }
}
