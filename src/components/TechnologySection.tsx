import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import factoryImage from "@/assets/factory-ar-overlay.png";

const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" ref={ref} className="section-gray py-24 md:py-32">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="headline mb-4">
            Unified Intelligence
          </h2>
          <p className="subheadline max-w-2xl mx-auto">
            One platform. Infinite possibilities.
          </p>
        </motion.div>

        {/* Large image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="rounded-3xl overflow-hidden mb-16"
        >
          <img
            src={factoryImage}
            alt="Factory with AR overlay"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed text-muted-foreground"
        >
          AriA™ connects PLCs, IoT devices, legacy systems, and technical documents 
          into one unified environment. Get an intuitive view of machines, components, 
          alarms, and operational status across your entire plant.
        </motion.p>

        {/* Two column feature highlight */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="feature-card p-10"
          >
            <h3 className="text-2xl font-semibold mb-4">Edge Computing</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All processing happens locally, ensuring sub-10ms response times 
              and keeping your sensitive operational data secure on-premise.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold">&lt;10ms</span>
              <span className="text-sm text-muted-foreground">response time</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="feature-card p-10"
          >
            <h3 className="text-2xl font-semibold mb-4">AI Accuracy</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Proprietary machine learning models trained on industrial datasets 
              deliver unmatched prediction accuracy for maintenance operations.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold">99.2%</span>
              <span className="text-sm text-muted-foreground">prediction accuracy</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
