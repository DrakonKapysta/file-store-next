import { LoaderProvider } from "@/components/shared/LoaderProvider";
import { Navbar } from "@/components/shared/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LoaderProvider>
      <section className="h-full flex flex-col">
        <Navbar />
        {children}
      </section>
    </LoaderProvider>
  );
}
