import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundItems?: Array<{
    id: string;
    type: "image" | "video";
    src: string;
    alt?: string;
  }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headline = "We Create Campaigns That Get Results",
  subheadline = "Award-winning creative agency specializing in brand strategy, digital experiences, and integrated campaigns.",
  ctaText = "View Our Work",
  onCtaClick = () => {},
  backgroundItems = [
    {
      id: "1",
      type: "video",
      src: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1920&q=80",
      alt: "Creative campaign video",
    },
    {
      id: "2",
      type: "image",
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80",
      alt: "Team brainstorming session",
    },
    {
      id: "3",
      type: "image",
      src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&q=80",
      alt: "Digital marketing strategy",
    },
  ],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Auto-rotate background items
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVideoPlaying) {
        setCurrentIndex((prevIndex) =>
          prevIndex === backgroundItems.length - 1 ? 0 : prevIndex + 1,
        );
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [backgroundItems.length, isVideoPlaying]);

  // Handle video play/pause
  useEffect(() => {
    const currentItem = backgroundItems[currentIndex];
    if (currentItem.type === "video" && videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.error("Video playback failed:", error);
          setIsVideoPlaying(false);
        });

      const handleVideoEnd = () => {
        setIsVideoPlaying(false);
        setCurrentIndex((prevIndex) =>
          prevIndex === backgroundItems.length - 1 ? 0 : prevIndex + 1,
        );
      };

      videoRef.current.addEventListener("ended", handleVideoEnd);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleVideoEnd);
        }
      };
    }
  }, [currentIndex, backgroundItems]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("portfolio");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[800px] overflow-hidden bg-black">
      {/* Background Video/Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          {backgroundItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentIndex === index ? 1 : 0,
                zIndex: currentIndex === index ? 10 : 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              {item.type === "video" ? (
                <video
                  ref={videoRef}
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop={false}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || "Background image"}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={onCtaClick}
            className="bg-white text-black hover:bg-gray-200 text-base md:text-lg px-8 py-6 h-auto rounded-full font-medium"
          >
            {ctaText}
            <Play className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          onClick={scrollToNextSection}
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-10 right-10 z-30 flex space-x-2">
        {backgroundItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-white w-6" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
