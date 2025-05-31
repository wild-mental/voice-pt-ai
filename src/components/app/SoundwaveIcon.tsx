
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SoundwaveIconProps {
  isPlaying: boolean;
  className?: string;
}

const SoundwaveIcon: React.FC<SoundwaveIconProps> = ({ isPlaying, className }) => {
  const [barHeights, setBarHeights] = useState([8, 12, 10, 14, 8]); // Initial static state
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setBarHeights(
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 18) + 6) // Random heights between 6 and 24
        );
      }, 200); // Animation speed
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setBarHeights([8, 12, 10, 14, 8]); // Reset to static state when not playing
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <svg
      width="40"
      height="30"
      viewBox="0 0 40 30"
      className={cn("fill-current", className)} // Color will be inherited (e.g., text-accent)
      aria-hidden="true"
    >
      {barHeights.map((height, index) => (
        <rect
          key={index}
          x={index * 7 + 3} // Bar position and spacing
          y={(30 - height) / 2} // Center the bars vertically based on 30px height
          width="4" // Bar width
          height={height}
          rx="2" // Rounded corners
          className="transition-all duration-150 ease-in-out"
        />
      ))}
    </svg>
  );
};

export default SoundwaveIcon;
