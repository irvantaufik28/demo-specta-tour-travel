import "server-only";

import { createClient } from "@supabase/supabase-js";
import { cacheLife } from "next/cache";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/database";

export type CmsPage = Database["public"]["Tables"]["pages"]["Row"];
export type CmsPageSection = Database["public"]["Tables"]["page_sections"]["Row"];
export type CmsSiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

function createPublicCmsClient() {
  const { url, key } = getSupabaseConfig();

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export async function getPublishedPage(slug: string): Promise<CmsPage | null> {
  "use cache";
  cacheLife("hours");

  try {
    const { data, error } = await createPublicCmsClient()
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getPublishedPageSections(
  slug: string,
): Promise<CmsPageSection[]> {
  "use cache";
  cacheLife("hours");

  try {
    const page = await getPublishedPage(slug);
    if (!page) return [];

    const { data, error } = await createPublicCmsClient()
      .from("page_sections")
      .select("*")
      .eq("page_id", page.id)
      .eq("status", "published")
      .eq("is_visible", true)
      .order("sort_order");

    if (error) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  "use cache";
  cacheLife("hours");

  try {
    const { data, error } = await createPublicCmsClient()
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getSectionContent<T>(
  slug: string,
  sectionKey: string,
  fallback: T,
): Promise<T> {
  const sections = await getPublishedPageSections(slug);
  const section = sections.find((item) => item.section_key === sectionKey);
  return (section?.content as T | undefined) ?? fallback;
}

export function getHeroContent(slug: string, fallback: HeroContent) {
  return getSectionContent(slug, "hero", fallback);
}
