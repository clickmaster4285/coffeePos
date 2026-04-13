import { useEffect, useRef, useState } from "react";
import painConfusion from "@/assets/pain-confusion.jpg";
import featureDashboard from "@/assets/feature-dashboard.jpg";

export default function Solutions() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, pos)));
  };

  useEffect(() => {
    const onUp = () => { dragging.current = false; };
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".sol-animate"),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section id="solutions" ref={sectionRef} className="section-coffee py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="sol-animate text-caramel text-sm font-semibold tracking-widest uppercase opacity-0">Before & After</span>
          <h2 className="sol-animate text-3xl md:text-5xl font-bold mt-3 text-gradient-warm opacity-0">
            Transform Your Café Experience
          </h2>
        </div>

        <div
          ref={containerRef}
          className="sol-animate relative rounded-2xl overflow-hidden h-[300px] md:h-[500px] cursor-col-resize select-none opacity-0 glow-caramel"
          onMouseDown={() => { dragging.current = true; }}
          onTouchStart={() => { dragging.current = true; }}
        >
          <div className="absolute inset-0">
            <img src={painConfusion} alt="Before - manual orders" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
            <div className="absolute inset-0 bg-espresso/40" />
            <div className="absolute top-4 left-4 glass-card rounded-lg px-4 py-2">
              <span className="text-cream font-bold text-sm">❌ Before</span>
            </div>
          </div>

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img src={featureDashboard} alt="After - digital POS" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
            <div className="absolute inset-0 bg-espresso/20" />
            <div className="absolute top-4 left-4 glass-card rounded-lg px-4 py-2">
              <span className="text-caramel font-bold text-sm">✅ After</span>
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-1 bg-caramel z-10"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-caramel flex items-center justify-center shadow-lg glow-caramel">
              <svg className="w-5 h-5 text-espresso" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { before: "Handwritten orders", after: "Digital POS System", icon: "📝" },
            { before: "Slow checkout", after: "QR Ordering", icon: "📱" },
            { before: "Messy workflow", after: "Synced Operations", icon: "🔄" },
          ].map((item) => (
            <div key={item.icon} className="sol-animate glass-card rounded-xl p-6 text-center opacity-0">
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <div className="text-cream/50 text-sm line-through mb-1">{item.before}</div>
              <div className="text-caramel font-semibold">{item.after}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
