import Footer from "@/widgets/layout/Footer/ui/Footer";

import {
  FifthSection,
  FirstSection,
  ThirdSection,
  SixthSection,
  FourthSection,
  SecondSection,
} from "@/widgets/landing/ui";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 text-white">
      <FirstSection />

      <SecondSection />

      <ThirdSection />

      <FourthSection />

      <FifthSection />

      <SixthSection />

      <Footer />
    </main>
  );
}
