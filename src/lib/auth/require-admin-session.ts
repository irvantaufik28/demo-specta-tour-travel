import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdminSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) redirect("/admin/login");

  return data.claims;
}
