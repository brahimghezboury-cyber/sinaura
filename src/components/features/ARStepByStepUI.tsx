import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, CheckCircle2, ArrowRight } from "lucide-react";

const ARStepByStepUI = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Locate component", completed: true },
    { label: "Remove cover panel", completed: true },
    { label: "Replace fuse unit", completed: false },
    { label: "Test connection", completed: false },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col border border-white/10 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
          <Eye className="w-3.5 h-3.5 text-violet-400" />
        </div>
        <span className="text-white/90 font-medium text-xs">AR Guidance</span>
        <span className="ml-auto text-white/40 text-[10px]">Step {currentStep + 1}/4</span>
      </div>

      {/* AR Viewfinder Mock */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/5 overflow-hidden mb-3">
        {/* Scanning corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-violet-400/60 rounded-tl" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-violet-400/60 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-violet-400/60 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-violet-400/60 rounded-br" />
        
        {/* Highlight box */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-4 border-2 border-dashed border-cyan-400/50 rounded-lg flex items-center justify-center"
        >
          <span className="text-cyan-400 text-[10px] bg-slate-900/80 px-2 py-1 rounded">Target Area</span>
        </motion.div>
      </div>

      {/* Steps List */}
      <div className="space-y-1.5">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            animate={{
              backgroundColor: index === currentStep ? "rgba(139, 92, 246, 0.15)" : "transparent",
              scale: index === currentStep ? 1.02 : 1
            }}
            className="flex items-center gap-2 p-2 rounded-lg"
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
              index < currentStep ? "bg-emerald-500 text-white" :
              index === currentStep ? "bg-violet-500 text-white" :
              "bg-white/10 text-white/40"
            }`}>
              {index < currentStep ? <CheckCircle2 className="w-3 h-3" /> : index + 1}
            </div>
            <span className={`text-xs ${index <= currentStep ? "text-white/90" : "text-white/40"}`}>
              {step.label}
            </span>
            {index === currentStep && (
              <ArrowRight className="w-3 h-3 text-violet-400 ml-auto" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ARStepByStepUI;
