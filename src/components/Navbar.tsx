import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  logo?: string;
  links?: Array<{ title: string; href: string }>;
  contactPhone?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo = "Motion Engineers",
  links = [
    { title: "Home", href: "#" },
    { title: "Work", href: "#portfolio" },
    { title: "About", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Contact", href: "#contact" },
  ],
  contactPhone = "+91 90120-81550",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-black/30 backdrop-blur-sm"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className={`text-2xl font-bold ${isScrolled ? "text-black" : "text-white"}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {logo}
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-black" : "text-white/90 hover:text-white"}`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.title}
              </motion.a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <Button
              variant={isScrolled ? "default" : "outline"}
              className={
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white/20 text-white hover:bg-white/40 border border-white/40"
              }
            >
              <Phone className="mr-2 h-4 w-4" />
              {contactPhone}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? "text-black" : "text-white"}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-800 hover:text-black py-2 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
              <Button className="mt-2 bg-primary text-white hover:bg-primary/90">
                <Phone className="mr-2 h-4 w-4" />
                {contactPhone}
              </Button>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
