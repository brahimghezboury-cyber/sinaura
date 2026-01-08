import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, AlertTriangle, CheckCircle, Zap, Search } from "lucide-react";

const SmartFaultDiagnosisUI = () => {
  const [phase, setPhase] = useState<"scanning" | "analyzing" | "found">("scanning");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("analyzing"), 1500);
    const timer2 = setTimeout(() => setPhase("found"), 3000);
    const timer3 = setTimeout(() => setPhase("scanning"), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase === "scanning"]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col border border-white/10 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Brain className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span className="text-white/90 font-medium text-xs">Fault Diagnosis</span>
        <div className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium ${
          phase === "scanning" ? "bg-blue-500/20 text-blue-400" :
          phase === "analyzing" ? "bg-amber-500/20 text-amber-400" :
          "bg-emerald-500/20 text-emerald-400"
        }`}>
          {phase === "scanning" ? "Scanning" : phase === "analyzing" ? "Analyzing" : "Found"}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {phase === "scanning" && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 flex items-center justify-center"
              >
                <Search className="w-5 h-5 text-cyan-400" />
              </motion.div>
              <p className="text-white/50 text-xs">Scanning system logs...</p>
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {["Motor Controller", "PLC Connection", "Sensor Array"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                >
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                    className="w-2 h-2 rounded-full bg-amber-400"
                  />
                  <span className="text-white/70 text-xs">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {phase === "found" && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium text-xs">Root Cause Found</span>
                </div>
                <p className="text-white/70 text-[11px]">Motor driver overheating - thermal threshold exceeded</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs">
                <CheckCircle className="w-4 h-4" />
                <span>Analysis complete in 2.4s</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartFaultDiagnosisUI;
