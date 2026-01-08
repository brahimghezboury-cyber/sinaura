import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Smart Fault Diagnosis",
    description: "AI-powered analysis that identifies root causes and suggests optimal solutions in real-time.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Voice Powered Assistant",
    description: "Hands-free operation with natural language processing for seamless human-machine interaction.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Fault Forecast",
    description: "Predict equipment failures days or weeks in advance with 95%+ accuracy.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "AR Guidance",
    description: "Step-by-step visual instructions overlaid directly onto equipment.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "IoT Integration",
    description: "Seamlessly connect with existing PLCs, sensors, and industrial systems.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Automated Troubleshooting",
    description: "Parse documentation and generate actionable repair procedures automatically.",
    gradient: "from-rose-500 to-orange-500",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Every capability.
            <br />
            <span className="gradient-text">One platform.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From predictive analytics to augmented guidance, 
            everything you need to transform your operations.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="glass-card p-8 group hover:border-primary/30 transition-all duration-500 shimmer"
            >
              {/* Gradient line */}
              <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${feature.gradient} mb-6 group-hover:w-24 transition-all duration-500`} />
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
