import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const testimonials = [
  {
    name: "James Rodriguez",
    role: "Owner, The Daily Grind",
    image: testimonial1,
    quote: "CaféPOS transformed our morning rush. We now serve 40% more customers with zero order mistakes. The barista display is a game-changer.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Manager, Brew & Co.",
    image: testimonial2,
    quote: "The QR ordering feature alone paid for itself in the first month. Customers love ordering from their table while our staff focuses on making great coffee.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Owner, Eastside Espresso",
    image: testimonial1,
    quote: "Managing three locations used to be a nightmare. Now I see everything from one dashboard. Inventory tracking saves us thousands every month.",
    rating: 5,
  },
  {
    name: "Anna Kowalski",
    role: "Founder, Cloud Cup Café",
    image: testimonial2,
    quote: "We tried 4 different POS systems before CaféPOS. Nothing else understands café workflows the way this does. Our team adopted it instantly.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelector(".swiper-wrapper"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-dark py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">Loved by Café Owners</h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="!pb-14"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="glass-card rounded-2xl p-6 md:p-8 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-caramel text-lg">★</span>
                  ))}
                </div>
                <p className="text-cream/70 text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-caramel/30"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="text-cream font-semibold text-sm">{t.name}</div>
                    <div className="text-caramel/70 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet { background: oklch(0.72 0.12 65 / 0.4) !important; width: 10px !important; height: 10px !important; }
        .swiper-pagination-bullet-active { background: oklch(0.72 0.12 65) !important; width: 24px !important; border-radius: 5px !important; }
      `}</style>
    </section>
  );
}
