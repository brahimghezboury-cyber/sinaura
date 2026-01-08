import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Mic, Sparkles, User } from "lucide-react";

const SmartFaultDiagnosisUI = () => {
  const [phase, setPhase] = useState<"typing" | "response" | "steps">("typing");
  const [showStep, setShowStep] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("response"), 1500);
    const timer2 = setTimeout(() => setShowStep(true), 3000);
    const timer3 = setTimeout(() => {
      setPhase("typing");
      setShowStep(false);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase === "typing"]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col rounded-2xl border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <span className="text-white font-medium text-sm">Aria Engine</span>
        <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <X className="w-3.5 h-3.5 text-white/70" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {/* User Message */}
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

        {/* Aria Response */}
        <AnimatePresence>
          {(phase === "response" || phase === "steps") && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-white/10">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  <span className="text-[10px] font-medium text-cyan-400">ARIA</span>
                </div>
                <p className="text-white font-semibold text-sm mb-2">FMO1201</p>
                <p className="text-white/70 text-xs leading-relaxed mb-3">
                  The FMO1201 error indicates a communication issue between the device and the control system. This could be due to faulty wiring or a malfunctioning interface.
                </p>
                
                {showStep && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-white/90 text-xs">
                      <span className="text-cyan-400 font-medium">Fase 1:</span>
                      <br />
                      <span className="text-white/70">Check the interface wiring connections...</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        {phase === "typing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                <span className="text-[10px] font-medium text-cyan-400">ARIA</span>
              </div>
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-white/50"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-white/50"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-white/50"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/10">
          <span className="text-white/40 text-xs">Type or press and hold...</span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
        >
          <Mic className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default SmartFaultDiagnosisUI;
