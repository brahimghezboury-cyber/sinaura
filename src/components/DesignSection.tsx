import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, Camera, X, MessageCircle, Sparkles, User } from "lucide-react";
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

        {/* Aria Engine Demo - Liquid Glass Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Aria Engine</h3>
          
          {/* Chat Interface */}
          <div className="liquid-glass-dark rounded-3xl p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <span className="text-white font-medium">Aria Engine</span>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 mb-6 min-h-[180px]">
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-end"
              >
                <div className="chat-bubble-user px-4 py-3 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3 h-3" />
                    <span className="text-xs font-medium opacity-80">ME</span>
                  </div>
                  <p className="text-sm">I have an error FMO1201</p>
                </div>
              </motion.div>

              {/* Aria response */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex justify-start"
              >
                <div className="chat-bubble-aria px-4 py-3 max-w-[85%]">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs font-medium text-cyan-400">ARIA</span>
                  </div>
                  <p className="text-white font-medium mb-2">FMO1201</p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    The FMO1201 error indicates a communication issue between the device and the control system. 
                    This could be due to faulty wiring or a malfunctioning interface.
                  </p>
                  <p className="text-white/70 text-sm mt-3">
                    <span className="text-cyan-400 font-medium">Fase 1:</span> Check the wiring of the interface and ensure all connections are secure and undamaged.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Input area */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-full px-5 py-3">
                <span className="text-white/40 text-sm">Type or press and hold...</span>
              </div>
              <button className="w-11 h-11 rounded-full btn-glow flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feature cards - Horizontal scroll */}
        <div className="horizontal-scroll px-4 -mx-4">
          {[
            {
              title: "Voice Assistant",
              description: "Hands-free operation with natural language processing. Just speak your query and get instant AI-powered responses.",
              icon: Mic,
            },
            {
              title: "AR Camera Scan",
              description: "Point your camera at any equipment to instantly identify components, errors, and get diagnostic overlays.",
              icon: Camera,
            },
            {
              title: "Smart Diagnostics",
              description: "AI-powered error code analysis provides step-by-step repair guidance with root cause identification.",
              icon: Sparkles,
            },
            {
              title: "Predictive AI Engine",
              description: "Proprietary machine learning models analyze real-time data to forecast failures before they happen.",
              icon: MessageCircle,
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="feature-card w-72 md:w-80 p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-cyan-600" />
              </div>
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
