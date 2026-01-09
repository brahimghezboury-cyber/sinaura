import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Mic, Sparkles, User, AlertTriangle } from "lucide-react";

const SmartFaultDiagnosisUI = () => {
  const [phase, setPhase] = useState<"alert" | "analyzing" | "chat" | "steps">("alert");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("analyzing"), 1800);
    const timer2 = setTimeout(() => setPhase("chat"), 3200);
    const timer3 = setTimeout(() => setPhase("steps"), 5000);
    const timer4 = setTimeout(() => setPhase("alert"), 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [phase === "alert"]);

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col items-center justify-center rounded-2xl">
      <AnimatePresence mode="wait">
        {phase === "alert" && (
          <motion.div
            key="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-5 border-2 border-red-200"
            >
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </motion.div>
            <p className="text-red-600 font-semibold text-xl mb-2">Allarme Rilevato</p>
            <p className="text-slate-500 text-sm text-center">Errore FMO1201<br/>Termocoppia Camera 3</p>
          </motion.div>
        )}

        {phase === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative mb-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-4 border-cyan-200 border-t-cyan-500"
              />
              <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-cyan-500" />
            </div>
            <p className="text-cyan-600 font-medium text-lg">Aria Engine sta analizzando...</p>
          </motion.div>
        )}

        {(phase === "chat" || phase === "steps") && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-5 flex flex-col border border-white/10 shadow-2xl"
            style={{ height: "380px" }}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-white font-medium text-sm">Aria Engine</span>
              <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-end"
              >
                <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <User className="w-2.5 h-2.5 text-white/80" />
                    <span className="text-[10px] font-medium text-white/80">ME</span>
                  </div>
                  <p className="text-white text-xs">I have an error FMO1201</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] border border-white/10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    <span className="text-[10px] font-medium text-cyan-400">ARIA</span>
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">FMO1201</p>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    Communication issue between device and control system. Check wiring or interface.
                  </p>
                  
                  {phase === "steps" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 pt-2 border-t border-white/10"
                    >
                      <p className="text-white/90 text-[11px]">
                        <span className="text-cyan-400 font-medium">Step 1:</span>{" "}
                        <span className="text-white/70">Check interface wiring.</span>
                      </p>
                      <p className="text-white/90 text-[11px] mt-1">
                        <span className="text-cyan-400 font-medium">Step 2:</span>{" "}
                        <span className="text-white/70">Verify PLC connection.</span>
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 bg-white/10 rounded-full px-4 py-2 border border-white/10">
                <span className="text-white/40 text-xs">Type or press and hold...</span>
              </div>
              <button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Mic className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartFaultDiagnosisUI;
