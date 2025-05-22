import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LockableCardProps = {
  lockedIcon: React.ReactNode;
  lockedText: string;
  unlockedIcon: React.ReactNode;
  unlockedText: string;
  content: React.ReactNode;
  unlockCondition: boolean;
  onUnlock?: () => void;
  lockIconColor?: string;
  lockIconColorDark?: string;
  unlockIconColor?: string;
  unlockIconColorDark?: string;
};

export default function LockableCard({
  lockedIcon,
  lockedText,
  unlockedIcon,
  unlockedText,
  content,
  unlockCondition,
  onUnlock,
  lockIconColor = "text-red-500",
  lockIconColorDark = "dark:text-red-400",
  unlockIconColor = "text-green-600",
  unlockIconColorDark = "dark:text-green-400",
}: LockableCardProps) {
  const [phase, setPhase] = useState<"locked" | "rotating" | "unlocked" | "content" | "shake">("locked");

  const cardClasses =
    "shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-neutral-800";

  useEffect(() => {
    if (phase === "rotating") {
      setTimeout(() => setPhase("unlocked"), 600);
    }
    if (phase === "unlocked") {
      setTimeout(() => setPhase("content"), 800);
    }
    if (phase === "shake") {
      setTimeout(() => setPhase("locked"), 600);
    }
  }, [phase]);

  // When unlockCondition is false, show locked with shake animation on click
  if (!unlockCondition) {
    return (
      <motion.div
        className={cardClasses + " cursor-pointer select-none"}
        onClick={() => {
          if (phase !== "shake") setPhase("shake");
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence mode="wait">
          {(phase === "locked" || phase === "shake") && (
            <motion.div
              className={`${lockIconColor} ${lockIconColorDark} flex justify-center`}
              key={phase}
              initial={{ x: 0 }}
              animate={
                phase === "shake"
                  ? { x: [0, -10, 10, -10, 10, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.6 }}
            >
              {lockedIcon}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.p
          className="text-center text-lg text-gray-700 dark:text-gray-300 mt-2 select-none"
          key={phase + "-text"}
          initial={{ x: 0 }}
          animate={
            phase === "shake"
              ? { x: [0, -10, 10, -10, 10, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.6 }}
        >
          {lockedText}
        </motion.p>
      </motion.div>
    );
  }

  // unlockCondition === true => locked icon color = unlockIconColor and text = unlockedText during locked phase
  return (
    <motion.div
      className={`${cardClasses} cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition`}
      onClick={() => {
          if (phase === "locked" && unlockCondition) {
            setPhase("rotating");
            if (onUnlock) onUnlock();  // <-- call onUnlock callback here
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {phase === "locked" && (
          <motion.div
            key="locked"
            className={`${unlockIconColor} ${unlockIconColorDark} flex justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {lockedIcon}
          </motion.div>
        )}

        {phase === "rotating" && (
          <motion.div
            key="rotating"
            className={`${unlockIconColor} ${unlockIconColorDark} flex justify-center`}
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: 360, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {lockedIcon}
          </motion.div>
        )}

        {phase === "unlocked" && (
          <motion.div
            key="unlocked"
            className={`${unlockIconColor} ${unlockIconColorDark} flex justify-center`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {unlockedIcon}
          </motion.div>
        )}

        {phase === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>

      {phase !== "content" && (
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mt-2 select-none">
          {/* Show unlockedText if unlockCondition true and phase locked, else lockedText */}
          {phase === "locked" ? unlockedText : unlockedText}
        </p>
      )}
    </motion.div>
  );
}
