import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, ShieldAlert, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    number: "01",
    title: "Reactive Maintenance",
    description:
      "Maintenance triggered after failures, leading to emergency interventions, inefficiencies, and higher costs.",
  },
  {
    icon: Clock,
    number: "02",
    title: "24/7 Operational Pressure",
    description:
      "Continuous operation requiring constant skilled personnel availability, increasing strain and error risk.",
  },
  {
    icon: ShieldAlert,
    number: "03",
    title: "Operational & Safety Risks",
    description:
      "Limited machine visibility exposes operators to unsafe situations and increases incident risk.",
  },
  {
    icon: TrendingDown,
    number: "04",
    title: "Costly Downtime",
    description:
      "Unexpected breakdowns halt production, disrupt supply chains, and generate reputational damage.",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll-based opacity transforms for each "card"
  const card1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 1]);
  const card1Y = useTransform(scrollYProgress, [0, 0.15], [80, 0]);

  const card2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 1]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.35], [80, 0]);

  const card3Opacity = useTransform(scrollYProgress, [0.45, 0.6, 0.7], [0, 1, 1]);
  const card3Scale = useTransform(scrollYProgress, [0.45, 0.6], [0.9, 1]);

  const card4Opacity = useTransform(scrollYProgress, [0.7, 0.85, 0.95], [0, 1, 1]);
  const card4Y = useTransform(scrollYProgress, [0.7, 0.85], [60, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Card 1: The Problem headline */}
          <motion.div
            style={{ opacity: card1Opacity, y: card1Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center max-w-4xl px-6">
              <p className="text-sm text-muted-foreground tracking-[0.3em] uppercase mb-8 font-medium">
                Problem Statement
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                It all leads to the{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                  same inevitable
                </span>{" "}
                results.
              </h2>
            </div>
          </motion.div>

          {/* Card 2: Pain points */}
          <motion.div
            style={{ opacity: card2Opacity, y: card2Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-2xl px-6">
              <div className="space-y-5">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-5 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <span className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 leading-tight">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Problem cards grid */}
          <motion.div
            style={{ opacity: card3Opacity, scale: card3Scale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl px-6 w-full">
              {problems.map((problem) => (
                <div
                  key={problem.number}
                  className="bg-muted/60 rounded-3xl p-7 relative group hover:bg-muted transition-colors border border-border/50"
                >
                  <span className="text-5xl font-bold text-muted-foreground/15 absolute top-5 right-6 select-none">
                    {problem.number}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
                    <problem.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Transition */}
          <motion.div
            style={{ opacity: card4Opacity, y: card4Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-muted-foreground/40 tracking-tight">
                At least until now.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemStatementSection;
