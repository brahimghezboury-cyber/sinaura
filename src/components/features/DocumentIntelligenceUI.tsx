import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, BookOpen, Search, Sparkles } from "lucide-react";

const DocumentIntelligenceUI = () => {
  const [phase, setPhase] = useState<"idle" | "parsing" | "ready">("idle");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("parsing"), 1000);
    const timer2 = setTimeout(() => setPhase("ready"), 3000);
    const timer3 = setTimeout(() => setPhase("idle"), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase === "idle"]);

  const procedures = [
    "Disconnect power supply",
    "Remove front access panel",
    "Replace thermal fuse #F12"
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col border border-white/10 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
        </div>
        <span className="text-white/90 font-medium text-xs">Doc Intelligence</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-12 h-14 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white/30" />
            </div>
            <p className="text-white/40 text-xs text-center">Drop manual to analyze</p>
          </motion.div>
        )}

        {phase === "parsing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-indigo-400">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Search className="w-4 h-4" />
              </motion.div>
              <span className="text-xs">Parsing document...</span>
            </div>
            <div className="space-y-1">
              {["Extracting procedures", "Identifying components", "Generating steps"].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ delay: i * 0.4 }}
                  className="h-2 bg-indigo-500/30 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === "ready" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium">Procedures Generated</span>
            </div>
            {procedures.map((proc, i) => (
              <motion.div
                key={proc}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                <span className="text-white/70 text-xs">{proc}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DocumentIntelligenceUI;
