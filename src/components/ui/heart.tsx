import React, { useState, useEffect } from 'react';

interface HeartProps {
  size?: number;
  className?: string;
  isAnimated?: boolean;
}

export function Heart({ size = 32, className = '', isAnimated = true }: HeartProps) {
  const [color, setColor] = useState('hsla(var(--ali) / 0.7)');
  const [isBeating, setIsBeating] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Change color periodically for dynamic effect
  useEffect(() => {
    if (!isAnimated) return;
    
    // Only do subtle color changes if not clicked
    const colorInterval = setInterval(() => {
      if (clickCount === 0) {
        const hue = Math.floor(Math.random() * 60) + 160; // Stay in blue-green range
        setColor(`hsla(${hue}, 70%, 60%, 0.8)`);
      }
    }, 3000);
    
    return () => clearInterval(colorInterval);
  }, [isAnimated, clickCount]);
  
  // Handle click animation and color change
  const handleClick = () => {
    if (isBeating) return;
    
    setIsBeating(true);
    setClickCount(prev => prev + 1);
    
    // Change to a vibrant color based on click count
    const colors = [
      'hsla(340, 90%, 60%, 0.9)', // Red
      'hsla(40, 90%, 60%, 0.9)',  // Orange/gold
      'hsla(290, 90%, 60%, 0.9)', // Purple
      'hsla(190, 90%, 70%, 0.9)', // Light blue
      'hsla(120, 90%, 50%, 0.9)'  // Green
    ];
    
    const colorIndex = clickCount % colors.length;
    setColor(colors[colorIndex]);
    
    // Add a Easter egg message after 5 clicks
    if (clickCount === 4) {
      setTimeout(() => {
        const message = document.createElement('div');
        message.className = 'text-xs mt-1 animate-fadeIn';
        message.textContent = '💖 You found me! 💖';
        const heartElement = document.querySelector('.heart-container');
        heartElement?.parentNode?.appendChild(message);
        
        // Clean up message after 3 seconds
        setTimeout(() => {
          message.classList.add('opacity-0');
          setTimeout(() => message.remove(), 500);
        }, 3000);
      }, 500);
    }
    
    // Reset the beating state after animation completes
    setTimeout(() => setIsBeating(false), 1000);
  };

  return (
    <div
      className={`heart-container inline-block transform transition-transform duration-300 cursor-pointer ${
        isBeating ? 'animate-heartbeat' : 'animate-pulse'
      } ${className}`}
      onClick={handleClick}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
      }}
      role="img"
      aria-label="Heart"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill={color}
        className="w-full h-full"
        style={{ 
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.2))',
          transition: 'fill 0.5s ease'
        }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
} 