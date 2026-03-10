import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const capabilities = ["Ask.", "Detect.", "Understand.", "Solve.", "Adapt.", "Verify.", "Fix."];

const DifferentiatorSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Card 1: 0–25%
  const card1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0.92, 1, 1, 1.05]);

  // Card 2: 25–50%
  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [60, 0, 0, -40]);

  // Card 3: 50–75%
  const card3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);

  // Card 4: 75–100%
  const card4Opacity = useTransform(scrollYProgress, [0.75, 0.83, 0.95], [0, 1, 1]);
  const card4Y = useTransform(scrollYProgress, [0.75, 0.83], [50, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-foreground">

        {/* Card 1: Meet AriA */}
        <motion.div
          style={{ opacity: card1Opacity, scale: card1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-4xl px-6">
            <p className="text-sm tracking-[0.3em] uppercase mb-8 font-medium text-white/40">
              Meet AriA™
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tight text-white leading-[1.05]">
              One solution.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Every operation.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Card 2: Not ERP / MES / APS */}
        <motion.div
          style={{ opacity: card2Opacity, y: card2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center space-y-6">
            {["Not ERP.", "Not a MES.", "Not an APS."].map((text) => (
              <p
                key={text}
                className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white/20 tracking-tight"
              >
                {text}
              </p>
            ))}
            <p className="text-lg text-white/40 mt-8 tracking-wide">
              Those are just extensions.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Capabilities */}
        <motion.div
          style={{ opacity: card3Opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:gap-x-8 max-w-4xl">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white"
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
            <p className="text-sm tracking-[0.3em] uppercase mb-8 font-medium text-white/30">
              Cross-platform
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/60 leading-relaxed font-medium tracking-tight">
              See the solution. Keep working.
              <br />
              From <span className="text-white font-semibold">mobile devices</span> to{" "}
              <span className="text-white font-semibold">AR glasses</span>.
            </p>
            <p className="text-lg text-cyan-400/70 mt-6 font-medium">
              Hands-free. More power.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DifferentiatorSection;
