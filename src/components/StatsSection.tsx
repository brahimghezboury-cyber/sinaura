import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 55, suffix: "%", label: "Reduction in unplanned downtime", prefix: "-" },
  { value: 50, suffix: "%", label: "Faster mean time to repair", prefix: "" },
  { value: 60, suffix: "%", label: "Improvement in operational accuracy", prefix: "+" },
  { value: 50, suffix: "%", label: "Reduction in training costs", prefix: "-" },
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
    <span className="text-5xl md:text-6xl font-semibold tracking-tight">
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="headline mb-4">
            Real impact. Real results.
          </h2>
          <p className="subheadline max-w-2xl mx-auto">
            Proven outcomes from deployments across manufacturing facilities worldwide.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                isInView={isInView}
              />
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
