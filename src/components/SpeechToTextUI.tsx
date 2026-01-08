import { motion } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
interface SpeechToTextUIProps {
  isAnimated?: boolean;
}
const SpeechToTextUI = ({
  isAnimated = true
}: SpeechToTextUIProps) => {
  return (
    <div className="relative h-full rounded-3xl overflow-hidden">
      {/* iOS Liquid Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-white/10" />
      <div className="absolute inset-[0.5px] rounded-3xl border border-white/30" />
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" />
            <span className="text-white/90 font-medium text-xs tracking-wide">Speech to Text</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-white/50 text-[9px] font-medium">LIVE</span>
          </div>
        </div>

        {/* Waveform visualization */}
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="flex items-end gap-[3px] h-14 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-cyan-400 via-cyan-300 to-white shadow-[0_0_6px_rgba(34,211,238,0.4)]"
                animate={isAnimated ? {
                  height: [6, 12 + Math.random() * 24, 6]
                } : {
                  height: 10
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.025,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Transcription preview */}
        <div className="relative rounded-2xl overflow-hidden mb-4">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <div className="relative p-3">
            <p className="text-[11px] text-white/80 leading-relaxed font-light">
              <span className="text-cyan-300">"</span>
              Check the pressure valve on line 3...
              <span className="text-white/50 animate-pulse">|</span>
              <span className="text-cyan-300">"</span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105">
            <Volume2 className="w-4 h-4 text-white/70" />
          </button>
          <button className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_4px_20px_rgba(34,211,238,0.4)] flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_4px_25px_rgba(34,211,238,0.5)]">
            <Mic className="w-5 h-5 text-white" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105">
            <MicOff className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SpeechToTextUI;