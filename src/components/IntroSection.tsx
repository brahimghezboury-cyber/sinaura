import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Three text blocks that reveal as you scroll
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.35], [0, 1, 1, 0.3]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.65], [0, 1, 1, 0.3]);
  const text2Y = useTransform(scrollYProgress, [0.3, 0.45], [50, 0]);

  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.6, 0.75], [50, 0]);

  return (
    <section id="overview" ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="container mx-auto max-w-4xl px-6">

          {/* Text 1 */}
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute inset-0 flex items-center justify-center"
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
            className="absolute inset-0 flex items-center justify-center"
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
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="display-medium text-center leading-snug max-w-4xl px-6">
              <span className="text-muted-foreground">The era of </span>
              <span className="text-foreground">intelligent manufacturing </span>
              <span className="text-muted-foreground">is here.</span>
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;
