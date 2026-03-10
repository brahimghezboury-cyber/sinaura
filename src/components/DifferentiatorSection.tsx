import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  { word: "Ask.", strike: false },
  { word: "Detect.", strike: true },
  { word: "Understand.", strike: true },
  { word: "Solve.", strike: true },
  { word: "Adapt.", strike: true },
  { word: "Verify.", strike: true },
  { word: "Fix.", strike: false },
];

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
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)" }}
      >
        {/* Subtle warm ambient glow - matching pitch deck */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-amber-900/8 blur-[150px]" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-white/3 blur-[100px]" />
        </div>

        {/* Card 1: Meet AriA™ with phone mockup */}
        <motion.div
          style={{ opacity: card1Opacity, scale: card1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="flex items-center gap-8 md:gap-16 max-w-6xl px-6 w-full">
            {/* Left: text */}
            <div className="flex-1">
              {/* AriA logo badge */}
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-8 backdrop-blur-sm">
                <span className="text-white/90 text-[10px] font-bold leading-tight text-center">
                  Ar<br />iA
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-4">
                Meet AriA™
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/40 font-medium tracking-tight">
                One solution. Every operation.
              </p>
            </div>

            {/* Right: Phone mockup */}
            <div className="flex-shrink-0 hidden md:block">
              <div
                className="relative w-[260px] h-[520px] rounded-[40px] border-[3px] border-white/15 overflow-hidden shadow-2xl"
                style={{
                  background: "linear-gradient(180deg, rgba(100,160,220,0.6) 0%, rgba(180,200,230,0.4) 50%, rgba(200,210,230,0.3) 100%)",
                  transform: "perspective(800px) rotateY(-8deg) rotateX(2deg)",
                }}
              >
                {/* Frosted glass overlay */}
                <div className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(30px)",
                  }}
                />

                {/* Phone content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-5 pb-8">
                  {/* Chat bubble */}
                  <div className="bg-white/15 backdrop-blur-xl rounded-2xl px-4 py-3 mb-4 border border-white/10 self-end max-w-[85%]">
                    <p className="text-white/90 text-[11px] leading-relaxed italic">
                      "Can you tell me the cooling time, and if it is correct for today's production?"
                    </p>
                  </div>

                  {/* Bottom text */}
                  <div className="mt-auto">
                    <p className="text-white text-2xl font-bold leading-tight">
                      Just talk to it like<br />a colleague.
                    </p>
                  </div>

                  {/* Input bar */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-8 rounded-full bg-white/10 border border-white/10 px-3 flex items-center">
                      <span className="text-white/30 text-[10px]">Type, press and talk...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Not ERP / MES / APS - exact pitch deck hierarchy */}
        <motion.div
          style={{ opacity: card2Opacity, y: card2Y }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/30 tracking-tight mb-2">
              Not an ERP.
            </p>
            <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/50 tracking-tight mb-2">
              Not a MES.
            </p>
            <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-white/35 tracking-tight mb-10">
              Not an APS.
            </p>
            <p className="text-xl md:text-2xl text-white/30 font-medium tracking-wide">
              Those are just extensions.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Capabilities with strikethrough + arrow */}
        <motion.div
          style={{ opacity: card3Opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="flex items-center gap-6 md:gap-10">
            {/* Left: Curved arrow with label */}
            <div className="hidden md:flex flex-col items-center relative">
              {/* "By using AriA™" label - rotated */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                <span className="text-white/25 text-sm font-medium tracking-wider">
                  By using AriA™
                </span>
              </div>
              {/* Arrow SVG */}
              <svg width="40" height="320" viewBox="0 0 40 320" fill="none" className="ml-8">
                <path
                  d="M20 10 C 10 60, 8 100, 12 160 C 16 220, 10 260, 20 310"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* Arrow head */}
                <path
                  d="M14 300 L20 315 L26 300"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>

            {/* Right: Capability words */}
            <div className="flex flex-col items-start gap-1 md:gap-1.5">
              {capabilities.map((cap) => (
                <div key={cap.word} className="relative">
                  <span
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
                      !cap.strike ? "text-white/80" : "text-white/30"
                    }`}
                  >
                    {cap.word}
                  </span>
                  {cap.strike && (
                    <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/20 -translate-y-[1px]" />
                  )}
                </div>
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
            <p className="text-base text-white/30 mt-6 font-medium">
              Hands-free. Unlimited power.
            </p>
            <p className="text-sm text-white/15 mt-3">
              Mobile · Tablet · AR Glasses
            </p>
          </div>
        </motion.div>

        {/* Bottom right copyright */}
        <div className="absolute bottom-4 right-6 text-[10px] text-white/15 font-medium">
          © 2026 SINAURA™
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
