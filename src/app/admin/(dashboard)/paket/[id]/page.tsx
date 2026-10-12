import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PackageForm from "../package-form";

interface EditPackagePageProps { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> }
export default async function EditPackagePage({ params, searchParams }: EditPackagePageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("travel_packages").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <PackageForm item={data} feedback={await searchParams} />;
}
