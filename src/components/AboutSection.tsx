import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Users, Lightbulb, Target, Award } from "lucide-react";
import { Separator } from "./ui/separator";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  values?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  teamMembers?: Array<{
    name: string;
    role: string;
    image: string;
  }>;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title = "About Our Agency",
  subtitle = "Creative minds, bold ideas",
  description = "We are a collective of strategists, designers, and digital storytellers passionate about transforming brands through innovative advertising. With over a decade of experience, we've helped companies of all sizes make meaningful connections with their audiences through authentic, data-driven campaigns.",
  values = [
    {
      icon: "lightbulb",
      title: "Innovation",
      description:
        "We push boundaries and challenge conventions to create work that stands out.",
    },
    {
      icon: "target",
      title: "Strategy",
      description:
        "Every creative decision is backed by research and strategic thinking.",
    },
    {
      icon: "users",
      title: "Collaboration",
      description:
        "We believe the best ideas emerge when diverse minds work together.",
    },
    {
      icon: "award",
      title: "Excellence",
      description:
        "We hold ourselves to the highest standards in everything we do.",
    },
  ],
  teamMembers = [
    {
      name: "Manish Chaudhary",
      role: "Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    {
      name: "Medha",
      role: "Founder & CEO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
    },
    {
      name: "Nihal Singh",
      role: "Founder & CTO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    },
    {
      name: "Yogesh",
      role: "Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
  ],
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "lightbulb":
        return <Lightbulb className="h-10 w-10 text-primary" />;
      case "target":
        return <Target className="h-10 w-10 text-primary" />;
      case "users":
        return <Users className="h-10 w-10 text-primary" />;
      case "award":
        return <Award className="h-10 w-10 text-primary" />;
      default:
        return <Lightbulb className="h-10 w-10 text-primary" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-6"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </motion.div>
        </motion.div>

        <Separator className="my-16" />

        <motion.div
          className="mb-20"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3
            className="text-3xl font-bold mb-12 text-center text-gray-900"
            variants={itemVariants}
          >
            Our Values
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="mb-4">{getIcon(value.icon)}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900">
                  {value.title}
                </h4>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3
            className="text-3xl font-bold mb-12 text-center text-gray-900"
            variants={itemVariants}
          >
            Meet Our Team
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="mb-4 relative w-40 h-40 mx-auto overflow-hidden rounded-full bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-1 text-gray-900">
                  {member.name}
                </h4>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
