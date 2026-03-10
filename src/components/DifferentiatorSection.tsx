import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  { word: "Ask.", color: "from-cyan-400 to-blue-500" },
  { word: "Detect.", color: "from-blue-400 to-indigo-500" },
  { word: "Understand.", color: "from-indigo-400 to-violet-500" },
  { word: "Solve.", color: "from-violet-400 to-purple-500" },
  { word: "Adapt.", color: "from-purple-400 to-pink-500" },
  { word: "Verify.", color: "from-pink-400 to-rose-500" },
  { word: "Fix.", color: "from-rose-400 to-red-500" },
];

const DifferentiatorSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const card1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0.85, 1, 1, 1.05]);

  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [60, 0, 0, -40]);

  const card3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);

  const card4Opacity = useTransform(scrollYProgress, [0.75, 0.83, 0.95], [0, 1, 1]);
  const card4Y = useTransform(scrollYProgress, [0.75, 0.83], [50, 0]);

  // Rotating hue for ambient light
  const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const filterValue = useTransform(hueRotate, (v) => `hue-rotate(${v}deg)`);

  return (
    <section ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

        {/* Animated ambient lights */}
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{ filter: filterValue }}
          >
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[180px]" />
            <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-600/6 blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[100px]" />
          </motion.div>
        </motion.div>

        {/* Card 1: Meet AriA - massive impact */}
        <motion.div
          style={{ opacity: card1Opacity, scale: card1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-5xl px-6">
            <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,200,255,0.6)]" />
              <span className="text-xs tracking-[0.3em] uppercase text-cyan-400/80 font-semibold">
                Meet AriA™
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[110px] font-bold tracking-tight text-white leading-[1]">
              One solution.
            </h2>
            <h2 className="text-5xl md:text-7xl lg:text-[110px] font-bold tracking-tight leading-[1] mt-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500"
                style={{ textShadow: '0 0 80px rgba(0,200,255,0.3)' }}
              >
                Every operation.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Card 2: Not ERP / MES / APS - strikethrough effect */}
        <motion.div
          style={{ opacity: card2Opacity, y: card2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center space-y-4 md:space-y-6">
            {[
              { text: "Not ERP.", delay: 0 },
              { text: "Not a MES.", delay: 0.1 },
              { text: "Not an APS.", delay: 0.2 },
            ].map((item) => (
              <div key={item.text} className="relative inline-block w-full">
                <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-white/15 tracking-tight">
                  {item.text}
                </p>
                {/* Strikethrough line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
              </div>
            ))}
            <div className="pt-8">
              <p className="text-lg md:text-xl text-white/30 tracking-wide font-medium">
                Those are just extensions.
              </p>
              <p className="text-2xl md:text-3xl font-bold mt-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  AriA™ is the intelligence layer.
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Capabilities - cascading gradient text */}
        <motion.div
          style={{ opacity: card3Opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 md:gap-3">
              {capabilities.map((cap) => (
                <span
                  key={cap.word}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${cap.color}`}
                >
                  {cap.word}
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
            <div className="relative inline-block mb-10">
              <div className="flex items-center gap-4 md:gap-6">
                {["📱", "💻", "🥽"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl md:text-4xl backdrop-blur-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/70 leading-snug tracking-tight">
              See the solution.
              <br />
              <span className="text-white">Keep working.</span>
            </p>
            <p className="text-lg md:text-xl mt-6 font-semibold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Hands-free. Unlimited power.
              </span>
            </p>
            <p className="text-sm text-white/30 mt-3">
              Mobile · Tablet · AR Glasses
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DifferentiatorSection;
