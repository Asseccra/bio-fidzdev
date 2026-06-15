import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import SocialQuickIcons from './SocialQuickIcons';

interface ProfileSectionProps {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  themeColor: 'cyan' | 'blue' | 'green' | 'purple';
  whatsApp: string;
  instagram: string;
  tikTok: string;
  email: string;
}

export default function ProfileSection({
  name,
  username,
  bio,
  avatarUrl,
  themeColor,
  whatsApp,
  instagram,
  tikTok,
  email,
}: ProfileSectionProps) {
  // Determine gradient color and glow styles based on themeColor
  const getThemeGlowAndBorder = () => {
    switch (themeColor) {
      case 'blue':
        return {
          glow: 'rgba(59, 130, 246, 0.65)',
          border: 'border-blue-500/80',
          pulse: 'bg-blue-500',
          text: 'text-blue-400',
          gradTo: 'to-blue-400',
          hex: '#3b82f6',
        };
      case 'green':
        return {
          glow: 'rgba(34, 197, 94, 0.65)',
          border: 'border-green-500/80',
          pulse: 'bg-green-500',
          text: 'text-green-400',
          gradTo: 'to-green-400',
          hex: '#22c55e',
        };
      case 'purple':
        return {
          glow: 'rgba(168, 85, 247, 0.65)',
          border: 'border-purple-500/80',
          pulse: 'bg-purple-500',
          text: 'text-purple-400',
          gradTo: 'to-purple-400',
          hex: '#a855f7',
        };
      default:
        return {
          glow: 'rgba(6, 182, 212, 0.65)',
          border: 'border-cyan-500/80',
          pulse: 'bg-cyan-500',
          text: 'text-cyan-400',
          gradTo: 'to-[#00d9ff]',
          hex: '#00d9ff',
        };
    }
  };

  const themeStyles = getThemeGlowAndBorder();

  return (
    <div className="relative flex flex-col items-center text-center px-4 mb-5">
      {/* 1. AVATAR WITH OVERLAP, PULSATIVE RINGS & MOTION FLOATING */}
      <div className="relative -mt-20 md:-mt-28 z-35 mb-5">
        {/* Animated Pulsing Ring 1 */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            border: `2px solid ${themeStyles.glow}`,
            boxShadow: `0 0 20px ${themeStyles.glow}`,
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated Pulsing Ring 2 */}
        <motion.div
          className="absolute -inset-2 rounded-full opacity-35"
          style={{
            border: `1.5px solid ${themeStyles.glow}`,
            boxShadow: `0 0 30px ${themeStyles.glow}`,
          }}
          animate={{
            scale: [1.1, 1.4, 1.1],
            opacity: [0.35, 0, 0.35],
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main Floating Avatar Container */}
        <motion.div
          className="relative rounded-full p-[4px] bg-gradient-to-tr from-white via-white/40 to-transparent"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`relative w-[112px] h-[112px] md:w-[136px] md:h-[136px] rounded-full overflow-hidden border-2 ${themeStyles.border} shadow-[0_0_24px_rgba(0,0,0,0.85)]`}>
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Glowing Badge inside Avatar circle */}
          <div className="absolute right-1 bottom-1 bg-[#0a0f29] rounded-full p-1 border border-white/20 shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${themeStyles.pulse} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${themeStyles.pulse}`}></span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* 2. PROFILE DETAILS */}
      <h1 className="text-2xl md:text-3xl font-sora font-extrabold tracking-tight flex items-center justify-center gap-2 select-none mb-1">
        <span 
          className={`bg-gradient-to-r from-white via-slate-100 ${themeStyles.gradTo} bg-clip-text text-transparent`}
          style={{
            filter: `drop-shadow(0 0 12px ${themeStyles.glow})`
          }}
        >
          {name}
        </span>
        <ShieldCheck className={`w-5.5 h-5.5 fill-[#020512] ${themeStyles.text} inline-block animate-pulse shrink-0`} style={{ filter: `drop-shadow(0 0 8px ${themeStyles.glow})` }} />
      </h1>

      <div className="mt-1 flex flex-wrap items-center gap-2.5 justify-center">
        <span 
          className="font-mono text-xs md:text-sm font-bold tracking-widest text-[#00d9ff] uppercase"
          style={{
            color: themeStyles.hex,
            textShadow: `0 0 10px ${themeStyles.glow}`,
          }}
        >
          {username}
        </span>
        
      </div>

      {/* 3. SOCIAL ICONS QUICK ACCESS */}
      <SocialQuickIcons
        whatsApp={whatsApp}
        instagram={instagram}
        tikTok={tikTok}
        email={email}
        themeColor={themeColor}
      />

      {/* Bio text block with spacing and modern tag layout */}
      <p className="mt-4 max-w-[340px] md:max-w-[420px] text-xs md:text-sm text-slate-300 font-medium leading-relaxed leading-[1.6]">
        {bio.split('•').map((item, index) => (
          <span key={index} className="inline-block mx-1 my-0.5 bg-slate-900/40 border border-white/5 px-2.5 py-1 rounded-full text-slate-300 shadow-sm backdrop-blur-md">
            {item.trim()}
          </span>
        ))}
      </p>

      {/* Custom styled separator lining */}
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-slate-650 to-transparent mt-4 opacity-30 select-none" />
    </div>
  );
}
