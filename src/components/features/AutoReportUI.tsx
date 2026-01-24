import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Camera, 
  Sparkles,
  Download,
  Share2,
  ClipboardCheck
} from "lucide-react";

const AutoReportUI = () => {
  const [phase, setPhase] = useState<"generating" | "sections" | "complete">("generating");
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    if (phase === "generating") {
      const timer = setTimeout(() => setPhase("sections"), 2000);
      return () => clearTimeout(timer);
    }
    if (phase === "sections") {
      const interval = setInterval(() => {
        setVisibleSections(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            setTimeout(() => setPhase("complete"), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
    if (phase === "complete") {
      const timer = setTimeout(() => {
        setPhase("generating");
        setVisibleSections(0);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const reportSections = [
    { icon: Wrench, label: "Intervento eseguito", value: "Sostituzione valvola termica #V-127" },
    { icon: Clock, label: "Tempo operazione", value: "47 minuti" },
    { icon: Camera, label: "Documentazione", value: "12 foto, 2 video" },
    { icon: ClipboardCheck, label: "Checklist completata", value: "18/18 verifiche" }
  ];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      {/* Light frosted background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white" />
      
      {/* Animated background blobs */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 bg-emerald-300/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-5">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-slate-800 font-semibold text-sm">Report Automatico</h3>
            <p className="text-slate-500 text-xs">Generazione in corso...</p>
          </div>
        </motion.div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {phase === "generating" && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg flex items-center justify-center mb-4"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.2)",
                      "0 0 40px rgba(16, 185, 129, 0.4)",
                      "0 0 20px rgba(16, 185, 129, 0.2)"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-8 h-8 text-emerald-500" />
                  </motion.div>
                </motion.div>
                <p className="text-slate-600 text-sm font-medium">Aria sta analizzando l'intervento...</p>
                <div className="flex gap-1 mt-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {(phase === "sections" || phase === "complete") && (
              <motion.div
                key="sections"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col gap-3 overflow-hidden"
              >
                {/* Report preview card */}
                <motion.div 
                  className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg p-4 flex-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  {/* Report header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/50">
                    <div>
                      <h4 className="text-slate-800 font-semibold text-sm">Report #MNT-2024-0847</h4>
                      <p className="text-slate-500 text-xs">24 Gennaio 2026 • 14:32</p>
                    </div>
                    {phase === "complete" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </motion.div>
                    )}
                  </div>

                  {/* Report sections */}
                  <div className="space-y-2.5">
                    {reportSections.map((section, index) => (
                      <motion.div
                        key={section.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: index < visibleSections ? 1 : 0,
                          x: index < visibleSections ? 0 : -20
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/50 border border-white/30"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <section.icon className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-500 text-xs">{section.label}</p>
                          <p className="text-slate-800 text-sm font-medium truncate">{section.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action buttons */}
                {phase === "complete" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      Scarica PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-lg"
                    >
                      <Share2 className="w-5 h-5 text-slate-600" />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AutoReportUI;
