import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 55, suffix: "%", label: "Reduction in Downtime", prefix: "-" },
  { value: 50, suffix: "%", label: "Faster Repair Time", prefix: "" },
  { value: 60, suffix: "%", label: "Improved Accuracy", prefix: "+" },
  { value: 50, suffix: "%", label: "Training Cost Reduction", prefix: "-" },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  prefix, 
  isInView 
}: { 
  value: number; 
  suffix: string; 
  prefix: string; 
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="stat-value">
      {prefix}{count}{suffix}
    </span>
  );
};

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="relative py-32 md:py-48 overflow-hidden section-glow">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[800px] bg-primary/8 rounded-full blur-[180px] pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Impact that
            <br />
            <span className="gradient-text">speaks for itself.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real deployments across manufacturing facilities worldwide.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="glass-card p-8 text-center group"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                isInView={isInView}
              />
              <p className="text-sm text-muted-foreground mt-4">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional benefits */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 glass-card p-10 md:p-14"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Unified plant management
                <br />
                <span className="gradient-text">at your fingertips.</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Get an intuitive view of machines, components, alarms, and operational 
                status across your entire plant. AriA™ brings everything together in 
                one intelligent interface.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time monitoring dashboard",
                  "Predictive alerts and notifications",
                  "Historical data analysis",
                  "Custom reporting and insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold gradient-text mb-2">24/7</div>
                <p className="text-muted-foreground">Continuous Monitoring</p>
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full border border-primary/20 animate-pulse" />
                <div className="absolute w-64 h-64 rounded-full border border-primary/10" />
                <div className="absolute w-80 h-80 rounded-full border border-primary/5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
