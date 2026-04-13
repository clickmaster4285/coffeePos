export default function Footer() {
  return (
    <footer className="section-dark border-t border-caramel/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☕</span>
              <span className="text-xl font-bold text-gradient-warm">Caféra</span>
            </div>
            <p className="text-cream/50 text-sm">Smarter POS for modern cafés and coffee shops worldwide.</p>
          </div>
          <div>
            <h4 className="text-cream font-semibold mb-3 text-sm">Product</h4>
            <div className="space-y-2">
              {["Features", "Pricing", "Integrations", "Updates"].map((l) => (
                <a key={l} href="#features" className="block text-cream/40 text-sm hover:text-caramel transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-cream font-semibold mb-3 text-sm">Company</h4>
            <div className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-cream/40 text-sm hover:text-caramel transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-cream font-semibold mb-3 text-sm">Support</h4>
            <div className="space-y-2">
              {["Help Center", "Documentation", "API Reference", "Status"].map((l) => (
                <a key={l} href="#" className="block text-cream/40 text-sm hover:text-caramel transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="caramel-divider mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-cream/30 text-xs">
          <span>© 2026 Caféra. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-caramel transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-caramel transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
