"use client";

import { motion } from "framer-motion";
import { FC } from "react";

interface FloatingPathsProps {
  position: number;
  pathColor: string;
  count: number;
  baseOpacity: number;
  baseStrokeWidth: number;
}

const FloatingPaths: FC<FloatingPathsProps> = ({
  position,
  pathColor,
  count,
  baseOpacity,
  baseStrokeWidth,
}) => {
  const paths = Array.from({ length: count }, (_, i) => {
    const offset = i * 5 * position;
    const yOffset = i * 6;

    return {
      id: i,
      d: `M-${380 - offset} -${189 + yOffset}C-${380 - offset} -${189 + yOffset} -${
        312 - offset
      } ${216 - yOffset} ${152 - offset} ${343 - yOffset}C${
        616 - offset
      } ${470 - yOffset} ${684 - offset} ${875 - yOffset} ${684 - offset} ${875 - yOffset}`,
      opacity: baseOpacity + i * 0.03,
      width: baseStrokeWidth + i * 0.03,
    };
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 696 316" fill="none">
      <title>Background Floating Paths</title>
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke={pathColor}
          strokeWidth={path.width}
          strokeOpacity={path.opacity}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
};

interface BackgroundFloatingPathsProps {
  className?: string;
  color?: string;
  count?: number;
  baseOpacity?: number;
  baseStrokeWidth?: number;
}

const BackgroundFloatingPaths: FC<BackgroundFloatingPathsProps> = ({
  className,
  color = "currentColor",
  count = 36,
  baseOpacity = 0.1,
  baseStrokeWidth = 0.5,
}) => {
  return (
    <div className={`absolute inset-0 ${className ?? ""}`}>
      <FloatingPaths
        position={1}
        pathColor={color}
        count={count}
        baseOpacity={baseOpacity}
        baseStrokeWidth={baseStrokeWidth}
      />
      <FloatingPaths
        position={-1}
        pathColor={color}
        count={count}
        baseOpacity={baseOpacity}
        baseStrokeWidth={baseStrokeWidth}
      />
    </div>
  );
};

export default BackgroundFloatingPaths;