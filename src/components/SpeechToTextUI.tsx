import { motion, AnimatePresence } from "framer-motion";
import { Mic, X } from "lucide-react";
import { useState, useEffect } from "react";

const SpeechToTextUI = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [animationPhase, setAnimationPhase] = useState(0);
  
  const fullText = "Can you tell me the cooking time, and if it is set correctly with today's production?";

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase(1);
      setIsRecording(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isRecording) {
      setDisplayedText("");
      return;
    }

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsRecording(false);
          setAnimationPhase(0);
          setTimeout(() => {
            setAnimationPhase(1);
            setIsRecording(true);
          }, 2000);
        }, 1500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [isRecording]);

  return (
    <div className="relative h-full rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950/95 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-white/5" />
      <div className="absolute inset-[0.5px] rounded-3xl border border-white/20" />
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <div className="relative z-10 p-3 h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center px-2">
          <AnimatePresence mode="wait">
            {isRecording && displayedText ? (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-white/90 leading-relaxed text-center font-light"
              >
                "{displayedText}
                <span className="animate-pulse text-cyan-300">|</span>"
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-white/40 text-center italic"
              >
                Press and hold to speak...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <div className="relative px-3 py-2">
                <span className="text-white/40 text-[10px]">Type or press and hold...</span>
              </div>
            </div>

            <motion.button
              animate={isRecording ? { scale: [1, 0.92, 1] } : { scale: 1 }}
              transition={isRecording ? { duration: 0.3, repeat: Infinity, repeatDelay: 0.5 } : {}}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? "bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_20px_rgba(34,211,238,0.5)]" 
                  : "bg-gradient-to-br from-cyan-400/80 to-cyan-600/80"
              }`}
            >
              <Mic className="w-4 h-4 text-white" />
              {isRecording && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-300"
                    animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                </>
              )}
            </motion.button>

            <button className="w-9 h-9 rounded-full bg-red-500/90 flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToTextUI;
