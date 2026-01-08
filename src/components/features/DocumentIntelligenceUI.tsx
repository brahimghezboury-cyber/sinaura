import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, BookOpen, Sparkles } from "lucide-react";

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
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col items-center justify-center rounded-2xl">
      <div className="w-full max-w-xs">
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-20 h-24 bg-white rounded-xl shadow-sm border-2 border-dashed border-slate-300 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm">Drop manual to analyze</p>
          </motion.div>
        )}

        {phase === "parsing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-indigo-600 mb-4">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <FileText className="w-5 h-5" />
              </motion.div>
              <span className="text-sm font-medium">Parsing document...</span>
            </div>
            <div className="space-y-2">
              {["Extracting procedures", "Identifying components", "Generating steps"].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ delay: i * 0.4 }}
                  className="h-3 bg-indigo-200 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === "ready" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">Procedures Generated</span>
            </div>
            {procedures.map((proc, i) => (
              <motion.div
                key={proc}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
              >
                <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-sm flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="text-slate-700 text-sm">{proc}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DocumentIntelligenceUI;
