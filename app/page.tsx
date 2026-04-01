import Footer from "@/widgets/layout/Footer/ui/Footer";
import FirstSection from "@/widgets/landing/ui/FrstSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 text-white">
      <div className="flex-1">
        <FirstSection />
      </div>

      <Footer />
    </main>
  );
}
