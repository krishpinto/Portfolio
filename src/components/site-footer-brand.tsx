"use client"

import { motion, useMotionValue, useSpring } from "motion/react"

const VIEWBOX_WIDTH = 1410
const DEFAULT_GRADIENT_X = 705

const generateKrishPath = () => {
  const chars: Record<string, string[]> = {
    'K': ['XX   XX', 'XX  XX ', 'XXXXX  ', 'XXXX   ', 'XXXX   ', 'XXXXX  ', 'XX  XX ', 'XX   XX'],
    'R': ['XXXXXX ', 'XX   XX', 'XX   XX', 'XXXXXX ', 'XXXXX  ', 'XX XX  ', 'XX  XX ', 'XX   XX'],
    'I': [' XXXX ', '  XX  ', '  XX  ', '  XX  ', '  XX  ', '  XX  ', '  XX  ', ' XXXX '],
    'S': [' XXXXX', 'XX    ', 'XX    ', ' XXXXX', '    XX', '    XX', '    XX', 'XXXXX '],
    'H': ['XX   XX', 'XX   XX', 'XX   XX', 'XXXXXXX', 'XXXXXXX', 'XX   XX', 'XX   XX', 'XX   XX']
  };
  let path = '';
  let offsetX = 2;
  ['K', 'R', 'I', 'S', 'H'].forEach(c => {
    const lines = chars[c];
    lines.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) {
        if (line[x] === 'X') {
          const px = (offsetX + x) * 28;
          const py = y * 28;
          path += `M${px} ${py} h28 v28 h-28 Z `;
        }
      }
    });
    offsetX += lines[0].length + 1;
  });
  return path;
};

export function SiteFooterInteractiveLogotype() {
  const gradientX1Raw = useMotionValue(DEFAULT_GRADIENT_X)
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const containerRect = container.getBoundingClientRect()
    const mouseX = event.clientX - containerRect.left
    const containerWidth = containerRect.width

    const normalizedX = (mouseX / containerWidth) * VIEWBOX_WIDTH
    const clampedX = Math.max(0, Math.min(VIEWBOX_WIDTH, normalizedX))

    gradientX1Raw.set(clampedX)
  }

  const handleMouseLeave = () => {
    gradientX1Raw.set(DEFAULT_GRADIENT_X)
  }

  const krishPath = generateKrishPath();

  return (
    <div className="screen-line-bottom flex w-full justify-center after:z-1 after:bg-foreground/10">
      <div
        className="overflow-hidden md:w-3/4 max-w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[15%] items-center justify-center">
          <svg
            className="w-full h-auto aspect-auto"
            viewBox="0 0 1300 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={krishPath}
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              className="stroke-foreground/10"
              d={krishPath}
              strokeWidth="2"
            />

            <defs>
              <motion.linearGradient
                id="paint0_linear_1145_73"
                x1={gradientX1}
                y1="1"
                x2="705"
                y2="257"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
