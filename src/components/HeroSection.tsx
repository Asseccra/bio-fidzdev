import React from 'react';

interface HeroSectionProps {
  coverUrl: string;
  themeColor: 'cyan' | 'blue' | 'green' | 'purple';
}

export default function HeroSection({ coverUrl }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden rounded-t-[24px] md:rounded-t-[36px] border-0 outline-none shadow-none">
      {/* 1. Crisp, High-Quality Cover Image */}
      <img
        src={coverUrl}
        alt="FidzDev Hero Cover"
        className="w-full h-full object-cover select-none object-[center_32%]"
        referrerPolicy="no-referrer"
      />

      {/* 2. Premium Vignette Effect over Cover Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 217, 255, 0.08), rgba(2, 6, 23, 0.65) 85%)'
        }}
      />

      {/* 3. Deep Cinematic Progressive Gradient Overlay (Fading 45% of the image bottom seamlessly) */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.15) 35%, rgba(2, 6, 23, 0.55) 58%, rgba(2, 6, 23, 0.85) 75%, rgba(2, 6, 23, 1) 100%)'
        }}
      />
    </div>
  );
}
