import { createClient } from "@/lib/supabase/server";
import ScheduleForm from "../schedule-form";
interface Props { searchParams: Promise<{ saved?: string; error?: string }> }
export default async function AddSchedulePage({ searchParams }: Props) { const supabase = await createClient(); const { data } = await supabase.from("travel_packages").select("id,title,kind").neq("status", "archived").order("kind").order("sort_order"); return <ScheduleForm packages={data ?? []} feedback={await searchParams} />; }
