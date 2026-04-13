import { useEffect, useRef, useState } from "react";
import contactBg from "@/assets/contact-bg.jpg";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".contact-animate"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32">
      <div className="absolute inset-0">
        <img src={contactBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={800} />
        <div className="absolute inset-0 bg-espresso/90 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="contact-animate text-caramel text-sm font-semibold tracking-widest uppercase opacity-0">Get Started</span>
          <h2 className="contact-animate text-3xl md:text-5xl font-bold mt-3 text-gradient-warm opacity-0">
            Upgrade Your Café Experience with Smart POS
          </h2>
          <p className="contact-animate text-cream/60 mt-4 opacity-0">Get a free demo and see how CaféPOS can transform your coffee shop.</p>
        </div>

        <div className="contact-animate glass-card rounded-2xl p-8 md:p-10 opacity-0 glow-caramel">
          {submitted ? (
            <div className="text-center py-10">
              <span className="text-5xl mb-4 block">☕</span>
              <h3 className="text-2xl font-bold text-cream mb-2">Thank You!</h3>
              <p className="text-cream/60">We'll brew up a response for you within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-cream/70 text-sm mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-cream/70 text-sm mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@café.com"
                    className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-cream/70 text-sm mb-1.5">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-cream/70 text-sm mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your café..."
                  className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all resize-none"
                />
              </div>
              <button type="submit" className="btn-caramel w-full text-base py-4">
                Get Free Demo ☕
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
