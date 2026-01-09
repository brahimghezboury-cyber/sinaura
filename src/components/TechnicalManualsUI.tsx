import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Search, BookOpen, ChevronRight, Download } from "lucide-react";

const TechnicalManualsUI = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setSearchActive(true), 1000);
    const timer2 = setTimeout(() => setSelectedDoc(0), 2500);
    const timer3 = setTimeout(() => setSelectedDoc(1), 4000);
    const timer4 = setTimeout(() => {
      setSearchActive(false);
      setSelectedDoc(null);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [searchActive]);

  const documents = [
    { name: "Motor Controller Manual", pages: 245, type: "PDF", size: "12.4 MB" },
    { name: "PLC Programming Guide", pages: 180, type: "PDF", size: "8.2 MB" },
    { name: "Sensor Calibration", pages: 65, type: "PDF", size: "3.1 MB" },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-white font-medium text-sm">Technical Manuals</span>
        </div>
        <span className="text-white/40 text-xs">3 documents</span>
      </div>

      <motion.div
        animate={{
          borderColor: searchActive ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.1)"
        }}
        className="relative mb-5 bg-white/5 rounded-xl border overflow-hidden"
      >
        <div className="flex items-center px-4 py-3">
          <Search className="w-4 h-4 text-white/40 mr-3" />
          <motion.span 
            className="text-white/40 text-sm"
            animate={{ opacity: searchActive ? [0.4, 1, 0.4] : 0.4 }}
            transition={{ duration: 1.5, repeat: searchActive ? Infinity : 0 }}
          >
            {searchActive ? "Searching manuals..." : "Search documentation"}
          </motion.span>
        </div>
        {searchActive && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 origin-left"
          />
        )}
      </motion.div>

      <div className="flex-1 space-y-3 overflow-hidden">
        {documents.map((doc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: selectedDoc === index ? 1.02 : 1,
              backgroundColor: selectedDoc === index ? "rgba(139, 92, 246, 0.1)" : "rgba(255, 255, 255, 0.03)"
            }}
            transition={{ delay: index * 0.15 }}
            className="p-4 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-0.5">{doc.name}</p>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span>{doc.pages} pages</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
              </div>
              {selectedDoc === index ? (
                <motion.button 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center"
                >
                  <Download className="w-4 h-4 text-white" />
                </motion.button>
              ) : (
                <ChevronRight className="w-4 h-4 text-white/30" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5 mt-auto flex gap-2">
        <button className="flex-1 py-2.5 text-center text-xs text-violet-400 font-medium bg-violet-500/10 rounded-xl hover:bg-violet-500/20 transition-colors">
          Upload Manual
        </button>
        <button className="flex-1 py-2.5 text-center text-xs text-white/60 font-medium bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
          Browse All
        </button>
      </div>
    </div>
  );
};

export default TechnicalManualsUI;
