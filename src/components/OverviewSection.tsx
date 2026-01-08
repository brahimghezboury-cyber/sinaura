import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import factoryImage from "@/assets/factory-ar-overlay.png";

const OverviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="overview" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Welcome to the future</span>
            <br />
            of industrial operations.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            AriA™ transforms how industries operate by converting machine data, 
            alarms, and technical knowledge into real-time intelligence and guided actions.
          </p>
        </motion.div>

        {/* Feature image with glass overlay */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden mb-20"
        >
          <img
            src={factoryImage}
            alt="Factory with AR overlay"
            className="w-full h-auto"
          />
          {/* Glass overlay card */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-auto md:max-w-md">
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                See beyond the machine
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Real-time AR overlays provide instant access to diagnostics, 
                procedures, and AI-powered insights directly in your field of view.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Predictive AI",
              description: "Forecast failures before they happen with advanced machine learning models trained on your operational data.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: "Augmented Reality",
              description: "Step-by-step AR guidance, digital overlays, and real-time operating procedures at your fingertips.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ),
            },
            {
              title: "Unified Data Layer",
              description: "Connect PLCs, IoT devices, legacy systems, and technical documents into one intelligent environment.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              ),
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="glass-card p-8 group hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary icon-glow group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
