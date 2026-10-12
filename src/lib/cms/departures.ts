import "server-only";

import { createClient } from "@supabase/supabase-js";
import { cacheLife } from "next/cache";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/database";
import type { PackageKind } from "@/lib/cms/packages";

export type DepartureRow = Database["public"]["Tables"]["package_departures"]["Row"];
export type PublicDeparture = DepartureRow & {
  travel_packages: { id: string; slug: string; title: string; kind: string };
};

function publicClient() {
  const { url, key } = getSupabaseConfig();
  return createClient<Database>(url, key, { auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false } });
}

export async function getUpcomingDepartures(kind?: PackageKind): Promise<PublicDeparture[]> {
  "use cache";
  cacheLife("hours");

  try {
    let query = publicClient()
      .from("package_departures")
      .select("*, travel_packages!inner(id, slug, title, kind)")
      .eq("is_public", true)
      .in("status", ["scheduled", "sold_out"])
      .order("departure_date");
    if (kind) query = query.eq("travel_packages.kind", kind);
    const { data, error } = await query;
    return error ? [] : (data as PublicDeparture[]);
  } catch {
    return [];
  }
}

export function formatDepartureDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(`${value}T00:00:00+07:00`));
}
