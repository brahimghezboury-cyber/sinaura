import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto h-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
            SINAURA
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#overview" className="text-xs opacity-80 hover:opacity-100 transition-opacity">
            Overview
          </a>
          <a href="#design" className="text-xs opacity-80 hover:opacity-100 transition-opacity">
            Design
          </a>
          <a href="#features" className="text-xs opacity-80 hover:opacity-100 transition-opacity">
            Features
          </a>
          <a href="#technology" className="text-xs opacity-80 hover:opacity-100 transition-opacity">
            Technology
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#demo" className="text-xs opacity-80 hover:opacity-100 transition-opacity hidden sm:block">
            Book a demo
          </a>
          <a href="#contact" className="btn-primary text-xs py-2 px-4">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
