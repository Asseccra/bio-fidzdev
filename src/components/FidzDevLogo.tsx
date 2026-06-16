import React from "react";
import { motion } from "motion/react";

export default function FidzDevLogo({
  className = "h-10 md:h-11w-[110px] md:w-[140px]",
}) {
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