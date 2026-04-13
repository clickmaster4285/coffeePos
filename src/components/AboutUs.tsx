import { useEffect, useRef } from "react";
import aboutTeam from "@/assets/about-team.jpg";
import hero3 from "@/assets/hero-3.jpg";

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          sectionRef.current.querySelectorAll(".about-animate"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }
    );
    return () => { mounted = false; };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero3} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-espresso/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 about-animate opacity-0">
            <div className="relative rounded-2xl overflow-hidden glow-caramel">
              <img src={aboutTeam} alt="Caféra team" className="w-full h-72 md:h-96 object-cover" loading="lazy" width={1200} height={800} />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <span className="about-animate text-caramel text-sm font-semibold tracking-widest uppercase opacity-0">About Caféra</span>
            <h2 className="about-animate text-3xl md:text-4xl font-bold text-gradient-warm opacity-0">
             We Build Technology That <span className="text-primary">Feeds the World</span>
            </h2>
          <p className="about-animate text-cream/60 text-lg leading-relaxed opacity-0">
  Clickmasters began as a small team of developers with a focus on solving real business challenges through practical software. Over time, we’ve delivered web, mobile, and cloud solutions for both startups and established companies across multiple industries.
</p>



<p className="about-animate text-cream/60 text-lg leading-relaxed opacity-0">
  Today, we help businesses streamline operations and improve efficiency through modern, scalable digital systems.   Based in Pakistan, we build custom software, enterprise platforms, and cloud integrations designed for long-term growth.
</p>


            <div className="about-animate flex gap-8 opacity-0">
              <div>
                <div className="text-3xl font-bold text-caramel">8+</div>
                <div className="text-cream/50 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-caramel">15+</div>
                <div className="text-cream/50 text-sm">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-caramel">50+</div>
                <div className="text-cream/50 text-sm">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
