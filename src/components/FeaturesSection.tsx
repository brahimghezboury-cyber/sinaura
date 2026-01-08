import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import engineerImage from "@/assets/engineer-ar.png";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="section-dark py-24 md:py-32">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="headline gradient-text-light mb-4">
            Predictive Maintenance
          </h2>
          <p className="subheadline max-w-2xl mx-auto" style={{ color: "hsl(0 0% 65%)" }}>
            See the future of your equipment.
          </p>
        </motion.div>

        {/* Full width image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 rounded-3xl overflow-hidden"
        >
          <img
            src={engineerImage}
            alt="Engineer using AriA™"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          style={{ color: "hsl(0 0% 75%)" }}
        >
          Transform any workspace into an intelligent operations center. 
          AriA™ provides real-time diagnostics, step-by-step AR guidance, 
          and predictive analytics that help you prevent downtime and optimize performance.
        </motion.p>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Fault Diagnosis",
              description: "AI-powered root cause analysis identifies issues in seconds, not hours.",
            },
            {
              title: "AR Step-by-Step Guidance",
              description: "Visual instructions overlaid directly on equipment for error-free repairs.",
            },
            {
              title: "Failure Forecasting",
              description: "Predict equipment failures days or weeks in advance with 95%+ accuracy.",
            },
            {
              title: "Real-Time Monitoring",
              description: "Live dashboards show machine health, alerts, and performance metrics.",
            },
            {
              title: "Document Intelligence",
              description: "Automatically parse manuals and generate actionable repair procedures.",
            },
            {
              title: "Know-How Transfer",
              description: "Capture expert knowledge and make it accessible to your entire team.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="p-8 rounded-3xl"
              style={{ background: "hsl(0 0% 8%)" }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(0 0% 98%)" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 60%)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="#technology" className="link-arrow" style={{ color: "hsl(210 100% 65%)" }}>
            Learn more about the technology
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
