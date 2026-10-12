import { Suspense } from "react";
import AdminShell from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/auth/require-admin-session";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
    </Suspense>
  );
}

async function AuthenticatedDashboard({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdminSession();
  return <AdminShell>{children}</AdminShell>;
}

function DashboardFallback() {
  return (
    <main className="admin-login" aria-busy="true" aria-live="polite">
      <section className="admin-login-card">
        <span>S</span>
        <h1>Menyiapkan dashboard…</h1>
        <p>Sesi admin sedang diverifikasi.</p>
      </section>
    </main>
  );
}
