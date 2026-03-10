import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, ShieldAlert, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    number: "01",
    title: "Reactive Maintenance",
    description: "Emergency interventions, inefficiencies, and higher costs.",
    accent: "from-red-500 to-orange-500",
    glow: "rgba(239,68,68,0.15)",
  },
  {
    icon: Clock,
    number: "02",
    title: "24/7 Operational Pressure",
    description: "Constant personnel strain increasing error risk.",
    accent: "from-amber-500 to-yellow-500",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: ShieldAlert,
    number: "03",
    title: "Operational & Safety Risks",
    description: "Limited visibility exposing operators to unsafe situations.",
    accent: "from-orange-500 to-red-600",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    icon: TrendingDown,
    number: "04",
    title: "Costly Downtime",
    description: "Unexpected breakdowns halting production and supply chains.",
    accent: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.15)",
  },
];

const painPoints = [
  { text: "Huge gap between systems, people and knowledge", size: "text-3xl md:text-5xl" },
  { text: "High downtime costs", size: "text-2xl md:text-4xl" },
  { text: "Complex operations", size: "text-4xl md:text-6xl" },
  { text: "Limited control", size: "text-2xl md:text-3xl" },
  { text: "Loss of know-how", size: "text-3xl md:text-5xl" },
  { text: "Unplanned failures", size: "text-xl md:text-3xl" },
];

const ProblemStatementSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const card1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0.85, 1, 1, 1.1]);

  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [60, 0, 0, -40]);

  const card3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
  const card3Scale = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0.92, 1, 1, 0.95]);

  const card4Opacity = useTransform(scrollYProgress, [0.75, 0.83, 0.95], [0, 1, 1]);
  const card4Scale = useTransform(scrollYProgress, [0.75, 0.83], [0.8, 1]);

  // Background transitions
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.6, 0.6, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">

        {/* Dramatic red ambient glow */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-red-500/8 to-transparent blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-orange-500/6 to-transparent blur-[120px]" />
        </motion.div>

        {/* Card 1: Impact headline */}
        <motion.div
          style={{ opacity: card1Opacity, scale: card1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-5xl px-6">
            <div className="inline-flex items-center gap-3 mb-10 px-5 py-2.5 rounded-full bg-destructive/10 border border-destructive/20">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-xs tracking-[0.3em] uppercase text-destructive font-semibold">
                Critical Problem
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
              <span className="text-foreground/30">It all leads to the</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">
                same inevitable
              </span>
              <br />
              <span className="text-foreground/30">results.</span>
            </h2>
          </div>
        </motion.div>

        {/* Card 2: Pain points - word cloud style */}
        <motion.div
          style={{ opacity: card2Opacity, y: card2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-5xl px-6 w-full">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6">
              {painPoints.map((point, index) => (
                <span
                  key={index}
                  className={`${point.size} font-bold tracking-tight`}
                  style={{
                    color: `hsl(0 0% ${20 + index * 12}%)`,
                    textShadow: index < 2 ? '0 0 40px rgba(239,68,68,0.15)' : 'none',
                  }}
                >
                  {point.text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 3: Problem cards - dramatic grid */}
        <motion.div
          style={{ opacity: card3Opacity, scale: card3Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-4xl px-6 w-full">
            {problems.map((problem) => (
              <div
                key={problem.number}
                className="relative rounded-3xl p-6 md:p-7 border border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden group"
              >
                {/* Card glow */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-60"
                  style={{ background: `radial-gradient(circle, ${problem.glow}, transparent)` }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${problem.accent} flex items-center justify-center shadow-lg`}>
                      <problem.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-5xl font-black text-muted-foreground/10 select-none">
                      {problem.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 4: Dramatic transition */}
        <motion.div
          style={{ opacity: card4Opacity, scale: card4Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <p className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-muted-foreground/50 to-muted-foreground/10">
                At least
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/5">
                until now.
              </span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemStatementSection;
