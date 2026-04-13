import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import featureDashboard from "@/assets/feature-dashboard.jpg";

const stats = [
  { label: "Cafés Powered", target: 500, suffix: "+" },
  { label: "Orders Processed", target: 2, suffix: "M+" },
  { label: "Avg Speed Increase", target: 3, suffix: "x" },
  { label: "Customer Satisfaction", target: 98, suffix: "%" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const stepTime = 16;
          const steps = duration / stepTime;
          const increment = target / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-caramel">
      {count}{suffix}
    </div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".why-card"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero1} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-espresso/85 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">Why Caféra</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">Trusted by Café Owners</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="why-card glass-card rounded-2xl p-6 text-center opacity-0 glow-caramel">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <div className="text-cream/60 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Built for Cafés", desc: "Not a generic POS adapted for coffee—built from the ground up for café workflows.", image: hero2 },
            { title: "Real-Time Sync", desc: "Counter, kitchen, and mobile all stay perfectly in sync. No delays.", image: featureDashboard },
            { title: "24/7 Support", desc: "Our café-specialized support team is always ready to help you brew success.", image: hero1 },
          ].map((item) => (
            <div key={item.title} className="why-card glass-card rounded-2xl overflow-hidden opacity-0 group">
              <div className="relative h-40 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={1200} height={800} />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-cream mb-2">{item.title}</h3>
                <p className="text-cream/50 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
