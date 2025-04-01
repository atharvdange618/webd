import { CallToAction } from "~/components/call-to-action";
import { Features } from "~/components/features";
import { Footer } from "~/components/footer";
import { HeroSection } from "~/components/hero-section";
import { HowItWorks } from "~/components/how-it-works";
import { ProductCategories } from "~/components/product-categories";
import { Testimonials } from "~/components/testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <ProductCategories />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
