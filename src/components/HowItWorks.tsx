import { useEffect, useRef } from "react";
import featureQr from "@/assets/feature-qr.jpg";
import featureDashboard from "@/assets/feature-dashboard.jpg";
import featureKitchen from "@/assets/feature-kitchen.jpg";
import hero2 from "@/assets/hero-2.jpg";

const steps = [
  {
    step: "01",
    title: "Customer Orders",
    description: "At counter or via QR code from their table—the choice is theirs.",
    image: featureQr,
  },
  {
    step: "02",
    title: "POS Processes Instantly",
    description: "Order enters the system, payment is recorded, receipt sent digitally.",
    image: featureDashboard,
  },
  {
    step: "03",
    title: "Barista Gets Notified",
    description: "Order appears on the kitchen display with all customizations clearly shown.",
    image: featureKitchen,
  },
  {
    step: "04",
    title: "Coffee Served with a Smile",
    description: "Fast, accurate, delightful. Your customers come back for more.",
    image: hero2,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        sectionRef.current.querySelectorAll(".step-item").forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: el, start: "top 85%" } }
          );
        });
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="section-dark py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">Simple Workflow</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">How It Works</h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-caramel/60 via-caramel/30 to-transparent hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={step.step} className={`step-item flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 opacity-0`}>
                <div className="flex-1 relative rounded-2xl overflow-hidden group">
                  <img src={step.image} alt={step.title} className="w-full h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1200} height={800} />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
                  <div className="absolute top-4 left-4 glass-card rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-caramel font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="text-caramel font-mono text-sm">Step {step.step}</div>
                  <h3 className="text-2xl font-bold text-cream">{step.title}</h3>
                  <p className="text-cream/60 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
