import { Navbar } from "@/components/shared/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full flex flex-col">
      <Navbar />
      {children}
    </section>
  );
}
