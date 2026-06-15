import React from "react";
import { motion } from "motion/react";

interface FidzDevLogoProps {
  className?: string;
  themeColor?: "cyan" | "blue" | "green" | "purple";
}

export default function FidzDevLogo({
  className = "h-10 w-10 md:h-12 md:w-12",
}: FidzDevLogoProps) {
  return (
    <motion.img
  src="/logo.png"
  alt="FidzDev Logo"
  className={`${className} object-contain scale-[1.1] origin-left`}
  animate={{ y: [0, -4, 0] }}
  transition={{
    duration: 3.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
  );
}