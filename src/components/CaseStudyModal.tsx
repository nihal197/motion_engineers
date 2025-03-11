import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface CaseStudyModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  caseStudy?: {
    title: string;
    client: string;
    description: string;
    challenge: string;
    solution: string;
    results: string;
    images: string[];
  };
}

const CaseStudyModal = ({
  isOpen = true,
  onClose = () => {},
  caseStudy = {
    title: "Brand Transformation Campaign",
    client: "Global Tech Company",
    description:
      "A comprehensive rebranding and market positioning campaign that revitalized a legacy tech brand.",
    challenge:
      "The client was struggling with an outdated brand image and declining market relevance in a rapidly evolving tech landscape.",
    solution:
      "We developed a bold, forward-thinking brand identity coupled with a multi-channel campaign that highlighted innovation while honoring the company's heritage.",
    results:
      "The campaign resulted in a 45% increase in brand perception metrics, 32% boost in social media engagement, and 28% growth in qualified leads within the first quarter.",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
    ],
  },
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === caseStudy.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? caseStudy.images.length - 1 : prev - 1,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto p-0">
        <div className="relative w-full h-[50vh] bg-gray-100">
          {/* Image carousel */}
          <div className="relative w-full h-full overflow-hidden">
            {caseStudy.images.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentImageIndex === index ? 1 : 0,
                  zIndex: currentImageIndex === index ? 10 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={image}
                  alt={`${caseStudy.title} - image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Image navigation */}
          {caseStudy.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {caseStudy.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-white" : "bg-white/50"}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Image navigation arrows */}
          {caseStudy.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {caseStudy.title}
            </DialogTitle>
            <p className="text-lg text-gray-600 mt-1">{caseStudy.client}</p>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-700">{caseStudy.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Challenge</h3>
                <p className="text-gray-700">{caseStudy.challenge}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Solution</h3>
                <p className="text-gray-700">{caseStudy.solution}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Results</h3>
              <p className="text-gray-700">{caseStudy.results}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Close Case Study
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
