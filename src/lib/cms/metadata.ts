import type { Metadata } from "next";
import { getPublishedPage, getSiteSettings } from "./content";

export interface MetadataFallback {
  title: string;
  description: string;
}

export async function getPageMetadata(
  slug: string,
  fallback: MetadataFallback,
): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPublishedPage(slug),
    getSiteSettings(),
  ]);

  const title = page?.seo_title ?? settings?.default_seo_title ?? fallback.title;
  const description =
    page?.seo_description ?? settings?.default_seo_description ?? fallback.description;
  const ogTitle = page?.og_title ?? title;
  const ogDescription = page?.og_description ?? description;
  const ogImage = page?.og_image_path ?? settings?.default_og_image_path;

  return {
    title,
    description,
    keywords: page?.seo_keywords?.length ? page.seo_keywords : undefined,
    alternates: page?.canonical_url ? { canonical: page.canonical_url } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "website",
    },
    robots: {
      index: page?.robots_index ?? true,
      follow: page?.robots_follow ?? true,
    },
  };
}
