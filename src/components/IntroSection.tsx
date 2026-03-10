import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const text1Opacity = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [50, 0, 0, -30]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [0.92, 1, 1, 1.05]);

  const text2Opacity = useTransform(scrollYProgress, [0.33, 0.43, 0.56, 0.66], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.33, 0.43, 0.56, 0.66], [50, 0, 0, -30]);

  const text3Opacity = useTransform(scrollYProgress, [0.66, 0.76, 0.90], [0, 1, 1]);
  const text3Scale = useTransform(scrollYProgress, [0.66, 0.76], [0.88, 1]);

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);

  return (
    <section id="overview" ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">

        <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/6 blur-[150px]" />
        </motion.div>

        {/* Text 1 */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y, scale: text1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-5xl px-6">
            <div className="inline-block mb-8 px-5 py-2 rounded-full border border-border/60 bg-muted/40">
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
                Overview
              </span>
            </div>
            <p className="display-medium leading-snug">
              <span className="text-muted-foreground">AriA™ seamlessly </span>
              <span className="text-foreground font-bold">blends </span>
              <span className="text-muted-foreground">AI intelligence with your </span>
              <span className="text-foreground font-bold">physical workspace</span>
              <span className="text-muted-foreground">.</span>
            </p>
          </div>
        </motion.div>

        {/* Text 2 */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-5xl px-6">
            <div className="flex flex-col items-center gap-5 md:gap-7">
              {["Predict", "Diagnose", "Resolve"].map((word, i) => (
                <div key={word} className="flex items-center gap-4 md:gap-6">
                  <div className="w-3 h-3 rounded-full bg-foreground/20" />
                  <span
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    style={{ color: `hsl(0 0% ${100 - i * 25}%)` }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mt-10 font-medium">
              Before issues even happen.
            </p>
          </div>
        </motion.div>

        {/* Text 3 */}
        <motion.div
          style={{ opacity: text3Opacity, scale: text3Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-4xl px-6">
            <p className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
              <span className="text-muted-foreground/40">The era of</span>
              <br />
              <span className="text-foreground">intelligent</span>
              <br />
              <span className="text-foreground">manufacturing</span>
              <br />
              <span className="text-muted-foreground/40">is here.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default IntroSection;
