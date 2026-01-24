import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  XCircle, 
  Package, 
  ShoppingCart, 
  Mail, 
  CheckCircle2,
  AlertTriangle,
  User,
  X,
  Mic
} from "lucide-react";

type Phase = 
  | "chat1" 
  | "chat2" 
  | "chat3" 
  | "chat4" 
  | "broken" 
  | "warehouse" 
  | "order" 
  | "confirmed";

const AutoProcurementUI = () => {
  const [phase, setPhase] = useState<Phase>("chat1");
  const [showOrderButton, setShowOrderButton] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setPhase("chat2"), 3000));
    timers.push(setTimeout(() => setPhase("chat3"), 6000));
    timers.push(setTimeout(() => setPhase("chat4"), 9000));
    timers.push(setTimeout(() => setPhase("broken"), 12000));
    timers.push(setTimeout(() => setPhase("warehouse"), 14500));
    timers.push(setTimeout(() => {
      setPhase("order");
      setShowOrderButton(true);
    }, 17000));
    timers.push(setTimeout(() => {
      setShowOrderButton(false);
      setPhase("confirmed");
    }, 19500));
    timers.push(setTimeout(() => {
      setPhase("chat1");
    }, 23000));

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
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-300/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-300/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        <AnimatePresence mode="wait">
          {/* Chat Phases */}
          {(phase === "chat1" || phase === "chat2" || phase === "chat3" || phase === "chat4") && (
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
                    <ChatBubbleUser>
                      The pneumatic valve on line 3 isn't responding. Error code PNE-2847 on the display.
                    </ChatBubbleUser>
                    <ChatBubbleAria>
                      <p className="font-semibold text-cyan-700 mb-1">PNE-2847 - Pneumatic Valve Fault</p>
                      <p className="text-slate-600">This error indicates a pressure regulation issue. Let's troubleshoot together.</p>
                      <p className="mt-2">
                        <span className="text-cyan-600 font-medium">First:</span>{" "}
                        <span className="text-slate-600">Can you check if the air supply pressure is above 6 bar?</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat2" && (
                  <>
                    <ChatBubbleUser>
                      Yes, pressure is at 6.2 bar. That looks fine.
                    </ChatBubbleUser>
                    <ChatBubbleAria>
                      <p className="text-slate-600">Good, supply pressure is normal. The issue might be internal.</p>
                      <p className="mt-2">
                        <span className="text-cyan-600 font-medium">Next step:</span>{" "}
                        <span className="text-slate-600">Try manually actuating the valve using the override button. Does it move?</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat3" && (
                  <>
                    <ChatBubbleUser>
                      I pressed the override but nothing happens. No movement at all.
                    </ChatBubbleUser>
                    <ChatBubbleAria>
                      <p className="text-slate-600">That confirms the valve mechanism itself is blocked.</p>
                      <p className="mt-2">
                        <span className="text-cyan-600 font-medium">Final check:</span>{" "}
                        <span className="text-slate-600">Can you listen for any air leak near the actuator?</span>
                      </p>
                    </ChatBubbleAria>
                  </>
                )}
                {phase === "chat4" && (
                  <>
                    <ChatBubbleUser>
                      Yes, I can hear air escaping from the side of the actuator.
                    </ChatBubbleUser>
                    <ChatBubbleAria>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-amber-600 font-medium mb-2"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Diagnosis Complete</span>
                      </motion.div>
                      <p className="text-slate-600">The internal diaphragm is ruptured. This valve requires full replacement.</p>
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
                        Checking warehouse inventory...
                      </motion.p>
                    </ChatBubbleAria>
                  </>
                )}
              </div>

              {/* Input Bar */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-full px-5 py-3 border border-black/[0.08] shadow-sm">
                    <span className="text-slate-400 text-sm">Type or press and hold...</span>
                  </div>
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

          {/* Broken Phase */}
          {phase === "broken" && (
            <motion.div
              key="broken"
              className="flex-1 flex items-center justify-center p-6"
            >
              <StatusCard
                borderColor="border-red-200"
                icon={<XCircle className="w-6 h-6 text-red-500" />}
                iconBg="bg-gradient-to-br from-red-100 to-red-200"
                title="Component Irreparable"
                subtitle="Replacement required"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-red-50 rounded-xl p-3 border border-red-200"
                >
                  <p className="text-slate-700 text-sm">
                    Pneumatic Valve <span className="text-slate-900 font-semibold">PNV-3847</span>
                  </p>
                  <p className="text-red-600 text-xs mt-1">Diaphragm failure confirmed</p>
                </motion.div>
              </StatusCard>
            </motion.div>
          )}

          {/* Warehouse Phase */}
          {phase === "warehouse" && (
            <motion.div
              key="warehouse"
              className="flex-1 flex items-center justify-center p-6"
            >
              <StatusCard
                borderColor="border-orange-200"
                icon={
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                    <Package className="w-6 h-6 text-orange-500" />
                  </motion.div>
                }
                iconBg="bg-gradient-to-br from-orange-100 to-orange-200"
                title="Searching Warehouse"
                subtitle="Looking for PNV-3847..."
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-orange-50 rounded-xl p-3 border border-orange-200 flex items-center gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <p className="text-slate-700 text-sm">No spare parts available. Last unit used 2 weeks ago.</p>
                </motion.div>
              </StatusCard>
            </motion.div>
          )}

          {/* Order Phase */}
          {phase === "order" && (
            <motion.div
              key="order"
              className="flex-1 flex items-center justify-center p-6"
            >
              <StatusCard
                borderColor="border-violet-200"
                icon={<ShoppingCart className="w-6 h-6 text-violet-500" />}
                iconBg="bg-gradient-to-br from-violet-100 to-violet-200"
                title="Order Required"
                subtitle="Part found at supplier"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-600 text-sm mb-4"
                >
                  <span className="text-violet-600 font-semibold">PNV-3847</span> available at Festo Industrial Supply with 24h express delivery.
                </motion.p>
                
                <AnimatePresence>
                  {showOrderButton && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-3 shadow-xl shadow-violet-500/30"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Order Now - Express 24h
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.button>
                  )}
                </AnimatePresence>
              </StatusCard>
            </motion.div>
          )}

          {/* Confirmed Phase */}
          {phase === "confirmed" && (
            <motion.div
              key="confirmed"
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
                title="Order Confirmed"
                subtitle="Email sent to supplier"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-xs">To:</span>
                    <span className="text-slate-700 text-sm">orders@festo.com</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 grid grid-cols-2 gap-2">
                    <p className="text-slate-500 text-xs">Part: <span className="text-slate-700">PNV-3847</span></p>
                    <p className="text-slate-500 text-xs">Qty: <span className="text-slate-700">1 unit</span></p>
                    <p className="text-slate-500 text-xs">Delivery: <span className="text-emerald-600">24h Express</span></p>
                    <p className="text-slate-500 text-xs">Ref: <span className="text-slate-700">#4521</span></p>
                  </div>
                </motion.div>
              </StatusCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AutoProcurementUI;
