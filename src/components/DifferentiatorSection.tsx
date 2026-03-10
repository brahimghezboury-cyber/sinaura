import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const capabilities = ["Ask.", "Detect.", "Understand.", "Solve.", "Adapt.", "Verify.", "Fix."];

const DifferentiatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-40 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Meet AriA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-6">Meet AriA™</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            One solution. Every operation.
          </h2>
        </motion.div>

        {/* Not ERP, Not MES, Not APS */}
        <div className="text-center mb-24 space-y-4">
          {["Not ERP.", "Not a MES.", "Not an APS."].map((text, index) => (
            <motion.p
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground/50"
            >
              {text}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-muted-foreground mt-6"
          >
            Those are just extensions.
          </motion.p>
        </div>

        {/* Capabilities list */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-x-10">
          {capabilities.map((cap, index) => (
            <motion.span
              key={cap}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight"
            >
              {cap}
            </motion.span>
          ))}
        </div>

        {/* Cross-platform */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-24"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">Cross-platform</p>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            See the solution. Keep working. From <span className="text-foreground font-semibold">mobile devices</span> to{" "}
            <span className="text-foreground font-semibold">AR glasses</span> — hands-free, more power.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
