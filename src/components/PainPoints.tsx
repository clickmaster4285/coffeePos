import { useEffect, useRef } from "react";
import painQueue from "@/assets/pain-queue.jpg";
import painConfusion from "@/assets/pain-confusion.jpg";

const painPoints = [
  {
    title: "Long Queues During Morning Rush",
    description: "Customers walk away when they see a long line. Every minute of waiting costs you revenue and reputation.",
    image: painQueue,
    icon: "⏳",
  },
  {
    title: "Order Confusion at the Counter",
    description: "Handwritten orders get lost, misread, or mixed up. Wrong drinks mean wasted ingredients and unhappy customers.",
    image: painConfusion,
    icon: "😣",
  },
  {
    title: "Slow Billing & Barista Overload",
    description: "Manual billing slows everything down. Your baristas juggle orders, payments, and preparation—all at once.",
    image: painQueue,
    icon: "🐌",
  },
  {
    title: "Missed Orders & Revenue Leaks",
    description: "Without real-time tracking, orders slip through the cracks. You lose sales you never even knew about.",
    image: painConfusion,
    icon: "💸",
  },
];

export default function PainPoints() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        sectionRef.current.querySelectorAll(".pain-item").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section id="pain-points" ref={sectionRef} className="section-dark py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">Real Café Problems</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">
            Sound Familiar?
          </h2>
          <p className="text-cream/60 mt-4 max-w-xl mx-auto">
            These daily challenges are costing your café time, money, and customers.
          </p>
        </div>

        <div className="space-y-16">
          {painPoints.map((pain, i) => (
            <div
              key={pain.title}
              className={`pain-item flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center opacity-0`}
            >
              <div className="flex-1 relative rounded-2xl overflow-hidden group">
                <img
                  src={pain.image}
                  alt={pain.title}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-espresso/20" />
                <div className="absolute bottom-4 left-4 text-4xl">{pain.icon}</div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-cream">{pain.title}</h3>
                <p className="text-cream/60 text-lg leading-relaxed">{pain.description}</p>
                <div className="caramel-divider w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
