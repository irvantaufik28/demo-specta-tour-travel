import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ScheduleForm from "../schedule-form";
interface Props { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> }
export default async function EditSchedulePage({ params, searchParams }: Props) { const { id } = await params; const supabase = await createClient(); const [{ data: item }, { data: packages }] = await Promise.all([supabase.from("package_departures").select("*").eq("id", id).maybeSingle(), supabase.from("travel_packages").select("id,title,kind").neq("status", "archived").order("kind").order("sort_order")]); if (!item) notFound(); return <ScheduleForm item={item} packages={packages ?? []} feedback={await searchParams} />; }
