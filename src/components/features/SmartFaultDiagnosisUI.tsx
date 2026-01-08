import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertTriangle, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";

const SmartFaultDiagnosisUI = () => {
  const [phase, setPhase] = useState<"alert" | "diagnosing" | "chat">("alert");
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("diagnosing"), 1500);
    const timer2 = setTimeout(() => setPhase("chat"), 3000);
    const timer3 = setTimeout(() => setChatStep(1), 4000);
    const timer4 = setTimeout(() => setChatStep(2), 5200);
    const timer5 = setTimeout(() => setChatStep(3), 6400);
    const timer6 = setTimeout(() => {
      setPhase("alert");
      setChatStep(0);
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [phase === "alert"]);

  const chatMessages = [
    { role: "aria", text: "Rilevato errore FMO1201 sulla termocoppia camera 3. Analisi in corso..." },
    { role: "aria", text: "Diagnosi: Connessione interrotta tra sensore e PLC. Ecco come risolvere:" },
    { role: "aria", text: "Step 1: Spegni l'alimentazione del quadro elettrico" },
    { role: "aria", text: "Step 2: Verifica il cablaggio del connettore J12" },
  ];

  return (
    <div className="w-full h-full bg-[#f5f5f7] p-6 flex flex-col rounded-2xl">
      {/* Alert Banner */}
      <AnimatePresence mode="wait">
        {phase === "alert" && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4"
            >
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </motion.div>
            <p className="text-red-600 font-semibold text-lg mb-1">Allarme Rilevato</p>
            <p className="text-slate-500 text-sm">Errore FMO1201 - Termocoppia Camera 3</p>
          </motion.div>
        )}

        {phase === "diagnosing" && (
          <motion.div
            key="diagnosing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-cyan-200 border-t-cyan-500 mb-4"
            />
            <div className="flex items-center gap-2 text-cyan-600">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Aria Engine sta analizzando...</span>
            </div>
          </motion.div>
        )}

        {phase === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-slate-800 font-semibold text-sm">Aria Engine</p>
                <p className="text-emerald-500 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Guida attiva
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-3 overflow-hidden">
              {chatMessages.slice(0, chatStep + 1).map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-100 flex-shrink-0 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-cyan-600" />
                  </div>
                  <div className={`p-3 rounded-2xl rounded-tl-sm max-w-[90%] ${
                    msg.text.startsWith("Step") 
                      ? "bg-emerald-50 border border-emerald-200" 
                      : "bg-white shadow-sm"
                  }`}>
                    <p className={`text-xs leading-relaxed ${
                      msg.text.startsWith("Step") ? "text-emerald-700" : "text-slate-700"
                    }`}>
                      {msg.text.startsWith("Step") && (
                        <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-500" />
                      )}
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input hint */}
            <div className="mt-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-xs">Chiedi ulteriori dettagli...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartFaultDiagnosisUI;
