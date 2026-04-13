import { useEffect, useRef, useState } from "react";
import contactBg from "@/assets/contact-bg.jpg";
import { MapPin, Mail, Phone, Send, Clock, Navigation, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const LOCATION = {
  fullAddress:
    "Paris Shopping Mall, 4th floor, Main PWD Rd, PWD Housing Society Sector A, Islamabad, Punjab 45700, Pakistan",
};

const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  LOCATION.fullAddress
)}&output=embed`;

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again or email marketing@clickmasters.pk");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32">
      <div className="absolute inset-0">
        <img src={contactBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={800} />
        <div className="absolute inset-0 bg-espresso/90 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="contact-animate text-caramel text-sm font-semibold tracking-widest uppercase opacity-0">Contact Us</span>
          <h2 className="contact-animate text-3xl md:text-5xl font-bold mt-3 text-gradient-warm opacity-0">
            Get in <span className="text-caramel">Touch</span>
          </h2>
          <p className="contact-animate text-cream/60 mt-4 opacity-0">Get a free demo and see how Caféra can transform your coffee shop.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div className="contact-animate glass-card rounded-2xl p-6 md:p-8 opacity-0 glow-caramel">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-caramel/20">
                <div className="p-2 rounded-lg bg-caramel/10">
                  <MessageSquare className="h-5 w-5 text-caramel" />
                </div>
                <h1 className="text-xl font-bold text-cream">Send us a message</h1>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-cream/70 text-sm font-medium flex items-center gap-1">
                  Full Name <span className="text-caramel">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-cream/70 text-sm font-medium flex items-center gap-1">
                  Email Address <span className="text-caramel">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-cream/70 text-sm font-medium">
                  Phone Number <span className="text-cream/40 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+92 123 4567890"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-cream/70 text-sm font-medium flex items-center gap-1">
                  Message <span className="text-caramel">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project or inquiry..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-espresso/50 border border-caramel/20 text-cream placeholder:text-cream/30 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/50 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-caramel w-full text-base py-4 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* CONTACT + MAP */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="contact-animate glass-card rounded-2xl p-6 flex gap-4 opacity-0 glow-caramel">
                <MapPin className="text-caramel shrink-0" />
                <div>
                  <p className="font-bold text-cream">Address</p>
                  <p className="text-sm text-cream/60">
                    {LOCATION.fullAddress}
                  </p>
                </div>
              </div>

              <div className="contact-animate glass-card rounded-2xl p-6 flex gap-4 opacity-0 glow-caramel">
                <Mail className="text-caramel shrink-0" />
                <div>
                  <p className="font-bold text-cream">Email</p>
                  <p className="text-sm text-cream/60">marketing@clickmasters.pk</p>
                  <p className="text-sm text-cream/60">info@clickmasters.pk</p>
                </div>
              </div>

              <div className="contact-animate glass-card rounded-2xl p-6 flex gap-4 opacity-0 glow-caramel">
                <Phone className="text-caramel shrink-0" />
                <div>
                  <p className="font-bold text-cream">Phone</p>
                  <p className="text-sm text-cream/60">+92 333-1116842</p>
                  <p className="text-sm text-cream/60">+92 332-5394285</p>
                </div>
              </div>

              <div className="contact-animate glass-card rounded-2xl p-6 flex gap-4 opacity-0 glow-caramel">
                <Clock className="text-caramel shrink-0" />
                <div>
                  <p className="font-bold text-cream">Hours</p>
                  <p className="text-sm text-cream/60">Mon - Sat: 9AM - 6PM</p>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="contact-animate rounded-xl overflow-hidden border border-caramel/20 opacity-0 glow-caramel">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="250"
                loading="lazy"
                className="w-full"
                title="Office Location Map"
              />
            </div>

            {/* DIRECTIONS */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                LOCATION.fullAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-animate flex items-center gap-2 text-caramel text-sm hover:underline opacity-0"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}