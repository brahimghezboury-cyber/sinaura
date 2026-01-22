import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const [visibleMessages, setVisibleMessages] = useState<string[]>(["user1"]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, phase]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Reset messages when restarting
    setVisibleMessages(["user1"]);
    
    timers.push(setTimeout(() => setVisibleMessages(prev => [...prev, "aria1"]), 800));
    timers.push(setTimeout(() => setVisibleMessages(prev => [...prev, "user2"]), 3000));
    timers.push(setTimeout(() => setVisibleMessages(prev => [...prev, "aria2"]), 3800));
    timers.push(setTimeout(() => setVisibleMessages(prev => [...prev, "user3"]), 6000));
    timers.push(setTimeout(() => setVisibleMessages(prev => [...prev, "aria3"]), 6800));
    timers.push(setTimeout(() => setVisibleMessages(prev => [...prev, "user4"]), 9000));
    timers.push(setTimeout(() => setVisibleMessages(prev => [...prev, "aria4"]), 9800));
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

  // Prevent scroll propagation
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    
    // Only prevent default if we can scroll in that direction
    if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
      e.stopPropagation();
    } else if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-200/80 via-slate-100 to-slate-200/80 rounded-2xl overflow-hidden relative isolate">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/40" />
      
      {/* Subtle animated gradient */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
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
          {/* Chat Interface - Always visible, messages accumulate */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            {/* Messages Area - Scrollable */}
            <div 
              className="flex-1 p-5 space-y-4 overflow-y-auto overscroll-none touch-pan-y"
              onScroll={handleScroll}
              onWheel={handleWheel}
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* User message 1 */}
              {visibleMessages.includes("user1") && (
                <ChatBubbleUser>
                  The pneumatic valve on line 3 isn't responding. Error code PNE-2847 on the display.
                </ChatBubbleUser>
              )}
              
              {/* Aria response 1 */}
              {visibleMessages.includes("aria1") && (
                <ChatBubbleAria delay={0}>
                  <p className="font-semibold text-cyan-700 mb-1">PNE-2847 - Pneumatic Valve Fault</p>
                  <p className="text-slate-600">This error indicates a pressure regulation issue. Let's troubleshoot together.</p>
                  <p className="mt-2">
                    <span className="text-cyan-600 font-medium">First:</span>{" "}
                    <span className="text-slate-600">Can you check if the air supply pressure is above 6 bar?</span>
                  </p>
                </ChatBubbleAria>
              )}

              {/* User message 2 */}
              {visibleMessages.includes("user2") && (
                <ChatBubbleUser>
                  Yes, pressure is at 6.2 bar. That looks fine.
                </ChatBubbleUser>
              )}

              {/* Aria response 2 */}
              {visibleMessages.includes("aria2") && (
                <ChatBubbleAria delay={0}>
                  <p className="text-slate-600">Good, supply pressure is normal. The issue might be internal.</p>
                  <p className="mt-2">
                    <span className="text-cyan-600 font-medium">Next step:</span>{" "}
                    <span className="text-slate-600">Try manually actuating the valve using the override button. Does it move?</span>
                  </p>
                </ChatBubbleAria>
              )}

              {/* User message 3 */}
              {visibleMessages.includes("user3") && (
                <ChatBubbleUser>
                  I pressed the override but nothing happens. No movement at all.
                </ChatBubbleUser>
              )}

              {/* Aria response 3 */}
              {visibleMessages.includes("aria3") && (
                <ChatBubbleAria delay={0}>
                  <p className="text-slate-600">That confirms the valve mechanism itself is blocked.</p>
                  <p className="mt-2">
                    <span className="text-cyan-600 font-medium">Final check:</span>{" "}
                    <span className="text-slate-600">Can you listen for any air leak near the actuator?</span>
                  </p>
                </ChatBubbleAria>
              )}

              {/* User message 4 */}
              {visibleMessages.includes("user4") && (
                <ChatBubbleUser>
                  Yes, I can hear air escaping from the side of the actuator.
                </ChatBubbleUser>
              )}

              {/* Aria response 4 - Diagnosis */}
              {visibleMessages.includes("aria4") && (
                <ChatBubbleAria delay={0}>
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
              )}

              {/* Status Cards inline in chat */}
              <AnimatePresence mode="wait">
                {phase === "broken" && (
                  <motion.div
                    key="broken-inline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-red-50 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] border border-red-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-semibold text-red-600">Component Irreparable</span>
                      </div>
                      <p className="text-slate-700 text-sm">
                        Pneumatic Valve <span className="font-semibold">PNV-3847</span> - Diaphragm failure confirmed
                      </p>
                    </div>
                  </motion.div>
                )}

                {phase === "warehouse" && (
                  <motion.div
                    key="warehouse-inline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-orange-50 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] border border-orange-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                          <Package className="w-4 h-4 text-orange-500" />
                        </motion.div>
                        <span className="text-sm font-semibold text-orange-600">Searching Warehouse...</span>
                      </div>
                      <p className="text-slate-700 text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        No spare parts available. Last unit used 2 weeks ago.
                      </p>
                    </div>
                  </motion.div>
                )}

                {phase === "order" && (
                  <motion.div
                    key="order-inline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-violet-50 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] border border-violet-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingCart className="w-4 h-4 text-violet-500" />
                        <span className="text-sm font-semibold text-violet-600">Order Required</span>
                      </div>
                      <p className="text-slate-700 text-sm mb-3">
                        <span className="text-violet-600 font-semibold">PNV-3847</span> available at Festo with 24h delivery.
                      </p>
                      <AnimatePresence>
                        {showOrderButton && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Order Now - Express 24h
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {phase === "confirmed" && (
                  <motion.div
                    key="confirmed-inline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-emerald-50 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] border border-emerald-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ type: "spring", damping: 10 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </motion.div>
                        <span className="text-sm font-semibold text-emerald-600">Order Confirmed</span>
                      </div>
                      <div className="text-slate-600 text-xs space-y-1">
                        <p className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-slate-400" />
                          Email sent to orders@festo.com
                        </p>
                        <p>Part: PNV-3847 • Qty: 1 • ETA: Tomorrow 14:00</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
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

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AutoProcurementUI;
