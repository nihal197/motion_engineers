import React, { useState, useRef, useEffect } from 'react';

interface PulsingHeartProps {
  size?: number;
  initialColor?: string;
  activeColor?: string;
  className?: string;
  onHeartbeat?: () => void;
}

export function PulsingHeart({
  size = 100,
  initialColor = '#e74c3c',
  activeColor = '#c0392b',
  className = '',
  onHeartbeat
}: PulsingHeartProps) {
  const [isBeating, setIsBeating] = useState(false);
  const debounceTimerRef = useRef<number | null>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  // Clear debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const triggerHeartbeat = () => {
    if (isBeating || debounceTimerRef.current) return;

    setIsBeating(true);
    onHeartbeat?.();
    
    // Debounce to prevent rapid successive triggers
    debounceTimerRef.current = window.setTimeout(() => {
      setIsBeating(false);
      debounceTimerRef.current = null;
    }, 800); // Match animation duration
  };

  // Handle keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerHeartbeat();
    }
  };

  return (
    <svg
      ref={heartRef}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${isBeating ? 'animate-heartbeat' : 'animate-pulse'} ${className}`}
      onClick={triggerHeartbeat}
      onTouchStart={triggerHeartbeat}
      role="button"
      aria-label="Interactive heart" 
      aria-pressed={isBeating}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ 
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
        cursor: 'pointer',
      }}
    >
      <path
        d="M10 30 A20 20 0 0 1 50 30 A20 20 0 0 1 90 30 Q90 60 50 90 Q10 60 10 30 Z"
        fill={isBeating ? activeColor : initialColor}
        stroke={isBeating ? initialColor : activeColor}
        strokeWidth="2"
        style={{ 
          transition: 'fill 0.3s ease, stroke 0.3s ease'
        }}
      />
    </svg>
  );
} 