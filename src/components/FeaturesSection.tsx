import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import engineerImage from "@/assets/engineer-ar.png";
import SmartFaultDiagnosisUI from "./features/SmartFaultDiagnosisUI";
import ARStepByStepUI from "./features/ARStepByStepUI";
import FailureForecastingUI from "./features/FailureForecastingUI";
import RealTimeMonitoringUI from "./features/RealTimeMonitoringUI";
import DocumentIntelligenceUI from "./features/DocumentIntelligenceUI";
import KnowHowTransferUI from "./features/KnowHowTransferUI";

const FeaturesSection = () => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 700;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const features = [
    {
      title: "Smart Fault Diagnosis",
      description: "is the result of years of AI innovation. Its advanced algorithms provide ",
      highlight: "root cause analysis",
      descriptionEnd: " that identifies issues in seconds, not hours.",
      ui: <SmartFaultDiagnosisUI />,
    },
    {
      title: "AR Step-by-Step Guidance",
      description: "overlays visual instructions directly on equipment. The new ",
      highlight: "spatial computing",
      descriptionEnd: " technology ensures error-free repairs every time.",
      ui: <ARStepByStepUI />,
    },
    {
      title: "Failure Forecasting",
      description: "uses machine learning to predict equipment failures. With ",
      highlight: "95%+ accuracy",
      descriptionEnd: ", you can plan maintenance days or weeks in advance.",
      ui: <FailureForecastingUI />,
    },
    {
      title: "Real-Time Monitoring",
      description: "provides live dashboards showing machine health. The ",
      highlight: "instant alerts",
      descriptionEnd: " keep you informed of any anomalies.",
      ui: <RealTimeMonitoringUI />,
    },
    {
      title: "Document Intelligence",
      description: "automatically parses equipment manuals. It generates ",
      highlight: "actionable procedures",
      descriptionEnd: " for maintenance and repair tasks.",
      ui: <DocumentIntelligenceUI />,
    },
    {
      title: "Know-How Transfer",
      description: "captures expert knowledge from your team. This ",
      highlight: "collective intelligence",
      descriptionEnd: " is accessible to everyone, anytime.",
      ui: <KnowHowTransferUI />,
    },
  ];

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 mb-16">
        {/* Section header - Apple style */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4"
        >
          Predictive Maintenance.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          See the future of your equipment.
        </motion.p>
      </div>

      {/* Apple Carousel */}
      <div className="relative">
        {/* Cards container */}
        <div 
          ref={carouselRef}
          onScroll={checkScrollButtons}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-8 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="flex-shrink-0 first:ml-4 last:mr-4"
            >
              {/* Large card with light gray background */}
              <div className="w-[600px] md:w-[700px] h-[450px] md:h-[500px] bg-[#f5f5f7] rounded-3xl overflow-hidden mb-6">
                <div className="w-full h-full">
                  {feature.ui}
                </div>
              </div>
              
              {/* Description below card - Apple style */}
              <div className="max-w-[600px] md:max-w-[700px]">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {feature.title} {feature.description}
                  <span className="text-foreground font-semibold">{feature.highlight}</span>
                  {feature.descriptionEnd}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation arrows - centered at bottom */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              canScrollLeft 
                ? "border-border hover:bg-muted cursor-pointer" 
                : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              canScrollRight 
                ? "border-border hover:bg-muted cursor-pointer" 
                : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mt-12 px-4"
      >
        <a href="#technology" className="text-primary hover:underline text-lg">
          Learn more about the technology →
        </a>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
