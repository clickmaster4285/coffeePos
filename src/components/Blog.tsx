import { useEffect, useRef } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const blogs = [
  {
    title: "5 Ways Smart POS Transforms Your Coffee Shop",
    excerpt: "Discover how modern POS technology can reduce wait times, increase accuracy, and boost customer satisfaction.",
    image: hero1,
    category: "POS Tips",
    date: "Mar 15, 2026",
  },
  {
    title: "The Future of Coffee Shop Automation",
    excerpt: "From QR ordering to AI-powered inventory management—here's what's coming to the café industry.",
    image: hero2,
    category: "Industry Trends",
    date: "Mar 8, 2026",
  },
  {
    title: "How to Handle Morning Rush Like a Pro",
    excerpt: "Practical strategies and tech solutions to turn your busiest hour into your most profitable.",
    image: hero3,
    category: "Café Business",
    date: "Feb 28, 2026",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".blog-card"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section ref={sectionRef} className="section-dark py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-caramel text-sm font-semibold tracking-widest uppercase">From Our Blog</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-gradient-warm">Café Industry Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article key={blog.title} className="blog-card glass-card rounded-2xl overflow-hidden group cursor-pointer opacity-0 glow-caramel-hover transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={1920} height={1080} />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
                <div className="absolute top-3 left-3 glass-card rounded-full px-3 py-1">
                  <span className="text-caramel text-xs font-medium">{blog.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-cream/40 text-xs mb-2">{blog.date}</div>
                <h3 className="text-lg font-bold text-cream mb-2 group-hover:text-caramel transition-colors">{blog.title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{blog.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
