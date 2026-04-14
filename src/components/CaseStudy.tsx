import { useEffect, useRef, useState } from "react";
import featureAnalytics from "@/assets/analytical dashboard.webp";

const metrics = [
  { label: "Faster Order Processing", value: 65, suffix: "%" },
  { label: "Reduced Wait Time", value: 48, suffix: "%" },
  { label: "Customer Turnover Increase", value: 35, suffix: "%" },
  { label: "Daily Sales Boost", value: 42, suffix: "%" },
];

function AnimatedBar({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between">
        <span className="text-cream font-medium">{label}</span>
        <span className="text-caramel font-bold">{width}{suffix}</span>
      </div>
      <div className="h-3 bg-espresso/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1500 ease-out"
          style={{
            width: `${width}%`,
            background: "linear-gradient(90deg, oklch(0.72 0.12 65), oklch(0.68 0.18 70))",
            transitionDuration: "1.5s",
          }}
        />
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".case-animate"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section ref={sectionRef} className="section-coffee py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">Real Results</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">Case Study: Bean & Brew</h2>
          <p className="text-cream/60 mt-4 max-w-xl mx-auto">See how a 3-location café chain transformed their operations with Caféra.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 case-animate opacity-0">
            <div className="relative rounded-2xl overflow-hidden glow-caramel">
              <img src={featureAnalytics} alt="Café analytics dashboard" className="w-full h-72 md:h-96 object-cover" loading="lazy" width={1200} height={800} />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
              <div className="absolute bottom-4 left-4 glass-card rounded-lg px-4 py-2">
                <span className="text-caramel font-bold text-sm">📊 Live Results</span>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            {metrics.map((m) => (
              <div key={m.label} className="case-animate opacity-0">
                <AnimatedBar value={m.value} suffix={m.suffix} label={m.label} />
              </div>
            ))}
            <div className="case-animate glass-card rounded-xl p-4 mt-6 opacity-0">
              <p className="text-cream/70 text-sm italic">
                "Within 3 months of switching to Caféra, we saw a dramatic improvement in order accuracy and speed. Our morning rush went from chaos to clockwork."
              </p>
              <p className="text-caramel text-sm font-semibold mt-2">— Sarah Mitchell, Bean & Brew Owner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
