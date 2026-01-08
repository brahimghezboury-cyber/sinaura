import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="headline mb-6">
            Ready to transform your operations?
          </h2>
          <p className="subheadline mb-10">
            Join the industry leaders already using AriA™ to revolutionize 
            their manufacturing processes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contact" className="btn-primary text-base px-8 py-4">
              Book a Demo
            </a>
            <a href="#contact" className="btn-secondary text-base px-8 py-4">
              Contact Sales
            </a>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-12 border-t border-border"
          >
            <p className="text-xs text-muted-foreground mb-6">
              Trusted by leading manufacturing companies
            </p>
            <div className="flex items-center justify-center gap-12 opacity-30">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-16 h-6 bg-foreground/40 rounded"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
