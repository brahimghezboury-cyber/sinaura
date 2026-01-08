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
    { label: "Locate component" },
    { label: "Remove cover panel" },
    { label: "Replace fuse unit" },
    { label: "Test connection" },
  ];

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col rounded-2xl">
      {/* AR Viewfinder */}
      <div className="flex-1 relative bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
        {/* Corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-3 border-t-3 border-violet-500 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-r-3 border-t-3 border-violet-500 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l-3 border-b-3 border-violet-500 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-3 border-b-3 border-violet-500 rounded-br-lg" />
        
        {/* Target */}
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-8 border-2 border-dashed border-cyan-500 rounded-xl flex items-center justify-center"
        >
          <div className="bg-cyan-500/10 px-3 py-1.5 rounded-lg">
            <span className="text-cyan-600 text-xs font-medium">Target Component</span>
          </div>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            animate={{
              scale: index === currentStep ? 1.05 : 1,
            }}
            className={`p-2 rounded-xl text-center transition-colors ${
              index < currentStep ? "bg-emerald-100" :
              index === currentStep ? "bg-violet-100" :
              "bg-white"
            }`}
          >
            <div className={`w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center text-xs font-bold ${
              index < currentStep ? "bg-emerald-500 text-white" :
              index === currentStep ? "bg-violet-500 text-white" :
              "bg-slate-200 text-slate-500"
            }`}>
              {index < currentStep ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
            </div>
            <p className={`text-[10px] leading-tight ${
              index <= currentStep ? "text-slate-700" : "text-slate-400"
            }`}>{step.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ARStepByStepUI;
