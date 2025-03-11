import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PortfolioItemProps {
  id?: string;
  image?: string;
  title?: string;
  category?: string;
  description?: string;
  onOpenCaseStudy?: (id: string) => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80",
  title = "Brand Campaign",
  category = "Digital Marketing",
  description = "Award-winning campaign that increased brand awareness by 45%",
  onOpenCaseStudy = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onOpenCaseStudy(id);
  };

  return (
    <motion.div
      className="relative w-[380px] h-[380px] overflow-hidden rounded-lg bg-gray-100 cursor-pointer group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Portfolio Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay that appears on hover */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex justify-between items-center"
            >
              <span className="text-sm font-medium text-gray-300">
                {category}
              </span>
              <ArrowUpRight className="h-5 w-5 text-white" />
            </motion.div>

            <motion.h3
              className="text-xl font-bold mt-2 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-sm text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;
