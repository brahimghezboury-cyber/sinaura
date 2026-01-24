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
  ClipboardCheck,
  Thermometer,
  Gauge,
  Droplets,
  Zap,
  AlertTriangle,
  Settings,
  RotateCcw
} from "lucide-react";

type Phase = 
  | "chat1" 
  | "chat2" 
  | "chat3" 
  | "chat4" 
  | "chat5"
  | "chat6"
  | "chat7"
  | "generating" 
  | "report";

const AutoReportUI = () => {
  const [phase, setPhase] = useState<Phase>("chat1");
  const [visibleSections, setVisibleSections] = useState(0);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setPhase("chat2"), 2400));
    timers.push(setTimeout(() => setPhase("chat3"), 4800));
    timers.push(setTimeout(() => setPhase("chat4"), 7200));
    timers.push(setTimeout(() => setPhase("chat5"), 9600));
    timers.push(setTimeout(() => setPhase("chat6"), 12000));
    timers.push(setTimeout(() => setPhase("chat7"), 14400));
    timers.push(setTimeout(() => setPhase("generating"), 17000));
    timers.push(setTimeout(() => {
      setPhase("report");
      let sectionCount = 0;
      const sectionInterval = setInterval(() => {
        sectionCount++;
        setVisibleSections(sectionCount);
        if (sectionCount >= 5) clearInterval(sectionInterval);
      }, 200);
    }, 19500));
    timers.push(setTimeout(() => setShowPdf(true), 22500));
    timers.push(setTimeout(() => {
      setPhase("chat1");
      setVisibleSections(0);
      setShowPdf(false);
    }, 28000));

    return () => timers.forEach(clearTimeout);
  }, [phase === "chat1"]);

  const ChatBubbleUser = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="flex justify-end"
    >
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] shadow-lg shadow-blue-500/20">
        <div className="flex items-center gap-1.5 mb-1">
          <User className="w-2.5 h-2.5 text-white/80" />
          <span className="text-[9px] font-semibold text-white/80 tracking-wide">TECH</span>
        </div>
        <p className="text-white text-xs leading-relaxed">{children}</p>
      </div>
    </motion.div>
  );

  const ChatBubblePhoto = ({ label, icon: Icon }: { label: string; icon?: React.ComponentType<{ className?: string }> }) => (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="flex justify-end"
    >
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl rounded-tr-sm px-3 py-2 shadow-lg shadow-emerald-500/20 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          {Icon ? <Icon className="w-4 h-4 text-white" /> : <Image className="w-4 h-4 text-white" />}
        </div>
        <div>
          <p className="text-white text-xs font-medium">{label}</p>
          <p className="text-white/70 text-[10px]">Photo ✓</p>
        </div>
      </div>
    </motion.div>
  );

  const ChatBubbleWarning = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.4 }}
      className="flex justify-start"
    >
      <div className="bg-amber-50 backdrop-blur-sm rounded-2xl rounded-tl-sm px-3 py-2.5 max-w-[85%] border border-amber-200 shadow-sm">
        <div className="flex items-center gap-1.5 mb-1.5">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span className="text-[9px] font-semibold text-amber-600 tracking-wide">ATTENTION</span>
        </div>
        <div className="text-amber-800 text-xs leading-relaxed">{children}</div>
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
      <div className="bg-black/[0.06] backdrop-blur-sm rounded-2xl rounded-tl-sm px-3 py-2.5 max-w-[85%] border border-black/[0.08] shadow-sm">
        <div className="flex items-center gap-1.5 mb-1.5">
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-2.5 h-2.5 text-cyan-600" />
          </motion.div>
          <span className="text-[9px] font-semibold text-cyan-600 tracking-wide">ARIA</span>
        </div>
        <div className="text-slate-700 text-xs leading-relaxed">{children}</div>
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
      className={`bg-white/60 backdrop-blur-2xl rounded-3xl p-5 border ${borderColor} shadow-xl w-full max-w-sm`}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}
        >
          {icon}
        </motion.div>
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-800 font-semibold text-sm"
          >
            {title}
          </motion.p>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-[10px]"
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
    { icon: Wrench, label: "Procedure", value: "Quarterly CNC Maintenance" },
    { icon: Clock, label: "Duration", value: "34 min • 7 checkpoints" },
    { icon: Camera, label: "Evidence", value: "6 photos attached" },
    { icon: AlertTriangle, label: "Findings", value: "1 warning logged" },
    { icon: ClipboardCheck, label: "Result", value: "Passed with notes" }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-200/80 via-slate-100 to-slate-200/80 rounded-2xl overflow-hidden relative">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/40" />
      
      {/* Subtle animated gradient */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-300/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-300/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        <AnimatePresence mode="wait">
          {/* Chat Phases */}
          {(phase === "chat1" || phase === "chat2" || phase === "chat3" || phase === "chat4" || phase === "chat5" || phase === "chat6" || phase === "chat7") && (
            <motion.div
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Messages Area */}
              <div className="flex-1 p-4 space-y-3 overflow-auto">
                {phase === "chat1" && (
                  <>
                    <ChatBubbleAria delay={0}>
                      <div className="flex items-center gap-2 text-blue-600 font-medium mb-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Q1 Preventive Maintenance</span>
                      </div>
                      <p className="text-slate-600">Starting inspection on <span className="font-semibold text-slate-800">CNC Lathe #12</span>. 7-point checklist loaded.</p>
                      <p className="mt-1.5">
                        <span className="text-cyan-600 font-medium">Step 1/7:</span>{" "}
                        <span className="text-slate-600">Measure spindle bearing temperature. Range: 18-26°C.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat2" && (
                  <>
                    <ChatBubblePhoto label="Bearing: 23.1°C" icon={Thermometer} />
                    <ChatBubbleAria>
                      <p><span className="text-emerald-600 font-medium">✓ Normal.</span> Within thermal limits.</p>
                      <p className="mt-1.5">
                        <span className="text-cyan-600 font-medium">Step 2/7:</span>{" "}
                        <span className="text-slate-600">Check hydraulic system pressure. Target: 2800-3200 PSI.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat3" && (
                  <>
                    <ChatBubbleUser>Reading 2950 PSI on gauge.</ChatBubbleUser>
                    <ChatBubblePhoto label="Hydraulic: 2950 PSI" icon={Gauge} />
                    <ChatBubbleAria>
                      <p><span className="text-emerald-600 font-medium">✓ Optimal.</span> Logged.</p>
                      <p className="mt-1.5">
                        <span className="text-cyan-600 font-medium">Step 3/7:</span>{" "}
                        <span className="text-slate-600">Inspect coolant concentration. Expected: 8-12%.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat4" && (
                  <>
                    <ChatBubbleUser>Refractometer shows 7.2%.</ChatBubbleUser>
                    <ChatBubbleWarning>
                      <p className="font-medium">Coolant below threshold (7.2% &lt; 8%)</p>
                      <p className="mt-1 text-amber-700">Recommend adding 2L concentrate. Continue?</p>
                    </ChatBubbleWarning>
                  </>
                )}
                {phase === "chat5" && (
                  <>
                    <ChatBubbleUser>Added 2L. Now reading 9.8%.</ChatBubbleUser>
                    <ChatBubblePhoto label="Coolant: 9.8%" icon={Droplets} />
                    <ChatBubbleAria>
                      <p><span className="text-emerald-600 font-medium">✓ Corrected.</span> Logged adjustment.</p>
                      <p className="mt-1.5">
                        <span className="text-cyan-600 font-medium">Step 4/7:</span>{" "}
                        <span className="text-slate-600">Test servo motor response time. Max: 15ms.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat6" && (
                  <>
                    <ChatBubblePhoto label="Servo: 8.2ms" icon={Zap} />
                    <ChatBubbleAria>
                      <p><span className="text-emerald-600 font-medium">✓ Excellent response.</span></p>
                      <p className="mt-1.5">
                        <span className="text-cyan-600 font-medium">Step 5/7:</span>{" "}
                        <span className="text-slate-600">Verify tool changer alignment. Run cycle test.</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat7" && (
                  <>
                    <ChatBubblePhoto label="Changer aligned" icon={RotateCcw} />
                    <ChatBubbleUser>Cycle test complete. No jams.</ChatBubbleUser>
                    <ChatBubbleAria>
                      <div className="flex items-center gap-2 text-emerald-600 font-medium mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>All Checks Complete</span>
                      </div>
                      <p className="text-slate-600">6/7 passed, 1 corrective action taken. Generating compliance report...</p>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-2 flex items-center gap-2 text-slate-500 text-[10px]"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-2.5 h-2.5 rounded-full border border-slate-400 border-t-slate-600"
                        />
                        Compiling data...
                      </motion.div>
                    </ChatBubbleAria>
                  </>
                )}
              </div>

              {/* Input Bar */}
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2.5 border border-black/[0.08] shadow-sm">
                    <span className="text-slate-400 text-xs">Speak or take photo...</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                  >
                    <Mic className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Generating Phase */}
          {phase === "generating" && (
            <motion.div
              key="generating"
              className="flex-1 flex items-center justify-center p-5"
            >
              <StatusCard
                borderColor="border-cyan-200"
                icon={
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <FileText className="w-5 h-5 text-cyan-500" />
                  </motion.div>
                }
                iconBg="bg-gradient-to-br from-cyan-100 to-cyan-200"
                title="Generating Report"
                subtitle="Processing maintenance data..."
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1.5"
                >
                  {["Analyzing sensor data", "Processing photos", "Logging corrective actions", "Generating PDF"].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.2 + i * 0.3, duration: 0.4 }}
                      className="h-1.5 bg-cyan-200 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.2 + i * 0.3, duration: 0.6 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </StatusCard>
            </motion.div>
          )}

          {/* Report Phase */}
          {phase === "report" && !showPdf && (
            <motion.div
              key="report"
              className="flex-1 flex items-center justify-center p-5"
            >
              <StatusCard
                borderColor="border-emerald-200"
                icon={
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </motion.div>
                }
                iconBg="bg-gradient-to-br from-emerald-100 to-emerald-200"
                title="Report Complete"
                subtitle="MNT-2026-0124"
              >
                <div className="space-y-1.5 mb-3">
                  {reportSections.map((section, index) => (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: index < visibleSections ? 1 : 0,
                        x: index < visibleSections ? 0 : -20
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white/50 border border-white/30"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                        <section.icon className={`w-3.5 h-3.5 ${section.label === "Findings" ? "text-amber-500" : "text-slate-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-500 text-[9px]">{section.label}</p>
                        <p className={`text-xs font-medium truncate ${section.label === "Findings" ? "text-amber-600" : "text-slate-800"}`}>{section.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: visibleSections >= 5 ? 1 : 0, y: visibleSections >= 5 ? 0 : 10 }}
                  className="flex gap-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] font-medium rounded-lg shadow-lg shadow-emerald-500/30"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/60 backdrop-blur-sm text-slate-700 text-[10px] font-medium rounded-lg border border-black/10"
                  >
                    <Share2 className="w-3 h-3" />
                    Share
                  </motion.button>
                </motion.div>
              </StatusCard>
            </motion.div>
          )}

          {/* PDF Preview Phase */}
          {phase === "report" && showPdf && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="flex-1 flex items-center justify-center p-3"
            >
              <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                {/* PDF Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-white text-[10px] font-medium">MNT-2026-0124.pdf</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-[9px]">Signed</span>
                  </div>
                </div>

                {/* PDF Content */}
                <div className="p-3 bg-white">
                  {/* Company Header */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-3 pb-2 border-b border-slate-200"
                  >
                    <p className="text-slate-800 font-bold text-xs">MAINTENANCE REPORT</p>
                    <p className="text-slate-500 text-[9px]">CNC Lathe #12 • January 24, 2026</p>
                  </motion.div>

                  {/* Report Details */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-[9px]"
                  >
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type</span>
                      <span className="text-slate-800 font-medium">Preventive Q1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration</span>
                      <span className="text-slate-800 font-medium">34 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Technician</span>
                      <span className="text-slate-800 font-medium">J. Martinez</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Shift</span>
                      <span className="text-slate-800 font-medium">Morning</span>
                    </div>
                  </motion.div>

                  {/* Checklist */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-50 rounded-lg p-2.5 mb-3"
                  >
                    <p className="text-slate-700 text-[9px] font-semibold mb-1.5">INSPECTION RESULTS</p>
                    <div className="space-y-1">
                      {[
                        { label: "Bearing Temp", value: "23.1°C", status: "pass" },
                        { label: "Hydraulic", value: "2950 PSI", status: "pass" },
                        { label: "Coolant", value: "9.8%", status: "corrected" },
                        { label: "Servo Response", value: "8.2ms", status: "pass" },
                        { label: "Tool Changer", value: "Aligned", status: "pass" }
                      ].map((item, i) => (
                        <motion.div 
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.08 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-slate-600 text-[8px]">{item.label}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-800 text-[8px] font-medium">{item.value}</span>
                            {item.status === "corrected" ? (
                              <Settings className="w-2.5 h-2.5 text-amber-500" />
                            ) : (
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Corrective Action */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-amber-50 rounded-lg p-2 mb-3 border border-amber-200"
                  >
                    <p className="text-amber-700 text-[8px] font-semibold">CORRECTIVE ACTION</p>
                    <p className="text-amber-600 text-[8px]">Added 2L coolant concentrate to restore proper concentration level.</p>
                  </motion.div>

                  {/* Photos Grid */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-3"
                  >
                    <p className="text-slate-700 text-[9px] font-semibold mb-1.5">EVIDENCE (6)</p>
                    <div className="grid grid-cols-6 gap-1">
                      {[Thermometer, Gauge, Droplets, Droplets, Zap, RotateCcw].map((Icon, i) => (
                        <div key={i} className="aspect-square bg-slate-100 rounded flex items-center justify-center">
                          <Icon className="w-3 h-3 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Signature */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between pt-2 border-t border-slate-200"
                  >
                    <div>
                      <p className="text-slate-500 text-[8px]">Digital Signature</p>
                      <p className="text-slate-800 text-[9px] font-medium italic">J. Martinez</p>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span className="text-emerald-700 text-[8px] font-medium">Verified</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AutoReportUI;
