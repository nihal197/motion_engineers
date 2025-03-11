import React, { useState } from "react";
import { motion } from "framer-motion";
import PortfolioItem from "./PortfolioItem";
import CaseStudyModal from "./CaseStudyModal";

interface PortfolioProject {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  caseStudy: {
    title: string;
    client: string;
    description: string;
    challenge: string;
    solution: string;
    results: string;
    images: string[];
  };
}

interface PortfolioGridProps {
  projects?: PortfolioProject[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80",
      title: "Brand Transformation",
      category: "Digital Marketing",
      description:
        "Award-winning campaign that increased brand awareness by 45%",
      caseStudy: {
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
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
      title: "Social Media Campaign",
      category: "Social Media",
      description:
        "Viral campaign that generated 2M+ impressions across platforms",
      caseStudy: {
        title: "Viral Social Media Campaign",
        client: "Fashion Retailer",
        description:
          "A multi-platform social media campaign that leveraged user-generated content to create viral momentum.",
        challenge:
          "The client needed to increase brand relevance among Gen Z consumers while driving online sales during a competitive holiday season.",
        solution:
          "We created an interactive hashtag challenge that encouraged creative expression while subtly showcasing the client's products.",
        results:
          "The campaign generated over 2 million impressions, 500,000+ user submissions, and a 67% increase in online sales during the campaign period.",
        images: [
          "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=1200&q=80",
          "https://images.unsplash.com/photo-1611162618479-ee4e0c6b5d46?w=1200&q=80",
          "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
        ],
      },
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
      title: "Product Launch",
      category: "Integrated Campaign",
      description:
        "Successful product launch that exceeded sales targets by 200%",
      caseStudy: {
        title: "Revolutionary Product Launch",
        client: "Consumer Electronics Brand",
        description:
          "An integrated marketing campaign for the launch of a groundbreaking new consumer electronics product.",
        challenge:
          "The client was entering a saturated market with a premium-priced product and needed to establish immediate market presence.",
        solution:
          "We developed a teaser campaign that built anticipation, followed by an immersive launch event and strategic influencer partnerships.",
        results:
          "The product sold out within 48 hours of launch, exceeding sales targets by 200% and generating extensive media coverage in top-tier publications.",
        images: [
          "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
          "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=1200&q=80",
          "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=1200&q=80",
        ],
      },
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
      title: "Brand Identity",
      category: "Branding",
      description:
        "Complete brand overhaul that repositioned the company as an industry leader",
      caseStudy: {
        title: "Complete Brand Identity Overhaul",
        client: "Financial Services Firm",
        description:
          "A comprehensive rebrand that transformed a traditional financial services firm into a modern, approachable brand.",
        challenge:
          "The client was perceived as outdated and struggling to connect with younger demographics despite offering innovative services.",
        solution:
          "We created a completely new visual identity, messaging framework, and customer experience strategy that balanced professionalism with accessibility.",
        results:
          "The rebrand led to a 40% increase in new account openings among millennials and a 25% overall increase in brand consideration scores.",
        images: [
          "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1200&q=80",
          "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1200&q=80",
          "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=1200&q=80",
        ],
      },
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      title: "Video Campaign",
      category: "Video Production",
      description:
        "Emotional storytelling campaign that increased conversions by 75%",
      caseStudy: {
        title: "Emotional Storytelling Video Series",
        client: "Nonprofit Organization",
        description:
          "A series of documentary-style videos that highlighted the real-world impact of the organization's work.",
        challenge:
          "The client needed to increase donations and volunteer sign-ups while building deeper emotional connections with their audience.",
        solution:
          "We created a series of authentic, documentary-style videos that followed the stories of individuals whose lives were changed by the organization.",
        results:
          "The campaign led to a 75% increase in online donations, 120% increase in volunteer applications, and won multiple industry awards for nonprofit marketing.",
        images: [
          "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80",
          "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=1200&q=80",
          "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80",
        ],
      },
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      title: "UX Design",
      category: "Digital Experience",
      description: "E-commerce redesign that improved conversion rates by 120%",
      caseStudy: {
        title: "E-commerce UX Transformation",
        client: "Retail Chain",
        description:
          "A complete overhaul of the client's digital shopping experience across web and mobile platforms.",
        challenge:
          "The client was experiencing high cart abandonment rates and poor mobile conversion despite strong traffic numbers.",
        solution:
          "We conducted extensive user research and developed a streamlined, intuitive shopping experience with particular focus on the checkout process and mobile optimization.",
        results:
          "The redesign led to a 120% increase in conversion rates, 35% decrease in cart abandonment, and 45% increase in average order value.",
        images: [
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
          "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=1200&q=80",
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80",
        ],
      },
    },
  ],
}) => {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCaseStudy = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setSelectedProject(project);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of award-winning campaigns and creative
            solutions that drive real business results.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <PortfolioItem
              key={project.id}
              id={project.id}
              image={project.image}
              title={project.title}
              category={project.category}
              description={project.description}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <CaseStudyModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          caseStudy={{
            title: selectedProject.caseStudy.title,
            client: selectedProject.caseStudy.client,
            description: selectedProject.caseStudy.description,
            challenge: selectedProject.caseStudy.challenge,
            solution: selectedProject.caseStudy.solution,
            results: selectedProject.caseStudy.results,
            images: selectedProject.caseStudy.images,
          }}
        />
      )}
    </section>
  );
};

export default PortfolioGrid;
