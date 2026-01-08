const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1 */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-semibold mb-4 text-muted-foreground">
              SINAURA
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Revolutionizing industrial operations with AI and augmented reality.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {["Overview", "Features", "Technology", "Pricing"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {["Documentation", "Case Studies", "Blog", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {["Privacy", "Terms", "Cookies", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 SINAURA™. All rights reserved. AriA™ is a registered trademark.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Italy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
