import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const textLines = [
    { text: "AriA™ seamlessly", highlight: false },
    { text: "blends", highlight: true },
    { text: "AI intelligence", highlight: false },
    { text: "with", highlight: false },
    { text: "your physical workspace.", highlight: false },
  ];

  const textLines2 = [
    { text: "So you can predict,", highlight: false },
    { text: "diagnose,", highlight: true },
    { text: "and", highlight: false },
    { text: "resolve issues", highlight: true },
    { text: "before they happen.", highlight: false },
  ];

  const textLines3 = [
    { text: "The era of", highlight: false },
    { text: "intelligent manufacturing", highlight: true },
    { text: "is here.", highlight: false },
  ];

  return (
    <section id="overview" ref={ref} className="py-24 md:py-40 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* First paragraph */}
        <div className="mb-16 md:mb-24">
          <p className="display-medium text-center leading-snug">
            {textLines.map((line, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0.3 }}
                animate={isInView ? { opacity: line.highlight ? 1 : 0.85 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={line.highlight ? "text-foreground" : "text-muted-foreground"}
              >
                {line.text}{" "}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Second paragraph */}
        <div className="mb-16 md:mb-24">
          <p className="display-medium text-center leading-snug">
            {textLines2.map((line, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0.3 }}
                animate={isInView ? { opacity: line.highlight ? 1 : 0.85 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.15 }}
                className={line.highlight ? "text-foreground" : "text-muted-foreground"}
              >
                {line.text}{" "}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Third paragraph */}
        <div>
          <p className="display-medium text-center leading-snug">
            {textLines3.map((line, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0.3 }}
                animate={isInView ? { opacity: line.highlight ? 1 : 0.85 } : {}}
                transition={{ duration: 0.8, delay: 1.6 + index * 0.15 }}
                className={line.highlight ? "text-foreground" : "text-muted-foreground"}
              >
                {line.text}{" "}
              </motion.span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
