import { motion } from "framer-motion";
import heroImage from "@/assets/hero-person-glasses.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero Image - Full width */}
      <div className="flex-1 relative">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Person wearing AriA™"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      </div>

      {/* Bottom content overlay */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-20 bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left side - Product name and tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium tracking-wide">SINAURA</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-3">
                AriA™
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md">
                Industrial AI meets Augmented Reality.
              </p>
            </motion.div>

            {/* Right side - CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <a href="#demo" className="btn-secondary text-sm">
                Book a demo
              </a>
              <a href="#contact" className="btn-primary text-sm">
                Contact Sales
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
