import Footer from "@/widgets/layout/Footer/ui/Footer";
import FirstSection from "@/widgets/landing/ui/FrstSection";
import ThirdSection from "@/widgets/landing/ui/ThirdSection";
import SixthSection from "@/widgets/landing/ui/SixthSection";
import FourthSection from "@/widgets/landing/ui/FourthSection";
import SecondSection from "@/widgets/landing/ui/SecondSection";
import FifthSection from "@/widgets/landing/ui/FifthSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 text-white">
      <div className="flex-1">
        <FirstSection />
      </div>
      <div className="flex-1">
        <SecondSection />
      </div>
      <div className="flex-1">
        <ThirdSection />
      </div>
      <div className="flex-1">
        <FourthSection />
      </div>
      <div className="flex-1">
        <FifthSection />
      </div>
      <div className="flex-1">
        <SixthSection />
      </div>
      <Footer />
    </main>
  );
}
