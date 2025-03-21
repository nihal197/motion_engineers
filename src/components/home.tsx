import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import PortfolioGrid from "./PortfolioGrid";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import { Hero } from './Hero';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Portfolio Section */}
      <div id="portfolio">
        <PortfolioGrid />
      </div>

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <div className="py-20 px-4 bg-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Reach out to discuss how we can help elevate your brand and drive
              results.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
