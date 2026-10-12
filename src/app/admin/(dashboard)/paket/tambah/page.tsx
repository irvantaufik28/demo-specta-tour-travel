import PackageForm from "../package-form";

interface AddPackagePageProps { searchParams: Promise<{ saved?: string; error?: string }> }
export default async function AddPackagePage({ searchParams }: AddPackagePageProps) {
  return <PackageForm feedback={await searchParams} />;
}
