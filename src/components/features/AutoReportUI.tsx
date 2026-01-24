import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  CheckCircle2,
  User,
  X,
  Mic,
  Camera,
  FileText,
  Image,
  Download,
  Share2,
  Clock,
  Wrench,
  ClipboardCheck
} from "lucide-react";

type Phase = 
  | "chat1" 
  | "chat2" 
  | "chat3" 
  | "chat4" 
  | "chat5"
  | "generating" 
  | "report";

const AutoReportUI = () => {
  const [phase, setPhase] = useState<Phase>("chat1");
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setPhase("chat2"), 3000));
    timers.push(setTimeout(() => setPhase("chat3"), 6000));
    timers.push(setTimeout(() => setPhase("chat4"), 9000));
    timers.push(setTimeout(() => setPhase("chat5"), 12000));
    timers.push(setTimeout(() => setPhase("generating"), 15000));
    timers.push(setTimeout(() => {
      setPhase("report");
      // Start showing sections progressively
      let sectionCount = 0;
      const sectionInterval = setInterval(() => {
        sectionCount++;
        setVisibleSections(sectionCount);
        if (sectionCount >= 4) clearInterval(sectionInterval);
      }, 300);
    }, 17500));
    timers.push(setTimeout(() => {
      setPhase("chat1");
      setVisibleSections(0);
    }, 24000));

    return () => timers.forEach(clearTimeout);
  }, [phase === "chat1"]);

  const ChatBubbleUser = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="flex justify-end"
    >
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%] shadow-lg shadow-blue-500/20">
        <div className="flex items-center gap-1.5 mb-1.5">
          <User className="w-3 h-3 text-white/80" />
          <span className="text-[10px] font-semibold text-white/80 tracking-wide">OPERATOR</span>
        </div>
        <p className="text-white text-sm leading-relaxed">{children}</p>
      </div>
    </motion.div>
  );

  const ChatBubblePhoto = ({ label }: { label: string }) => (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="flex justify-end"
    >
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg shadow-emerald-500/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Image className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">{label}</p>
          <p className="text-white/70 text-xs">Photo attached</p>
        </div>
      </div>
    </motion.div>
  );

  const ChatBubbleAria = ({ children, delay = 0.4 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300, delay }}
      className="flex justify-start"
    >
      <div className="bg-black/[0.06] backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-black/[0.08] shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-3 h-3 text-cyan-600" />
          </motion.div>
          <span className="text-[10px] font-semibold text-cyan-600 tracking-wide">ARIA ENGINE</span>
        </div>
        <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );

  const StatusCard = ({ 
    children, 
    borderColor = "border-black/10",
    icon,
    iconBg,
    title,
    subtitle
  }: { 
    children?: React.ReactNode;
    borderColor?: string;
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    subtitle?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`bg-white/60 backdrop-blur-2xl rounded-3xl p-6 border ${borderColor} shadow-xl w-full max-w-sm`}
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shadow-lg`}
        >
          {icon}
        </motion.div>
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-800 font-semibold text-base"
          >
            {title}
          </motion.p>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xs"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );

  const reportSections = [
    { icon: Wrench, label: "Intervento", value: "Manutenzione ordinaria trimestrale" },
    { icon: Clock, label: "Durata", value: "32 minuti" },
    { icon: Camera, label: "Documentazione", value: "4 foto allegate" },
    { icon: ClipboardCheck, label: "Checklist", value: "5/5 controlli superati" }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-200/80 via-slate-100 to-slate-200/80 rounded-2xl overflow-hidden relative">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/40" />
      
      {/* Subtle animated gradient */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-300/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-300/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        <AnimatePresence mode="wait">
          {/* Chat Phases */}
          {(phase === "chat1" || phase === "chat2" || phase === "chat3" || phase === "chat4" || phase === "chat5") && (
            <motion.div
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Messages Area */}
              <div className="flex-1 p-5 space-y-4 overflow-auto">
                {phase === "chat1" && (
                  <>
                    <ChatBubbleAria delay={0}>
                      <div className="flex items-center gap-2 text-blue-600 font-medium mb-2">
                        <Wrench className="w-4 h-4" />
                        <span>Manutenzione Programmata</span>
                      </div>
                      <p className="text-slate-600">Iniziamo la manutenzione ordinaria trimestrale della Linea 3.</p>
                      <p className="mt-2">
                        <span className="text-cyan-600 font-medium">Step 1:</span>{" "}
                        <span className="text-slate-600">Verifica il livello dell'olio idraulico e scatta una foto.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat2" && (
                  <>
                    <ChatBubblePhoto label="Livello olio OK" />
                    <ChatBubbleAria>
                      <p className="text-slate-600">Livello olio conforme. Registrato nel report.</p>
                      <p className="mt-2">
                        <span className="text-cyan-600 font-medium">Step 2:</span>{" "}
                        <span className="text-slate-600">Controlla lo stato del filtro aria e documenta.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat3" && (
                  <>
                    <ChatBubblePhoto label="Filtro aria" />
                    <ChatBubbleAria>
                      <p className="text-slate-600">Filtro in buone condizioni. Prossima sostituzione tra 60 giorni.</p>
                      <p className="mt-2">
                        <span className="text-cyan-600 font-medium">Step 3:</span>{" "}
                        <span className="text-slate-600">Verifica la pressione del circuito pneumatico (range: 5.5-6.5 bar).</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat4" && (
                  <>
                    <ChatBubbleUser>
                      Pressione a 6.2 bar, nella norma.
                    </ChatBubbleUser>
                    <ChatBubbleAria>
                      <p className="text-slate-600">Perfetto. Valore registrato.</p>
                      <p className="mt-2">
                        <span className="text-cyan-600 font-medium">Step 4:</span>{" "}
                        <span className="text-slate-600">Ispeziona i punti di lubrificazione e conferma ingrassaggio completato.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat5" && (
                  <>
                    <ChatBubbleUser>
                      Lubrificazione completata su tutti i punti.
                    </ChatBubbleUser>
                    <ChatBubbleAria>
                      <div className="flex items-center gap-2 text-emerald-600 font-medium mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Checklist Completata</span>
                      </div>
                      <p className="text-slate-600">Tutti i controlli superati. Genero il report automatico...</p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-2 text-slate-500 text-xs flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-3 h-3 rounded-full border border-slate-400 border-t-slate-600"
                        />
                        Compilazione dati...
                      </motion.p>
                    </ChatBubbleAria>
                  </>
                )}
              </div>

              {/* Input Bar */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-full px-5 py-3 border border-black/[0.08] shadow-sm">
                    <span className="text-slate-400 text-sm">Confirm or take photo...</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                  >
                    <Mic className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Generating Phase */}
          {phase === "generating" && (
            <motion.div
              key="generating"
              className="flex-1 flex items-center justify-center p-6"
            >
              <StatusCard
                borderColor="border-cyan-200"
                icon={
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <FileText className="w-6 h-6 text-cyan-500" />
                  </motion.div>
                }
                iconBg="bg-gradient-to-br from-cyan-100 to-cyan-200"
                title="Generating Report"
                subtitle="Compiling intervention data..."
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  {["Analyzing photos", "Compiling timeline", "Generating PDF"].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.3 + i * 0.4, duration: 0.5 }}
                      className="h-2 bg-cyan-200 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.3 + i * 0.4, duration: 0.8 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </StatusCard>
            </motion.div>
          )}

          {/* Report Phase */}
          {phase === "report" && (
            <motion.div
              key="report"
              className="flex-1 flex items-center justify-center p-6"
            >
              <StatusCard
                borderColor="border-emerald-200"
                icon={
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </motion.div>
                }
                iconBg="bg-gradient-to-br from-emerald-100 to-emerald-200"
                title="Report Generated"
                subtitle="MNT-2024-0847"
              >
                <div className="space-y-2 mb-4">
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
                        <p className="text-slate-500 text-[10px]">{section.label}</p>
                        <p className="text-slate-800 text-xs font-medium truncate">{section.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: visibleSections >= 4 ? 1 : 0, y: visibleSections >= 4 ? 0 : 10 }}
                  className="flex gap-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-lg"
                  >
                    <Share2 className="w-5 h-5 text-slate-600" />
                  </motion.button>
                </motion.div>
              </StatusCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AutoReportUI;
