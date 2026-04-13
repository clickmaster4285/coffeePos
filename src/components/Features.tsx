import { useEffect, useRef } from "react";
import featureDashboard from "@/assets/feature-dashboard.jpg";
import featureQr from "@/assets/feature-qr.jpg";
import featureKitchen from "@/assets/feature-kitchen.jpg";
import featureInventory from "@/assets/feature-inventory.jpg";
import featureMulti from "@/assets/feature-multi.jpg";
import featureAnalytics from "@/assets/feature-analytics.jpg";

const features = [
  {
    title: "Coffee Shop POS Dashboard",
    description: "Real-time order management, sales tracking, and staff performance—all in one beautiful interface.",
    image: featureDashboard,
  },
  {
    title: "QR Ordering System",
    description: "Let customers scan and order from their table. No lines, no waiting, just great coffee.",
    image: featureQr,
  },
  {
    title: "Kitchen & Barista Display",
    description: "Orders flow instantly to your barista station. No missed drinks, no confusion.",
    image: featureKitchen,
  },
  {
    title: "Inventory Tracking",
    description: "Track beans, milk, syrups, and supplies. Get alerts before you run out.",
    image: featureInventory,
  },
  {
    title: "Multi-Branch Management",
    description: "Manage all your café locations from a single dashboard with unified reporting.",
    image: featureMulti,
  },
  {
    title: "Sales Analytics",
    description: "Understand your best sellers, peak hours, and revenue trends with visual insights.",
    image: featureAnalytics,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".feature-card"),
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-warm py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">Powerful Features</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">
            Everything Your Café Needs
          </h2>
          <p className="text-cream/60 mt-4 max-w-xl mx-auto">
            Built specifically for coffee shops and cafés. Every feature designed for your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card glass-card rounded-2xl overflow-hidden group cursor-pointer opacity-0 glow-caramel-hover transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-cream mb-2">{feature.title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
