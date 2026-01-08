import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Wrench, ZapOff, RotateCcw, Cable } from "lucide-react";
import controlPanelImage from "@/assets/control-panel-interior.png";

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

  // AR overlay positions for each step (relative to the control panel image)
  const overlayPositions = [
    { x: "85%", y: "15%", label: "Main Switch" },
    { x: "15%", y: "50%", label: "Panel Cover" },
    { x: "55%", y: "60%", label: "Cable J12-A" },
    { x: "75%", y: "45%", label: "Test Port" },
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

      {/* AR View with Real Image */}
      <div className="flex-1 relative rounded-2xl overflow-hidden mb-4 border border-white/5">
        {/* Real Industrial Image */}
        <img 
          src={controlPanelImage} 
          alt="Control Panel"
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay for better AR visibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* AR Corners */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400 rounded-tl" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-cyan-400 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-cyan-400 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cyan-400 rounded-br" />

        {/* Scanning line effect */}
        <motion.div
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
        />

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
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 rounded-full border-2 border-cyan-400 absolute -translate-x-1/2 -translate-y-1/2"
            />
            {/* Center dot */}
            <div className="w-4 h-4 rounded-full bg-cyan-400 absolute -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg shadow-cyan-500/50" />
            
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-cyan-500 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-white font-semibold shadow-lg shadow-cyan-500/30">
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
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-3">
              {(() => {
                const IconComponent = steps[currentStep].icon;
                return (
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-cyan-400" />
                  </div>
                );
              })()}
              <div>
                <p className="text-cyan-400 text-[10px] font-medium">STEP {currentStep + 1}</p>
                <p className="text-white text-xs font-medium">{steps[currentStep].instruction}</p>
              </div>
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
