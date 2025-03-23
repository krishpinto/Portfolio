"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  const renderWords = () => {
    return words.split(/\s+/).map((word, idx) => (
      <motion.span
        key={word + idx}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          delay: idx * 0.1,
          ease: [0.4, 0.6, 0.2, 1],
        }}
        className={cn("inline-block", className)}
        style={{ marginRight: '0.3em' }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <div ref={containerRef} className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};