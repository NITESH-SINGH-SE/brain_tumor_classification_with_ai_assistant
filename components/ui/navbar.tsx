'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { TypewriterEffectSmooth } from "./typewriter-effect"
import { TypewriterEffectSmoothResponsive } from "./custom-typewriter";

export default function Navbar() {
    const words = [
    {
      text: "Brain",
      className: "text-lg",
    },
    {
      text: "Tumor",
      className: "text-lg",
    },
    {
      text: "Classifier",
      className: "text-lg",
    },
    {
      text: "with",
      className: "text-lg",
    },
    {
      text: "AI.",
      className: "text-blue-500 text-lg dark:text-blue-500",
    },
    {
      text: "Assistant.",
      className: "text-blue-500 text-lg dark:text-blue-500",
    },
  ];

  const router = useRouter();

  const handleReload = () => {
    router.reload(); // Reloads the current page
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-8 flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* <span className="font-bold">Amane Soft</span> */}
          {/* <TypewriterEffectSmooth words={words} className="text-lg" cursorClassName="h-[1.5rem]"/> */}
          <TypewriterEffectSmoothResponsive
            textSize="lg"
            words={words}
        />  
        </Link>
        <div>
          <button onClick={handleReload} className="px-4 py-2 rounded-xl border border-neutral-400 text-sm transition duration-200">
            Reset
          </button>
        </div>
      </div>
    </header>
  )
}
