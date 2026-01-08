import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import heroGlasses from "@/assets/aria-hero-glasses.png";

const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative float">
              <img
                src={heroGlasses}
                alt="AriA™ Technology"
                className="w-full h-auto rounded-3xl"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/30 blur-[100px] -z-10 scale-75" />
            </div>

            {/* Floating specs cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 glass-card px-5 py-4"
            >
              <div className="text-xs text-muted-foreground mb-1">Response Time</div>
              <div className="text-2xl font-bold gradient-text">&lt;10ms</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-6 -left-6 glass-card px-5 py-4"
            >
              <div className="text-xs text-muted-foreground mb-1">AI Accuracy</div>
              <div className="text-2xl font-bold gradient-text">99.2%</div>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built with
              <br />
              <span className="gradient-text">breakthrough technology.</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10">
              AriA™ combines proprietary AI algorithms, advanced computer vision, 
              and edge computing to deliver real-time intelligence where it matters most.
            </p>

            {/* Tech specs */}
            <div className="space-y-6">
              {[
                {
                  label: "Proprietary ML Models",
                  description: "Custom-trained on industrial datasets for unmatched accuracy",
                },
                {
                  label: "Edge Computing",
                  description: "Local processing ensures low latency and data security",
                },
                {
                  label: "Multi-modal AI",
                  description: "Combines vision, voice, and sensor data for holistic analysis",
                },
                {
                  label: "Universal Connectivity",
                  description: "Works with any PLC, SCADA, or legacy system",
                },
              ].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <h4 className="font-semibold mb-1">{spec.label}</h4>
                    <p className="text-sm text-muted-foreground">{spec.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
