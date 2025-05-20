"use client";
import { useTheme } from '@/app/context/ThemeContext';
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
export default function Home() {
  const { theme, toggleTheme } = useTheme();
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
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded"
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
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
