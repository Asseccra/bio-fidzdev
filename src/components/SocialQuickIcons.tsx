import React from 'react';
import { motion } from 'motion/react';

interface SocialQuickIconsProps {
  whatsApp: string;
  instagram: string;
  tikTok: string;
  email: string;
  themeColor: 'cyan' | 'blue' | 'green' | 'purple';
}

export default function SocialQuickIcons({
  whatsApp,
  instagram,
  tikTok,
  email,
  themeColor,
}: SocialQuickIconsProps) {
  
  // Custom neon glow and accent color maps based on main profile theme
  const getThemeColors = () => {
    switch (themeColor) {
      case 'blue':
        return {
          glow: 'rgba(59,130,246,0.2)',
          glowHover: 'rgba(59,130,246,0.65)',
          border: 'border-blue-500/25',
          borderHover: 'hover:border-blue-400',
        };
      case 'green':
        return {
          glow: 'rgba(34,197,94,0.2)',
          glowHover: 'rgba(34,197,94,0.65)',
          border: 'border-green-500/25',
          borderHover: 'hover:border-green-400',
        };
      case 'purple':
        return {
          glow: 'rgba(168,85,247,0.2)',
          glowHover: 'rgba(168,85,247,0.65)',
          border: 'border-purple-500/25',
          borderHover: 'hover:border-purple-400',
        };
      default: // cyan / neon blue style
        return {
          glow: 'rgba(6,182,212,0.25)',
          glowHover: 'rgba(6,182,212,0.7)',
          border: 'border-cyan-500/35',
          borderHover: 'hover:border-cyan-400',
        };
    }
  };

  const themeColors = getThemeColors();

  // Social Items with premium custom-crafted official SVGs
  const socialItems = [
    {
      name: 'Instagram',
      url: instagram,
      colorClass: 'hover:text-[#ff3875] group-hover:text-[#ff3875]',
      glowClass: 'shadow-[0_0_15px_rgba(255,56,117,0.15)] hover:shadow-[0_0_24px_rgba(255,56,117,0.6)] hover:border-[#ff3875]/70',
      svg: (
        <svg className="w-5.5 h-5.5 transition-transform duration-350" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: whatsApp,
      colorClass: 'hover:text-[#25D366] group-hover:text-[#25D366]',
      glowClass: 'shadow-[0_0_15px_rgba(37,211,102,0.15)] hover:shadow-[0_0_24px_rgba(37,211,102,0.6)] hover:border-[#25D366]/70',
      svg: (
        <svg className="w-5.5 h-5.5 transition-transform duration-350" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: tikTok,
      colorClass: 'hover:text-[#00f2fe] group-hover:text-[#00f2fe]',
      glowClass: 'shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:shadow-[0_0_24px_rgba(0,242,254,0.6)] hover:border-[#00f2fe]/70',
      svg: (
        <svg className="w-5.5 h-5.5 transition-transform duration-350" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72c0 87-71.12 157.54-158.74 157.54S8.75 436.38 8.75 349.38s71.12-157.54 158.74-157.54a157 157 0 0 1 31.62 3.19v81.82a76.4 76.4 0 0 0-31.62-6.59c-42.34 0-76.81 34.45-76.81 76.8 0 42.35 34.47 76.8 76.81 76.8 41.6 0 75.43-32.96 76.8-74.45V0h81.33a129.56 129.56 0 0 0 128.62 128.62z"/>
        </svg>
      )
    },
    {
      name: 'Gmail',
      url: email,
      colorClass: 'hover:text-[#ea4335] group-hover:text-[#ea4335]',
      glowClass: 'shadow-[0_0_15px_rgba(234,67,53,0.15)] hover:shadow-[0_0_24px_rgba(234,67,53,0.6)] hover:border-[#ea4335]/70',
      svg: (
        <svg className="w-5.5 h-5.5 transition-transform duration-350" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322.2 312.5c-19.3 15.8-43.1 24.5-67.8 24.5s-48.4-8.7-67.8-24.5L48 212.2z"/>
        </svg>
      )
    },
  ];

  // Framer motion variants to make icons enter one-by-one with fade-in + slide-down (0.4s)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 110,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center gap-3 mt-5 px-1 pb-1"
    >
      {socialItems.map((item) => (
        <motion.a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            y: -4,
          }}
          whileTap={{ scale: 0.94 }}
          className={`group flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-950/45 border backdrop-blur-md text-slate-350 transition-all duration-350 cursor-pointer ${themeColors.border} ${item.glowClass} ${item.colorClass}`}
          title={item.name}
        >
          {item.svg}
        </motion.a>
      ))}
    </motion.div>
  );
}
