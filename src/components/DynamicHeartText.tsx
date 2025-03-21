import React, { useState, useEffect } from 'react';
import { PulsingHeart } from './ui/PulsingHeart';

export function DynamicHeartText({ className = '' }: { className?: string }) {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    // Animate through phases
    const interval = setInterval(() => {
      setPhase(prev => (prev < 4 ? prev + 1 : prev));
    }, 700);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`flex items-center justify-center gap-2 text-2xl md:text-3xl my-6 ${className}`}>
      <span 
        className={`transition-all duration-500 transform ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } font-medium`}
        style={{ transitionDelay: '0ms' }}
      >
        Me
      </span>
      <span 
        className={`transition-all duration-500 transform ${
          phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } font-medium`}
        style={{ transitionDelay: '200ms' }}
      >
        +
      </span>
      <span 
        className={`transition-all duration-500 transform ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } font-medium`}
        style={{ transitionDelay: '400ms' }}
      >
        You
      </span>
      <span 
        className={`transition-all duration-500 transform ${
          phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } font-medium`}
        style={{ transitionDelay: '600ms' }}
      >
        =
      </span>
      {phase >= 4 && (
        <div 
          className={`transition-all duration-500 opacity-0 translate-y-4 ${
            phase >= 4 ? 'opacity-100 translate-y-0' : ''
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <PulsingHeart size={36} />
        </div>
      )}
    </div>
  );
} 