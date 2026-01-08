import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import glassesProduct from "@/assets/glasses-product.png";

const DesignSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="design" ref={ref} className="section-gray py-24 md:py-32">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground mb-3">Take a closer look.</p>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <img
            src={glassesProduct}
            alt="AriA™ Smart Glasses"
            className="w-full h-auto product-image float"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            AriA™ is the result of years of innovation in AI, industrial automation, and wearable technology. 
            Its advanced algorithms and elegant form deliver an exceptional experience every time you put it on.
          </p>
        </motion.div>

        {/* Feature cards - Horizontal scroll */}
        <div className="horizontal-scroll px-4 -mx-4">
          {[
            {
              title: "Predictive AI Engine",
              description: "Proprietary machine learning models analyze real-time data to forecast failures before they happen.",
              image: "🧠",
            },
            {
              title: "AR Overlay Display",
              description: "High-resolution display shows step-by-step guidance directly in your field of view.",
              image: "👓",
            },
            {
              title: "Voice Assistant",
              description: "Hands-free operation with natural language processing for seamless human-machine interaction.",
              image: "🎙️",
            },
            {
              title: "IoT Integration",
              description: "Connects with PLCs, sensors, and legacy systems for unified data access.",
              image: "📡",
            },
            {
              title: "Edge Computing",
              description: "Local processing ensures low latency and keeps your data secure on-premise.",
              image: "⚡",
            },
            {
              title: "Long Battery Life",
              description: "Extended battery supports full shifts with quick-swap capability for continuous operation.",
              image: "🔋",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="feature-card w-72 md:w-80 p-8"
            >
              <div className="text-4xl mb-6">{feature.image}</div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
