import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text 1: 0–33% (fade in 0-10%, visible 10-23%, fade out 23-33%)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.10, 0.23, 0.33], [50, 0, 0, -30]);

  // Text 2: 33–66%
  const text2Opacity = useTransform(scrollYProgress, [0.33, 0.43, 0.56, 0.66], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.33, 0.43, 0.56, 0.66], [50, 0, 0, -30]);

  // Text 3: 66–100%
  const text3Opacity = useTransform(scrollYProgress, [0.66, 0.76, 0.90], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.66, 0.76], [50, 0]);

  return (
    <section id="overview" ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">

        {/* Text 1 */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <p className="display-medium text-center leading-snug max-w-4xl px-6">
            <span className="text-muted-foreground">AriA™ seamlessly </span>
            <span className="text-foreground">blends </span>
            <span className="text-muted-foreground">AI intelligence with your physical workspace.</span>
          </p>
        </motion.div>

        {/* Text 2 */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <p className="display-medium text-center leading-snug max-w-4xl px-6">
            <span className="text-muted-foreground">So you can predict, </span>
            <span className="text-foreground">diagnose, </span>
            <span className="text-muted-foreground">and </span>
            <span className="text-foreground">resolve issues </span>
            <span className="text-muted-foreground">before they happen.</span>
          </p>
        </motion.div>

        {/* Text 3 */}
        <motion.div
          style={{ opacity: text3Opacity, y: text3Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <p className="display-medium text-center leading-snug max-w-4xl px-6">
            <span className="text-muted-foreground">The era of </span>
            <span className="text-foreground">intelligent manufacturing </span>
            <span className="text-muted-foreground">is here.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default IntroSection;
