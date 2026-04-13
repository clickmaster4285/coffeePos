import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [hero1, hero2, hero3];

const kpis = [
  { label: "Orders/Hour", value: "120+", icon: "📋" },
  { label: "Faster Checkout", value: "3x", icon: "⚡" },
  { label: "Revenue Boost", value: "40%", icon: "📈" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let mounted = true;
    import("gsap").then(({ gsap }) => {
      if (!mounted || !containerRef.current) return;
      gsap.fromTo(
        containerRef.current.querySelectorAll(".hero-animate"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        containerRef.current.querySelectorAll(".kpi-card"),
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, delay: 0.8, ease: "back.out(1.7)" }
      );
    });
    return () => { mounted = false; };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Cozy café environment ${i + 1}`}
            className="w-full h-full object-cover scale-105"
            style={{
              transform: i === current ? "scale(1.05)" : "scale(1)",
              transition: "transform 5s ease-out",
            }}
            width={1920}
            height={1080}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/50 to-espresso/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 to-transparent" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-4 text-center">
        <span className="hero-animate inline-block text-caramel text-sm font-semibold tracking-widest uppercase mb-4 opacity-0">
          ☕ Café POS Solutions
        </span>
        <h1 className="hero-animate text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0">
          <span className="text-gradient-warm">Smarter POS</span>
          <br />
          <span className="text-cream">for Modern Cafés</span>
          <br />
          <span className="text-cream/90">& Coffee Shops</span>
        </h1>
        <p className="hero-animate text-cream/70 text-base sm:text-lg md:text-xl max-w-2xl mb-8 opacity-0">
          Faster billing. Smoother operations. Better customer experience.
          Transform your café with intelligent point-of-sale technology.
        </p>
        <div className="hero-animate flex flex-col sm:flex-row gap-4 mb-16 opacity-0">
          <a href="#contact" className="btn-caramel text-base px-8 py-4">
            Get Free Demo
          </a>
          <a href="#features" className="btn-outline-cream text-base px-8 py-4">
            Explore Features
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="kpi-card glass-card rounded-2xl px-6 py-4 flex items-center gap-3 animate-float opacity-0"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            >
              <span className="text-2xl">{kpi.icon}</span>
              <div className="text-left">
                <div className="text-2xl font-bold text-caramel">{kpi.value}</div>
                <div className="text-xs text-cream/60">{kpi.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-caramel w-8" : "bg-cream/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
