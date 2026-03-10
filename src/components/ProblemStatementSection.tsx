import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, ShieldAlert, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    number: "01",
    title: "Reactive Maintenance",
    description:
      "Maintenance activities are often triggered after failures, leading to emergency interventions, inefficiencies, material waste and higher operational costs.",
  },
  {
    icon: Clock,
    number: "02",
    title: "24/7 Operational Pressure",
    description:
      "Plants must operate continuously, requiring constant availability of skilled personnel and increasing workforce strain, costs, and risk of errors under stress.",
  },
  {
    icon: ShieldAlert,
    number: "03",
    title: "Operational & Safety Risks",
    description:
      "Limited visibility into machine conditions exposes operators to unsafe situations and increases the risk of incidents on production lines.",
  },
  {
    icon: TrendingDown,
    number: "04",
    title: "Costly Downtime & Inefficiencies",
    description:
      "Unexpected breakdowns halt production, disrupt supply chains, and generate losses due to scrap, rework, and missed delivery targets.",
  },
];

const painPoints = [
  "Huge gap between systems, people and knowledge.",
  "High downtime costs and inefficiency.",
  "Complex operations.",
  "Limited control.",
  "Loss of know-how.",
  "Unplanned equipment failures.",
];

const ProblemStatementSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">Problem Statement</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl mx-auto">
            It all leads to the same inevitable results.
          </h2>
        </motion.div>

        {/* Pain points list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <ul className="space-y-4">
            {painPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                className="text-lg md:text-xl text-muted-foreground flex items-center gap-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* 4 Problem Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="bg-muted/50 rounded-3xl p-8 relative group hover:bg-muted transition-colors"
            >
              <span className="text-5xl font-bold text-muted-foreground/20 absolute top-6 right-6">
                {problem.number}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-24"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground/60">
            At least until now.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatementSection;
