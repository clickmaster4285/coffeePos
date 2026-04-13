import { useEffect, useRef } from "react";
import featureDashboard from "@/assets/feature-dashboard.jpg";
import featureQr from "@/assets/feature-qr.jpg";
import featureKitchen from "@/assets/feature-kitchen.jpg";
import featureInventory from "@/assets/feature-inventory.jpg";
import featureAnalytics from "@/assets/feature-analytics.jpg";

const services = [
  { title: "Café POS Systems", desc: "Complete point-of-sale with menu management, billing, and receipt printing.", image: featureDashboard },
  { title: "Mobile Ordering Apps", desc: "Custom-branded mobile apps for your customers to order ahead and skip the line.", image: featureQr },
  { title: "Delivery Integrations", desc: "Connect with UberEats, DoorDash, and other platforms seamlessly.", image: featureKitchen },
  { title: "Inventory Management", desc: "Track every bean, cup, and syrup. Smart alerts keep you stocked.", image: featureInventory },
  { title: "Analytics Dashboards", desc: "Deep insights into sales patterns, customer behavior, and staff performance.", image: featureAnalytics },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".service-card"),
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section ref={sectionRef} className="section-warm py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">Complete Café Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card glass-card rounded-2xl overflow-hidden group opacity-0 glow-caramel-hover transition-all duration-500 ${
                i === services.length - 1 && services.length % 3 !== 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={1200} height={800} />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-cream mb-2">{s.title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
