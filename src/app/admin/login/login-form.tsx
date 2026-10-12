"use client";

import { useActionState } from "react";
import { login } from "./actions";

const initialState = { error: null as string | null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form className="admin-form" action={formAction}>
      <label>Email<input name="email" type="email" placeholder="admin@spectatravel.co.id" autoComplete="email" required /></label>
      <label>Password<input name="password" type="password" placeholder="Masukkan password" autoComplete="current-password" minLength={6} required /></label>
      {state.error ? <p className="admin-form-error" role="alert">{state.error}</p> : null}
      <button type="submit" disabled={pending}>{pending ? "Memeriksa…" : "Masuk"}</button>
      <small>Tidak tersedia pendaftaran publik. Akun dikelola langsung melalui Supabase Auth.</small>
    </form>
  );
}
