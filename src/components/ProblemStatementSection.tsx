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

  // Card 1: 0–25% (fade in 0-8%, visible 8-18%, fade out 18-25%)
  const card1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const card1Y = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [60, 0, 0, -40]);

  // Card 2: 25–50% (fade in 25-33%, visible 33-43%, fade out 43-50%)
  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [60, 0, 0, -40]);

  // Card 3: 50–75% (fade in 50-58%, visible 58-68%, fade out 68-75%)
  const card3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
  const card3Scale = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0.92, 1, 1, 0.95]);

  // Card 4: 75–100% (fade in 75-83%, visible 83-100%)
  const card4Opacity = useTransform(scrollYProgress, [0.75, 0.83, 0.95], [0, 1, 1]);
  const card4Y = useTransform(scrollYProgress, [0.75, 0.83], [60, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">

        {/* Card 1: The Problem headline */}
        <motion.div
          style={{ opacity: card1Opacity, y: card1Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
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
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-2xl px-6">
            <div className="space-y-5">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-5">
                  <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                  <span className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 leading-tight">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 3: Problem cards grid */}
        <motion.div
          style={{ opacity: card3Opacity, scale: card3Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl px-6 w-full">
            {problems.map((problem) => (
              <div
                key={problem.number}
                className="bg-muted/60 rounded-3xl p-7 relative border border-border/50"
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
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-muted-foreground/40 tracking-tight">
              At least until now.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemStatementSection;
