import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text 1: 0–33%
  const text1Opacity = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [50, 0, 0, -30]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [0.9, 1, 1, 1.1]);

  // Text 2: 33–66%
  const text2Opacity = useTransform(scrollYProgress, [0.33, 0.43, 0.56, 0.66], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.33, 0.43, 0.56, 0.66], [50, 0, 0, -30]);

  // Text 3: 66–100%
  const text3Opacity = useTransform(scrollYProgress, [0.66, 0.76, 0.90], [0, 1, 1]);
  const text3Scale = useTransform(scrollYProgress, [0.66, 0.76], [0.85, 1]);

  // Background glow
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  return (
    <section id="overview" ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">

        {/* Ambient background glows */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-500/8 to-indigo-500/5 blur-[100px]" />
        </motion.div>

        {/* Text 1 */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y, scale: text1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-5xl px-6">
            <motion.div className="inline-block mb-8 px-5 py-2 rounded-full border border-border/60 bg-muted/40 backdrop-blur-sm">
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
                Overview
              </span>
            </motion.div>
            <p className="display-medium leading-snug">
              <span className="text-muted-foreground">AriA™ seamlessly </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground font-bold">
                blends{" "}
              </span>
              <span className="text-muted-foreground">AI intelligence with your </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
                physical workspace
              </span>
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
            <div className="flex flex-col items-center gap-6 md:gap-8">
              {[
                { word: "Predict", color: "from-emerald-400 to-teal-500" },
                { word: "Diagnose", color: "from-amber-400 to-orange-500" },
                { word: "Resolve", color: "from-cyan-400 to-blue-500" },
              ].map((item, i) => (
                <div key={item.word} className="flex items-center gap-4 md:gap-6">
                  <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}
                    style={{ boxShadow: `0 0 20px rgba(0,150,255,0.3)` }}
                  />
                  <span className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                    {item.word}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600">
                intelligent
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400">
                manufacturing
              </span>
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
