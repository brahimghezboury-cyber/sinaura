import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, Camera, X, MessageCircle, Sparkles, User, History, FileText, Zap, Radio, Settings, RotateCcw } from "lucide-react";
import glassesProduct from "@/assets/glasses-product.png";
import SpeechToTextUI from "./SpeechToTextUI";
import ARCameraScanUI from "./ARCameraScanUI";

const DesignSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="design" ref={ref} className="section-gray py-24 md:py-32">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground mb-3">Take a closer look.</p>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <img
            src={glassesProduct}
            alt="AriA™ Smart Glasses"
            className="w-full h-auto product-image float"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            AriA™ is the result of years of innovation in AI, industrial automation, and wearable technology. 
            Its advanced algorithms and elegant form deliver an exceptional experience every time you put it on.
          </p>
        </motion.div>

        {/* Two interfaces side by side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Aria Engine Demo - Liquid Glass Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-center mb-6">Aria Engine</h3>
            
            {/* Chat Interface */}
            <div className="liquid-glass-dark rounded-3xl p-5 relative overflow-hidden h-[380px] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="text-white font-medium text-sm">Aria Engine</span>
                <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <X className="w-3 h-3 text-white/70" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 flex-1 overflow-hidden">
                {/* User message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex justify-end"
                >
                  <div className="chat-bubble-user px-3 py-2 max-w-[85%]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <User className="w-2.5 h-2.5" />
                      <span className="text-[10px] font-medium opacity-80">ME</span>
                    </div>
                    <p className="text-xs">I have an error FMO1201</p>
                  </div>
                </motion.div>

                {/* Aria response */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex justify-start"
                >
                  <div className="chat-bubble-aria px-3 py-2 max-w-[90%]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                      <span className="text-[10px] font-medium text-cyan-400">ARIA</span>
                    </div>
                    <p className="text-white font-medium text-xs mb-1">FMO1201</p>
                    <p className="text-white/80 text-[11px] leading-relaxed">
                      Communication issue between device and control system. Check wiring or interface.
                    </p>
                    <p className="text-white/70 text-[11px] mt-2">
                      <span className="text-cyan-400 font-medium">Step 1:</span> Check interface wiring.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Input area */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex-1 bg-white/10 rounded-full px-4 py-2.5">
                  <span className="text-white/40 text-xs">Type or press and hold...</span>
                </div>
                <button className="w-10 h-10 rounded-full btn-glow flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Voice Recording Interface */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-center mb-6">Voice Recording</h3>
            
            <div className="liquid-glass-light rounded-3xl p-5 relative overflow-hidden h-[380px] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-black/80 font-medium text-sm">Recording...</span>
                </div>
                <span className="text-black/50 text-sm font-mono">00:04:32</span>
              </div>

              {/* Waveform visualization */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-1 h-24">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full"
                      animate={{
                        height: [20, 40 + Math.random() * 40, 20],
                      }}
                      transition={{
                        duration: 0.5 + Math.random() * 0.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Transcription preview */}
              <div className="bg-black/5 rounded-2xl p-3 mb-4">
                <p className="text-xs text-black/60 italic">
                  "Check the thermocouple connection on chamber 3, the temperature readings seem..."
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
                  <RotateCcw className="w-5 h-5 text-black/60" />
                </button>
                <button className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </button>
                <button className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
                  <Camera className="w-5 h-5 text-black/60" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* History Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <h3 className="text-xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <History className="w-5 h-5" />
            Request History
          </h3>
          
          <div className="liquid-glass-light rounded-3xl p-5 space-y-3">
            {[
              { component: "TERMOCOPPIA TEMPERATURA IN CAMERA", error: "FMO1201", time: "16:50" },
              { component: "VALVOLA PNEUMATICA LINEA 2", error: "PNE0445", time: "14:22" },
              { component: "MOTORE BRUSHLESS ASSE Y", error: "DRV2201", time: "11:08" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-black/80 mb-1">{item.component}</p>
                  <p className="text-xs text-black/50">Error: {item.error}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-black/40">{item.time}</p>
                  <span className="text-xs text-cyan-600 font-medium">View →</span>
                </div>
              </motion.div>
            ))}
            
            <button className="w-full p-3 text-center text-sm text-cyan-600 font-medium hover:bg-cyan-50 rounded-xl transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Reopen chat
            </button>
          </div>
        </motion.div>

        {/* Feature cards - Horizontal scroll */}
        <div className="horizontal-scroll px-4 -mx-4">
          {[
            {
              title: "Voice Assistant",
              description: "Hands-free operation with natural language processing. Just speak your query and get instant AI-powered responses.",
              icon: Mic,
              customUI: <SpeechToTextUI />,
            },
            {
              title: "AR Camera Scan",
              description: "Point your camera at any equipment to instantly identify components, errors, and get diagnostic overlays.",
              icon: Camera,
              customUI: <ARCameraScanUI />,
              large: true,
            },
            {
              title: "Smart Diagnostics",
              description: "AI-powered error code analysis provides step-by-step repair guidance with root cause identification.",
              icon: Sparkles,
            },
            {
              title: "Request History",
              description: "Access your complete conversation history. Review past diagnostics and solutions anytime.",
              icon: History,
            },
            {
              title: "Technical Manuals",
              description: "Automatically parse equipment manuals and generate actionable, step-by-step repair procedures.",
              icon: FileText,
            },
            {
              title: "Real-Time Alerts",
              description: "Receive instant notifications about equipment status, anomalies, and predicted failures.",
              icon: Zap,
            },
            {
              title: "IoT Integration",
              description: "Connect with PLCs, sensors, and legacy systems for unified data access across your plant.",
              icon: Radio,
            },
            {
              title: "Custom Settings",
              description: "Configure language, notifications, and personalize your AriA™ experience for your workflow.",
              icon: Settings,
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className={`feature-card p-6 flex flex-col ${
                feature.large ? "w-96 md:w-[420px]" : "w-72 md:w-80"
              }`}
            >
              {feature.customUI && (
                <div className={`w-full rounded-xl overflow-hidden mb-4 ${
                  feature.large ? "h-56" : "h-40"
                }`}>
                  {feature.customUI}
                </div>
              )}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
