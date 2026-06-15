export interface ProfileConfig {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  whatsApp: string;
  instagram: string;
  tikTok: string;
  email: string;
  topUpUrl: string;
  topUpTitle: string;
  topUpDesc: string;
  themeColor: 'cyan' | 'blue' | 'green' | 'purple';
}

export const DEFAULT_PROFILE: ProfileConfig = {
  name: 'Hafidh / FidzDev',
  username: '@fidzdev',
  bio: 'Mahasiswa IT • Web Developer • Digital Creator • Top Up Game',
  avatarUrl: '/pp.jpeg', // Beautiful high quality avatar face
  coverUrl: '/bg.jpeg', // Breathtaking dark cyan fluid glow
  whatsApp: 'https://wa.me/6285640611921',
  instagram: 'https://instagram.com/haofizzz',
  tikTok: 'https://tiktok.com/@anakbaek376',
  email: 'mailto:jigongasem3@gmail.com',
  topUpUrl: 'https://coming-soon-1-amber.vercel.app/', // Demo topup link
  topUpTitle: 'Website Top Up Resmi',
  topUpDesc: 'Top Up Game Murah, Cepat & Aman. Proses Otomatis 24 Jam Terpercaya.',
  themeColor: 'cyan',
};

export interface ThemeColors {
  glow: string;
  border: string;
  text: string;
  bgGlow: string;
  gradient: string;
  shadow: string;
}

export const THEMING: Record<ProfileConfig['themeColor'], ThemeColors> = {
  cyan: {
    glow: 'rgba(6, 182, 212, 0.4)',
    border: 'border-cyan-500/50 hover:border-cyan-400',
    text: 'text-cyan-400',
    bgGlow: 'bg-cyan-500/20',
    gradient: 'from-cyan-500 to-blue-600',
    shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
  },
  blue: {
    glow: 'rgba(59, 130, 246, 0.4)',
    border: 'border-blue-500/50 hover:border-blue-400',
    text: 'text-blue-400',
    bgGlow: 'bg-blue-500/20',
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
  },
  green: {
    glow: 'rgba(34, 197, 94, 0.4)',
    border: 'border-green-500/50 hover:border-green-400',
    text: 'text-green-400',
    bgGlow: 'bg-green-500/20',
    gradient: 'from-green-500 to-emerald-600',
    shadow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
  },
  purple: {
    glow: 'rgba(168, 85, 247, 0.4)',
    border: 'border-purple-500/50 hover:border-purple-400',
    text: 'text-purple-400',
    bgGlow: 'bg-purple-500/20',
    gradient: 'from-purple-500 to-pink-600',
    shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  },
};
