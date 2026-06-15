import React from 'react';
import * as Icons from 'lucide-react';

interface MenuCardProps {
  title: string;
  description: string;
  iconName: string;
  url: string;
  themeColor: 'cyan' | 'blue' | 'green' | 'purple';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function MenuCard({
  title,
  description,
  iconName,
  url,
  themeColor,
  onClick,
}: MenuCardProps) {
  
  // Custom menu styling specifics matching themeColor
  const getThemeSpecifics = () => {
    switch (themeColor) {
      case 'blue':
        return {
          hoverBgGlow: 'hover:border-blue-500/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]',
          iconBorder: 'border-blue-500/30 group-hover:border-blue-400/80 group-hover:shadow-[0_0_14px_rgba(59,130,246,0.45)]',
          textHover: 'group-hover:text-blue-200 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.55)]',
        };
      case 'green':
        return {
          hoverBgGlow: 'hover:border-green-500/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.25)]',
          iconBorder: 'border-green-500/30 group-hover:border-green-400/80 group-hover:shadow-[0_0_14px_rgba(34,197,94,0.45)]',
          textHover: 'group-hover:text-green-200 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.55)]',
        };
      case 'purple':
        return {
          hoverBgGlow: 'hover:border-purple-500/50 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]',
          iconBorder: 'border-purple-500/30 group-hover:border-purple-400/80 group-hover:shadow-[0_0_14px_rgba(168,85,247,0.45)]',
          textHover: 'group-hover:text-purple-200 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.55)]',
        };
      default: // cyan
        return {
          hoverBgGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]',
          iconBorder: 'border-cyan-500/30 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_14px_rgba(6,182,212,0.45)]',
          textHover: 'group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.55)]',
        };
    }
  };

  const themeSpecifics = getThemeSpecifics();

  const renderIcon = () => {
    const key = iconName.toLowerCase();
    
    if (key.includes('whatsapp') || key === 'messagesquare') {
      return (
        <svg className="w-5.5 h-5.5 text-[#25D366] transition-transform duration-300" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      );
    }
    
    if (key.includes('instagram')) {
      return (
        <svg className="w-5.5 h-5.5 transition-transform duration-300" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="instagram-gradient-card" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fec564" />
              <stop offset="25%" stopColor="#fda085" />
              <stop offset="50%" stopColor="#f35084" />
              <stop offset="75%" stopColor="#c53193" />
              <stop offset="100%" stopColor="#8a3ab9" />
            </linearGradient>
          </defs>
          <path fill="url(#instagram-gradient-card)" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
        </svg>
      );
    }
    
    if (key.includes('tiktok') || key === 'video') {
      return (
        <svg className="w-5.5 h-5.5 text-white transition-transform duration-300" stroke="#ff0050" strokeWidth="1" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(-1px -1px 0 #00f2fe) drop-shadow(1px 1px 0 #ff0050)' }}>
          <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72c0 87-71.12 157.54-158.74 157.54S8.75 436.38 8.75 349.38s71.12-157.54 158.74-157.54a157 157 0 0 1 31.62 3.19v81.82a76.4 76.4 0 0 0-31.62-6.59c-42.34 0-76.81 34.45-76.81 76.8 0 42.35 34.47 76.8 76.81 76.8 41.6 0 75.43-32.96 76.8-74.45V0h81.33a129.56 129.56 0 0 0 128.62 128.62z"/>
        </svg>
      );
    }
    
    if (key.includes('mail') || key.includes('email') || key.includes('gmail')) {
      return (
        <svg className="w-5.5 h-5.5 text-[#ea4335] transition-transform duration-300" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322.2 312.5c-19.3 15.8-43.1 24.5-67.8 24.5s-48.4-8.7-67.8-24.5L48 212.2z"/>
        </svg>
      );
    }
    
    if (key === 'person' || key === 'user' || key.includes('about')) {
      return (
        <span 
          className="text-xl select-none leading-none"
          style={{ 
            filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.75))',
            textShadow: '0 0 12px rgba(6,182,212,0.6)'
          }}
        >
          👤
        </span>
      );
    }

    if (key.includes('portfolio') || key.includes('laptop') || key.includes('code') || key.includes('briefcase')) {
      return (
        <svg className="w-5.5 h-5.5 text-cyan-400 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.4))' }}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M9 8l-3 3 3 3M15 8l3 3-3 3" />
        </svg>
      );
    }
    
    if (key.includes('gamepad') || key.includes('game')) {
      return (
        <svg className="w-6 h-6 text-cyan-400 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.4))' }}>
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <line x1="15" y1="13" x2="15.01" y2="13" />
          <line x1="18" y1="11" x2="18.01" y2="11" />
          <rect x="2" y="6" width="20" height="12" rx="3" ry="3" />
        </svg>
      );
    }

    // Fallback to Lucide React component
    const LucideIcon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return LucideIcon ? <LucideIcon className="w-5.5 h-5.5" /> : null;
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 mb-3.5">
      <a
        href={url}
        target={url.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={onClick}
        className={`group flex items-center justify-between gap-4 p-4.5 rounded-[24px] bg-[#070b22]/55 backdrop-blur-xl border border-white/5 shadow-md cursor-pointer transform hover:-translate-y-1 hover:scale-[1.015] transition-all duration-350 ease-out ${themeSpecifics.hoverBgGlow}`}
      >
        {/* Dynamic Glowing background flare on hover */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-white/0 to-white/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

        {/* Card Content Grid */}
        <div className="flex items-center gap-4 min-w-0">
          
          {/* Glowing Icon plate container: 48px × 48px (w-12 h-12), rounded-[14px], dark glass background, border tipis cyan, glow saat hover, scale 1.08 saat hover */}
          <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center bg-slate-950/75 backdrop-blur-md border transition-all duration-300 group-hover:scale-[1.08] shrink-0 ${themeSpecifics.iconBorder}`}>
            {renderIcon()}
          </div>

          {/* Texts (Title & subtitle/description) */}
          <div className="min-w-0">
            <h3 className={`text-sm md:text-base font-sans font-semibold text-white tracking-tight transition-all duration-250 ${themeSpecifics.textHover}`}>
              {title}
            </h3>
            <p className="text-xs md:text-[13px] text-white/65 group-hover:text-white transition-colors duration-250 font-medium truncate">
              {description}
            </p>
          </div>

        </div>

        {/* Small floating right arrow */}
        <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 group-hover:translate-x-0.5 transition-all duration-350">
          <Icons.ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-all" />
        </div>
      </a>
    </div>
  );
}
