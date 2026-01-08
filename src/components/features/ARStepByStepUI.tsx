import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Wrench, ZapOff, RotateCcw, Cable } from "lucide-react";

const ARStepByStepUI = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Power Off", icon: ZapOff, instruction: "Disconnect main power supply" },
    { label: "Open Panel", icon: Wrench, instruction: "Unscrew panel cover (4x bolts)" },
    { label: "Replace Cable", icon: Cable, instruction: "Swap damaged cable J12-A" },
    { label: "Test System", icon: RotateCcw, instruction: "Power on and verify" },
  ];

  // AR overlay positions for each step
  const overlayPositions = [
    { x: "75%", y: "25%", label: "Power Switch", highlight: true },
    { x: "30%", y: "40%", label: "Panel Cover", highlight: true },
    { x: "55%", y: "55%", label: "Cable J12-A", highlight: true },
    { x: "70%", y: "70%", label: "Test Port", highlight: true },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl p-5 flex flex-col rounded-2xl border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">AR Active</span>
        </div>
        <span className="text-white/50 text-xs">Step {currentStep + 1} of 4</span>
      </div>

      {/* AR View - Simulated Equipment View */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden mb-4 border border-white/5">
        {/* Simulated Industrial Equipment */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Equipment representation */}
          <div className="relative w-48 h-32 bg-slate-700/50 rounded-lg border border-white/10">
            {/* Control panel box */}
            <div className="absolute top-2 left-2 right-2 h-8 bg-slate-600/50 rounded border border-white/10 flex items-center px-2 gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            {/* Panel area */}
            <div className="absolute bottom-2 left-2 w-20 h-16 bg-slate-600/30 rounded border border-dashed border-white/20" />
            {/* Cable ports */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1">
              <div className="w-8 h-3 bg-slate-500/50 rounded-sm" />
              <div className="w-8 h-3 bg-cyan-500/30 rounded-sm border border-cyan-400/50" />
              <div className="w-8 h-3 bg-slate-500/50 rounded-sm" />
            </div>
          </div>
        </div>

        {/* AR Corners */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400 rounded-tl" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-cyan-400 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-cyan-400 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cyan-400 rounded-br" />

        {/* AR Overlay Markers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute"
            style={{ left: overlayPositions[currentStep].x, top: overlayPositions[currentStep].y }}
          >
            {/* Pulsing marker */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-4 h-4 rounded-full bg-cyan-400/30 absolute -translate-x-1/2 -translate-y-1/2"
            />
            <div className="w-3 h-3 rounded-full bg-cyan-400 absolute -translate-x-1/2 -translate-y-1/2 border-2 border-white" />
            
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-cyan-500/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-medium shadow-lg">
                {overlayPositions[currentStep].label}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Instruction Overlay */}
        <motion.div
          key={`instruction-${currentStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 left-3 right-3"
        >
          <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2">
              {(() => {
                const IconComponent = steps[currentStep].icon;
                return <IconComponent className="w-4 h-4 text-cyan-400" />;
              })()}
              <span className="text-white text-xs font-medium">{steps[currentStep].instruction}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Step Progress */}
      <div className="flex gap-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            animate={{ scale: index === currentStep ? 1.02 : 1 }}
            className={`flex-1 p-2 rounded-xl transition-all ${
              index < currentStep ? "bg-emerald-500/20 border border-emerald-500/30" :
              index === currentStep ? "bg-cyan-500/20 border border-cyan-500/30" :
              "bg-white/5 border border-white/10"
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                index < currentStep ? "bg-emerald-500 text-white" :
                index === currentStep ? "bg-cyan-500 text-white" :
                "bg-white/20 text-white/50"
              }`}>
                {index < currentStep ? <CheckCircle2 className="w-3 h-3" /> : index + 1}
              </div>
            </div>
            <p className={`text-[9px] text-center leading-tight ${
              index <= currentStep ? "text-white/90" : "text-white/40"
            }`}>{step.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ARStepByStepUI;
