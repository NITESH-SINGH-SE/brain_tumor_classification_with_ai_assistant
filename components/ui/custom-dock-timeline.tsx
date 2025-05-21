"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FloatingDock } from "./floating-dock";
import type { ReactNode } from "react";

export interface DockTimelineEntry {
  title: string;
  navbarTitle: string;
  icon: ReactNode;
  content: ReactNode;
}

export const DockControlledTimeline = ({
  items,
  heading = "How It Works",
  subheading = "",
}: {
  items: DockTimelineEntry[];
  heading?: string;
  subheading?: string;
}) => {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);

  // Set beam height based on rendered timeline height
  useEffect(() => {
    if (beamRef.current) {
      const rect = beamRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [beamRef]);

  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Dock click behavior
  const scrollToIndex = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dockItems = items.map((item, index) => ({
    title: item.navbarTitle,
    icon: (
      <button
        onClick={() => scrollToIndex(index)}
        className="w-full h-full flex items-center justify-center"
        aria-label={`Go to ${item.title}`}
      >
        {item.icon}
      </button>
    ),
    href: "#",
  }));

  return (
    <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10 relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          {heading}
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-lg">
          {subheading}
        </p>
      </div>

      {/* Timeline Section */}
      <div
        ref={timelineContainerRef}
        className="relative max-w-7xl mx-auto pb-32"
      >
        <div ref={beamRef}>
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="flex justify-start pt-10 md:pt-40 md:gap-10 scroll-mt-24"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          ))}
        </div>

        {/* Tracing Beam */}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>

      {/* Floating Dock */}
      <FloatingDock
        items={dockItems}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        mobileClassName="fixed bottom-4 right-4 z-50"
      />
    </div>
  );
};
