import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const capabilities = ["Ask.", "Detect.", "Understand.", "Solve.", "Adapt.", "Verify.", "Fix."];

const DifferentiatorSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const card1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0.88, 1, 1, 1.05]);

  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [60, 0, 0, -40]);

  const card3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);

  const card4Opacity = useTransform(scrollYProgress, [0.75, 0.83, 0.95], [0, 1, 1]);
  const card4Y = useTransform(scrollYProgress, [0.75, 0.83], [50, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-foreground">

        {/* Subtle ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[180px]" />
        </div>

        {/* Card 1: Meet AriA */}
        <motion.div
          style={{ opacity: card1Opacity, scale: card1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-5xl px-6">
            <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full border border-white/10 bg-white/5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs tracking-[0.3em] uppercase text-white/50 font-semibold">
                Meet AriA™
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[110px] font-bold tracking-tight text-white leading-[1]">
              One solution.
            </h2>
            <h2 className="text-5xl md:text-7xl lg:text-[110px] font-bold tracking-tight leading-[1] mt-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300">
              Every operation.
            </h2>
          </div>
        </motion.div>

        {/* Card 2: Not ERP / MES / APS */}
        <motion.div
          style={{ opacity: card2Opacity, y: card2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center space-y-4 md:space-y-6">
            {["Not ERP.", "Not a MES.", "Not an APS."].map((text) => (
              <div key={text} className="relative inline-block w-full">
                <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-white/12 tracking-tight">
                  {text}
                </p>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[70%] h-px bg-white/15" />
              </div>
            ))}
            <div className="pt-8">
              <p className="text-lg text-white/25 tracking-wide">
                Those are just extensions.
              </p>
              <p className="text-2xl md:text-3xl font-bold mt-4 text-cyan-400/80">
                AriA™ is the intelligence layer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Capabilities */}
        <motion.div
          style={{ opacity: card3Opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 md:gap-3">
              {capabilities.map((cap, i) => (
                <span
                  key={cap}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                  style={{ opacity: 1 - i * 0.1 }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 4: Cross-platform */}
        <motion.div
          style={{ opacity: card4Opacity, y: card4Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-3xl px-6">
            <p className="text-sm tracking-[0.3em] uppercase mb-10 font-medium text-white/25">
              Cross-platform
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/50 leading-snug tracking-tight">
              See the solution.
              <br />
              <span className="text-white">Keep working.</span>
            </p>
            <p className="text-base text-cyan-400/60 mt-6 font-semibold">
              Hands-free. Unlimited power.
            </p>
            <p className="text-sm text-white/20 mt-3">
              Mobile · Tablet · AR Glasses
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DifferentiatorSection;
