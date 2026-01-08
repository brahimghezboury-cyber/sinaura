import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";

const SmartDiagnosticsUI = () => {
  const [phase, setPhase] = useState<"analyzing" | "found" | "steps">("analyzing");
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("found"), 2000);
    const timer2 = setTimeout(() => setPhase("steps"), 3500);
    const timer3 = setTimeout(() => setCurrentStep(1), 4500);
    const timer4 = setTimeout(() => setCurrentStep(2), 5500);
    const timer5 = setTimeout(() => {
      setPhase("analyzing");
      setCurrentStep(0);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [phase === "analyzing"]);

  const steps = [
    "Check power supply connection",
    "Verify communication cable",
    "Reset controller module"
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-white font-medium text-sm">Smart Diagnostics</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          phase === "analyzing" ? "bg-blue-500/20 text-blue-400" :
          phase === "found" ? "bg-amber-500/20 text-amber-400" :
          "bg-emerald-500/20 text-emerald-400"
        }`}>
          {phase === "analyzing" ? "Analyzing..." : phase === "found" ? "Issue Found" : "Solution Ready"}
        </div>
      </div>

      {/* Error Display */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">Error Code: PLC-4521</p>
            <p className="text-white/50 text-xs">Motor Controller Fault</p>
          </div>
        </div>
      </div>

      {/* Analysis Animation */}
      <AnimatePresence mode="wait">
        {phase === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-cyan-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 w-16 h-16 rounded-full border-t-2 border-cyan-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-white/60 text-sm">AI analyzing error patterns...</p>
            </div>
          </motion.div>
        )}

        {phase === "found" && (
          <motion.div
            key="found"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 w-full">
              <p className="text-amber-400 font-medium text-sm mb-2">Root Cause Identified</p>
              <p className="text-white/70 text-xs">Communication timeout between PLC and motor driver unit. Most likely caused by faulty wiring or interference.</p>
            </div>
          </motion.div>
        )}

        {phase === "steps" && (
          <motion.div
            key="steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <p className="text-white/60 text-xs mb-3">Repair Steps:</p>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: 0 
                  }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    index < currentStep ? "bg-emerald-500/10 border border-emerald-500/20" :
                    index === currentStep ? "bg-white/5 border border-white/10" :
                    "bg-transparent"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    index < currentStep ? "bg-emerald-500 text-white" :
                    index === currentStep ? "bg-cyan-500 text-white" :
                    "bg-white/10 text-white/40"
                  }`}>
                    {index < currentStep ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-sm ${index <= currentStep ? "text-white" : "text-white/40"}`}>{step}</span>
                  {index === currentStep && (
                    <ChevronRight className="w-4 h-4 text-cyan-400 ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartDiagnosticsUI;
