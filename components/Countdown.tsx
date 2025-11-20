'use client';

/**
 * Countdown Component
 * 
 * Displays a countdown timer to a target date.
 * Updates every second with days, hours, minutes, and seconds.
 */

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return String(num).padStart(2, '0');
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 w-full flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center leading-none">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide text-center">
              Días
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 w-full flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center leading-none">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide text-center">
              Horas
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 w-full flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center leading-none">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide text-center">
              Min
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 w-full flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center leading-none">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide text-center">
              Seg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

