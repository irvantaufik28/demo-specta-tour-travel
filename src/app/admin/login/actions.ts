"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type LoginState = { error: string | null };

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || password.length < 6) return { error: "Masukkan email dan password yang valid." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "Email atau password tidak sesuai." };
  } catch {
    return { error: "Koneksi autentikasi belum siap. Periksa konfigurasi Supabase." };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
