import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PainPoints from "@/components/PainPoints";
import Solutions from "@/components/Solutions";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaseStudy from "@/components/CaseStudy";
import Testimonials from "@/components/Testimonials";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Blog from "@/components/Blog";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyDemo from "@/components/StickyDemo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CaféPOS — Smarter POS for Modern Cafés & Coffee Shops" },
      { name: "description", content: "Transform your café with intelligent POS technology. Faster billing, smoother operations, and better customer experience for coffee shops worldwide." },
      { property: "og:title", content: "CaféPOS — Smarter POS for Modern Cafés & Coffee Shops" },
      { property: "og:description", content: "Transform your café with intelligent POS technology. Faster billing, smoother operations, better customer experience." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PainPoints />
      <Solutions />
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <CaseStudy />
      <Testimonials />
      <AboutUs />
      <Services />
      <Blog />
      <ContactSection />
      <Footer />
      <StickyDemo />
    </div>
  );
}
