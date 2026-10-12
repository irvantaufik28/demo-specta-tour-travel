import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
  let isAuthenticated = false;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    isAuthenticated = Boolean(data?.claims?.sub);
  } catch {
    // The form will surface configuration or connection errors on submit.
  }

  if (isAuthenticated) redirect("/admin");

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <span>S</span>
        <h1>Masuk ke Specta CMS</h1>
        <p>Gunakan akun pengelola yang terdaftar di Supabase Auth.</p>
        <LoginForm />
      </section>
    </main>
  );
}
