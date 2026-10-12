import FloatingContact from "@/components/floating-contact";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}<FloatingContact /></>;
}
