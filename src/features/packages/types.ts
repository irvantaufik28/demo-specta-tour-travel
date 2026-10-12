export type PackageKind = "domestic" | "international" | "umrah";
export type ContentStatus = "draft" | "published" | "archived";

export interface TravelPackage {
  id: string;
  kind: PackageKind;
  title: string;
  slug: string;
  summary: string;
  destination: string;
  duration: string;
  startingPrice: number | null;
  coverImage: string | null;
  featured: boolean;
  status: ContentStatus;
  publishedAt: string | null;
}
