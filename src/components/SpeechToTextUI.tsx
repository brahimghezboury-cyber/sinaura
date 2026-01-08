import { motion } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";

interface SpeechToTextUIProps {
  isAnimated?: boolean;
}

const SpeechToTextUI = ({ isAnimated = true }: SpeechToTextUIProps) => {
  return (
    <div className="liquid-glass-dark rounded-2xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-white/80 font-medium text-xs">Speech to Text</span>
        </div>
        <span className="text-white/40 text-[10px] font-mono">LIVE</span>
      </div>

      {/* Waveform visualization */}
      <div className="flex-1 flex items-center justify-center py-3">
        <div className="flex items-end gap-[3px] h-12">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-full"
              animate={isAnimated ? {
                height: [8, 16 + Math.random() * 28, 8],
              } : { height: 12 }}
              transition={{
                duration: 0.4 + Math.random() * 0.3,
                repeat: Infinity,
                delay: i * 0.03,
              }}
            />
          ))}
        </div>
      </div>

      {/* Transcription preview */}
      <div className="bg-white/5 rounded-xl p-2.5 mb-3">
        <p className="text-[10px] text-white/70 leading-relaxed">
          <span className="text-cyan-400">"</span>
          Check the pressure valve on line 3...
          <span className="text-white/40 animate-pulse">|</span>
          <span className="text-cyan-400">"</span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <Volume2 className="w-3.5 h-3.5 text-white/60" />
        </button>
        <button className="w-11 h-11 rounded-full btn-glow flex items-center justify-center">
          <Mic className="w-4 h-4 text-white" />
        </button>
        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <MicOff className="w-3.5 h-3.5 text-white/60" />
        </button>
      </div>
    </div>
  );
};

export default SpeechToTextUI;
