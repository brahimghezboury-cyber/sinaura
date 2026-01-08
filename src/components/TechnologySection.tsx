import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, User, Sparkles, Camera, Mic, MessageCircle } from "lucide-react";
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

        {/* Detail View Demo - Liquid Glass Light */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl mx-auto mb-16"
        >
          <div className="liquid-glass-light rounded-3xl p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-black/10">
              <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
                <ArrowLeft className="w-5 h-5 text-black/70" />
              </button>
              <span className="font-medium text-black/90">Detail</span>
            </div>

            {/* Component title */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-black">TERMOCOPPIA TEMPERATURA IN CAMERA</h4>
              <p className="text-sm text-black/50">23 December 2025 at 16:50</p>
            </div>

            {/* Request */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">My request</span>
              </div>
              <p className="text-black/80 text-sm">I have an error FMO1201</p>
            </div>

            {/* Response */}
            <div className="bg-pink-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-medium text-pink-600">Aria Response</span>
              </div>
              <p className="text-black font-medium mb-2">FMO1201</p>
              <p className="text-black/70 text-sm leading-relaxed">
                The FMO1201 error indicates a communication issue between the device and the control system. 
                This could be due to faulty wiring or a malfunctioning interface.
              </p>
              <p className="text-black/70 text-sm mt-3">
                <span className="font-medium">Fase 1:</span> Check the wiring of the interface and ensure all connections are secure and undamaged.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating Action Buttons Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center gap-4 mb-16"
        >
          <div className="flex flex-col gap-3 items-center">
            <p className="text-sm text-muted-foreground mb-2">Quick Actions</p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full liquid-glass-light flex items-center justify-center shadow-lg"
              >
                <MessageCircle className="w-6 h-6 text-black/80" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full liquid-glass-light flex items-center justify-center shadow-lg"
              >
                <Camera className="w-6 h-6 text-black/80" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full liquid-glass-light flex items-center justify-center shadow-lg"
              >
                <Mic className="w-6 h-6 text-black/80" />
              </motion.button>
            </div>
          </div>
        </motion.div>

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
