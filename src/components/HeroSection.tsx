import { motion } from "framer-motion";
import heroImage from "@/assets/aria-hero-glasses.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] pulse-glow" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 glass-button px-4 py-2 text-xs font-medium tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Introducing AriA™
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">Industrial AI</span>
            <br />
            <span className="text-foreground">Meets Reality</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            One compact AI + AR platform powering predictive maintenance, 
            real-time manufacturing intelligence, and advanced decision support systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="cta-button text-base">
              Request Demo
            </button>
            <button className="glass-button text-base flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Film
            </button>
          </motion.div>
        </div>

        {/* Hero Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="relative max-w-4xl mx-auto float">
            <img
              src={heroImage}
              alt="AriA™ AR Smart Glasses"
              className="w-full h-auto"
            />
            {/* Image glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] -z-10 scale-75" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
