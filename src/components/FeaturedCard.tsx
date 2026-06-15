import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, ChevronRight, Sparkles } from 'lucide-react';
import { THEMING } from '../types';

interface FeaturedCardProps {
  url: string;
  title: string;
  description: string;
  themeColor: 'cyan' | 'blue' | 'green' | 'purple';
}

export default function FeaturedCard({ url, title, description, themeColor }: FeaturedCardProps) {
  const currentTheme = THEMING[themeColor];

  // Map theme colors to specific Tailwind shine elements
  const getGlowStyles = () => {
    switch (themeColor) {
      case 'blue':
        return {
          glow: 'shadow-[0_0_25px_rgba(59,130,246,0.55)]',
          badge: 'bg-blue-500/20 text-blue-400 border-blue-400/40',
          gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
          textGlow: 'group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.55)]',
          border: 'border-blue-400/60',
          textHover: 'group-hover:text-blue-200',
          recText: 'text-blue-300',
        };
      case 'green':
        return {
          glow: 'shadow-[0_0_25px_rgba(34,197,94,0.55)]',
          badge: 'bg-green-500/20 text-green-400 border-green-400/40',
          gradient: 'from-green-500/20 via-green-500/5 to-transparent',
          textGlow: 'group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.55)]',
          border: 'border-green-400/60',
          textHover: 'group-hover:text-green-200',
          recText: 'text-green-300',
        };
      case 'purple':
        return {
          glow: 'shadow-[0_0_25px_rgba(168,85,247,0.55)]',
          badge: 'bg-purple-500/20 text-purple-400 border-purple-400/40',
          gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
          textGlow: 'group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.55)]',
          border: 'border-purple-400/60',
          textHover: 'group-hover:text-purple-200',
          recText: 'text-purple-300',
        };
      default: // cyan
        return {
          glow: 'shadow-[0_0_25px_rgba(6,182,212,0.55)]',
          badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/40',
          gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
          textGlow: 'group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.55)]',
          border: 'border-cyan-400/60',
          textHover: 'group-hover:text-cyan-200',
          recText: 'text-cyan-300',
        };
    }
  };

  const themeStyles = getGlowStyles();

  return (
    <div className="w-full max-w-lg mx-auto px-4 mb-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0d153a] via-[#090f2b]/90 to-[#0b1030] border-2 border-cyan-400/50 p-5 shadow-[0_4px_30px_rgba(0,0,0,0.6)] cursor-pointer"
        style={{
          borderColor: themeColor === 'blue' ? 'rgba(59,130,246,0.6)' : themeColor === 'green' ? 'rgba(34,197,94,0.6)' : themeColor === 'purple' ? 'rgba(168,85,247,0.6)' : 'rgba(6,182,212,0.6)',
        }}
      >
        {/* 1. NEON GLOW EXPONENTATION & INNER AMBIENCE */}
        <div className="absolute inset-0 bg-cyan-950/10 mix-blend-color-dodge opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Soft backlighting */}
        <div className={`absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr ${themeStyles.gradient} rounded-full blur-[20px] opacity-35 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`} />

        {/* 2. SHINE ANIMATION SHEET (Reflective diagonal sweep) */}
        <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:animate-[shineSweep_1.6s_ease-in-out_infinite] pointer-events-none bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {/* 3. CARD GRID LAYOUT */}
        <div className="relative flex items-center gap-4">
          
          {/* Main glowing gamepad controller icon: 48px × 48px (w-12 h-12), rounded-[14px], dark glass background, border tipis cyan, glow saat hover, scale 1.08 saat hover */}
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 group-hover:border-cyan-400/80 transition-all duration-300 group-hover:scale-[1.08] shrink-0 group-hover:shadow-[0_0_14px_rgba(6,182,212,0.45)]">
            <svg className="w-6 h-6 text-cyan-400 transition-transform duration-300 animate-bounce" style={{ animationDuration: '3s', filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.4))' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="12" x2="10" y2="12" />
              <line x1="8" y1="10" x2="8" y2="14" />
              <line x1="15" y1="13" x2="15.01" y2="13" />
              <line x1="18" y1="11" x2="18.01" y2="11" />
              <rect x="2" y="6" width="20" height="12" rx="3" ry="3" />
            </svg>
          </div>

          {/* Titles & Badge */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-mono font-black tracking-widest px-2 py-0.5 rounded-md border ${themeStyles.badge}`}>
                TOP UP
              </span>
              <span className={`flex items-center gap-0.5 text-[9px] font-mono font-bold tracking-widest uppercase animate-pulse ${themeStyles.recText}`}>
                <Sparkles className="w-2.5 h-2.5 inline" /> RECOMMENDED
              </span>
            </div>
            
            <h3 className={`text-base md:text-lg font-bold text-white tracking-tight transition-all duration-300 flex items-center gap-1 ${themeStyles.textHover} ${themeStyles.textGlow}`}>
              {title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed mt-0.5 group-hover:text-white transition-colors duration-300">
              {description}
            </p>
          </div>

          {/* Interactive Arrow Indicator */}
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/5 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:translate-x-1 transition-all duration-350">
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </a>

      <style>{`
        @keyframes shineSweep {
          0% {
            transform: translateX(-100%) skewX(-30deg);
          }
          100% {
            transform: translateX(100%) skewX(-30deg);
          }
        }
      `}</style>
    </div>
  );
}
