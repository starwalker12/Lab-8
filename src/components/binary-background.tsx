"use client"
import React, { useEffect, useState } from 'react';

export function BinaryBackground() {
  const [digits, setDigits] = useState<{ id: number; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const generateDigits = () => {
      const newDigits = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 5 + 5}s`,
        delay: `${Math.random() * 5}s`,
      }));
      setDigits(newDigits);
    };

    generateDigits();
    const interval = setInterval(generateDigits, 10000); // Refresh digits every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {digits.map(digit => (
        <span
          key={digit.id}
          className="binary-digit absolute text-primary opacity-20 dark:opacity-10"
          style={{
            left: digit.left,
            animationDuration: digit.duration,
            animationDelay: digit.delay,
            bottom: '-10px',
            fontSize: `${Math.random() * 16 + 10}px`,
          }}
        >
          {Math.round(Math.random())}
        </span>
      ))}
    </div>
  );
}
