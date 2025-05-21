"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type WordType = {
  text: string;
  className?: string;
};

type Props = {
  words: WordType[];
  className?: string;
  cursorClassName?: string;
  textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
};

const textSizeMap: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const cursorHeightMap: Record<string, string> = {
  xs: "h-[0.6rem]",
  sm: "h-[0.8rem]",
  base: "h-[1rem]",
  lg: "h-[1.2rem]",
  xl: "h-[1.4rem]",
  "2xl": "h-[1.6rem]",
  "3xl": "h-[2rem]",
  "4xl": "h-[2.4rem]",
  "5xl": "h-[2.8rem]",
};


export const TypewriterEffectSmoothResponsive = ({
  words,
  className,
  cursorClassName,
  textSize = "base",
}: Props) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div
      className={cn(
        "inline-flex items-baseline space-x-1 my-6",
        className
      )}
    >
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className={cn(
            "whitespace-nowrap font-bold leading-none",
            textSizeMap[textSize]
          )}
        >
          {wordsArray.map((word, idx) => (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn("dark:text-white text-black", word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          ))}
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block align-baseline rounded-sm w-[3px] bg-blue-500",
          cursorHeightMap[textSize],
          cursorClassName
        )}
      />
    </div>
  );
};
