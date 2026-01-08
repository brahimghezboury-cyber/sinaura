import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border/50"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight">
            SINAURA<span className="text-muted-foreground">™</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Overview
          </a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Technology
          </a>
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </a>
        </div>

        <button className="glass-button text-sm px-6 py-2.5">
          Contact Sales
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
