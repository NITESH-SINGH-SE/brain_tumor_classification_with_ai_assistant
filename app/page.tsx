"use client";
// import { useTheme } from '@/app/context/ThemeContext';
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { motion } from "motion/react";
import { AuroraBackground } from '@/components/ui/aurora-background';
export default function Home() {
  const words = [
    {
      text: "Brain",
    },
    {
      text: "Tumor",
    },
    {
      text: "Classifier",
    },
    {
      text: "with",
    },
    {
      text: "AI.",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Assistant.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
    
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <TypewriterEffectSmooth words={words} />
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Start Now
        </button>
      </motion.div>
    </AuroraBackground>
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="px-8 py-2 rounded-md bg-blue-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-500">
          Invert it
        </button>
      </div>
    </div>
    </>
  );
}
