import React, { useState, useEffect } from 'react';
import { Heart } from './ui/heart';

interface DynamicTextProps {
  className?: string;
}

export function DynamicText({ className = '' }: DynamicTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [textPart, setTextPart] = useState(0);
  const textParts = ['Me', '+', 'You', '='];
  
  useEffect(() => {
    // Fade in after mounting
    const visibleTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    // Start text animation after fading in
    const textTimer = setInterval(() => {
      setTextPart(prev => {
        if (prev < textParts.length - 1) {
          return prev + 1;
        }
        clearInterval(textTimer);
        return prev;
      });
    }, 700);
    
    return () => {
      clearTimeout(visibleTimer);
      clearInterval(textTimer);
    };
  }, []);
  
  // Simple accessibility enhancement
  const ariaLabel = "Me plus You equals Heart";
  
  return (
    <div 
      className={`dynamic-text-container text-2xl md:text-3xl lg:text-4xl font-medium transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-label={ariaLabel}
    >
      {textParts.slice(0, textPart + 1).map((part, index) => (
        <span 
          key={index}
          className={`transition-all duration-500 ${index <= textPart ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          {part}
        </span>
      ))}
      
      {textPart === textParts.length - 1 && (
        <Heart 
          size={40} 
          className="ml-1 transform transition-all duration-700 opacity-100 scale-100"
        />
      )}
    </div>
  );
} 