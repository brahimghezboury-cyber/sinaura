import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Camera, 
  Sparkles,
  Download,
  Share2,
  ClipboardCheck,
  Mic,
  X,
  Image,
  AlertTriangle
} from "lucide-react";

type Message = {
  id: number;
  type: "user" | "aria" | "photo" | "step" | "alert";
  content: string;
  subContent?: string;
  stepNumber?: number;
  photoCount?: number;
};

const AutoReportUI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [reportPhase, setReportPhase] = useState<"generating" | "complete">("generating");
  const [visibleSections, setVisibleSections] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const conversationFlow: Message[] = [
    { id: 1, type: "alert", content: "Manutenzione completata", subContent: "Valvola termica #V-127" },
    { id: 2, type: "aria", content: "Ottimo! Procediamo con la documentazione. Scatta una foto del componente sostituito." },
    { id: 3, type: "photo", content: "Foto componente", photoCount: 1 },
    { id: 4, type: "aria", content: "Perfetto. Ora verifichiamo i passaggi eseguiti:" },
    { id: 5, type: "step", content: "Disconnessione alimentazione", stepNumber: 1 },
    { id: 6, type: "user", content: "Confermato ✓" },
    { id: 7, type: "step", content: "Rimozione pannello accesso", stepNumber: 2 },
    { id: 8, type: "user", content: "Confermato ✓" },
    { id: 9, type: "step", content: "Sostituzione valvola #V-127", stepNumber: 3 },
    { id: 10, type: "photo", content: "Foto installazione", photoCount: 2 },
    { id: 11, type: "aria", content: "Scatta una foto del collegamento finale per la verifica qualità." },
    { id: 12, type: "photo", content: "Foto verifica", photoCount: 3 },
    { id: 13, type: "aria", content: "Documentazione completa. Genero il report automatico..." },
  ];

  useEffect(() => {
    if (showReport) return;
    
    if (currentStep < conversationFlow.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, conversationFlow[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, currentStep === 0 ? 500 : 800);
      return () => clearTimeout(timer);
    } else if (currentStep === conversationFlow.length) {
      const timer = setTimeout(() => {
        setShowReport(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentStep, showReport]);

  useEffect(() => {
    if (showReport && reportPhase === "generating") {
      const timer = setTimeout(() => setReportPhase("complete"), 1800);
      return () => clearTimeout(timer);
    }
    if (reportPhase === "complete") {
      const interval = setInterval(() => {
        setVisibleSections(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showReport, reportPhase]);

  // Reset cycle
  useEffect(() => {
    if (visibleSections >= 4) {
      const timer = setTimeout(() => {
        setMessages([]);
        setCurrentStep(0);
        setShowReport(false);
        setReportPhase("generating");
        setVisibleSections(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visibleSections]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const reportSections = [
    { icon: Wrench, label: "Intervento", value: "Sostituzione valvola #V-127" },
    { icon: Clock, label: "Durata", value: "47 minuti" },
    { icon: Camera, label: "Foto", value: "3 immagini allegate" },
    { icon: ClipboardCheck, label: "Checklist", value: "3/3 verifiche completate" }
  ];

  const ChatBubbleAria = ({ content }: { content: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex gap-2 items-start"
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="bg-black/[0.06] backdrop-blur-sm rounded-2xl rounded-tl-md px-3 py-2 max-w-[85%] border border-white/30">
        <p className="text-slate-700 text-xs leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );

  const ChatBubbleUser = ({ content }: { content: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex justify-end"
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl rounded-tr-md px-3 py-2 max-w-[75%] shadow-md">
        <p className="text-white text-xs font-medium">{content}</p>
      </div>
    </motion.div>
  );

  const PhotoBubble = ({ content, count }: { content: string; count: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex justify-end"
    >
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl rounded-tr-md px-3 py-2 shadow-md flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <Image className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white text-xs font-medium">{content}</p>
          <p className="text-white/70 text-[10px]">Foto #{count}</p>
        </div>
      </div>
    </motion.div>
  );

  const StepBubble = ({ content, stepNumber }: { content: string; stepNumber: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex gap-2 items-start"
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-emerald-200/50 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] flex items-center justify-center font-bold">
          {stepNumber}
        </span>
        <p className="text-slate-700 text-xs">{content}</p>
      </div>
    </motion.div>
  );

  const AlertBubble = ({ content, subContent }: { content: string; subContent?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex justify-center"
    >
      <div className="bg-emerald-100/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-emerald-200/50 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        <div>
          <p className="text-emerald-700 text-xs font-semibold">{content}</p>
          {subContent && <p className="text-emerald-600/70 text-[10px]">{subContent}</p>}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      {/* Light frosted background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white" />
      
      {/* Animated background blobs */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 bg-emerald-300/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <AnimatePresence mode="wait">
          {!showReport ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col p-4"
            >
              {/* Chat messages */}
              <div 
                ref={chatRef}
                className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-hide"
                style={{ scrollbarWidth: 'none' }}
              >
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.type === "aria" && <ChatBubbleAria content={msg.content} />}
                    {msg.type === "user" && <ChatBubbleUser content={msg.content} />}
                    {msg.type === "photo" && <PhotoBubble content={msg.content} count={msg.photoCount || 1} />}
                    {msg.type === "step" && <StepBubble content={msg.content} stepNumber={msg.stepNumber || 1} />}
                    {msg.type === "alert" && <AlertBubble content={msg.content} subContent={msg.subContent} />}
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200/50">
                <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/40">
                  <span className="text-slate-400 text-xs">Conferma o scatta foto...</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg"
                >
                  <Camera className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg"
                >
                  <Mic className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col p-4"
            >
              {reportPhase === "generating" ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg flex items-center justify-center mb-4"
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
                      <FileText className="w-7 h-7 text-emerald-500" />
                    </motion.div>
                  </motion.div>
                  <p className="text-slate-600 text-sm font-medium">Generazione report...</p>
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
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {/* Report card */}
                  <motion.div 
                    className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg p-4 flex-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {/* Report header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/50">
                      <div>
                        <h4 className="text-slate-800 font-semibold text-sm">Report #MNT-2024-0847</h4>
                        <p className="text-slate-500 text-[10px]">24 Gen 2026 • 14:32</p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </motion.div>
                    </div>

                    {/* Report sections */}
                    <div className="space-y-2">
                      {reportSections.map((section, index) => (
                        <motion.div
                          key={section.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: index < visibleSections ? 1 : 0,
                            x: index < visibleSections ? 0 : -20
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-white/50 border border-white/30"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                            <section.icon className="w-3.5 h-3.5 text-slate-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-500 text-[10px]">{section.label}</p>
                            <p className="text-slate-800 text-xs font-medium truncate">{section.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: visibleSections >= 4 ? 1 : 0, y: visibleSections >= 4 ? 0 : 10 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-2 mt-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-medium shadow-lg"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Scarica PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-lg"
                    >
                      <Share2 className="w-4 h-4 text-slate-600" />
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AutoReportUI;
