"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.setProperty(
        "--gradient-background-start",
        gradientBackgroundStart
      );
      document.body.style.setProperty(
        "--gradient-background-end",
        gradientBackgroundEnd
      );
      document.body.style.setProperty("--first-color", firstColor);
      document.body.style.setProperty("--second-color", secondColor);
      document.body.style.setProperty("--third-color", thirdColor);
      document.body.style.setProperty("--fourth-color", fourthColor);
      document.body.style.setProperty("--fifth-color", fifthColor);
      document.body.style.setProperty("--pointer-color", pointerColor);
      document.body.style.setProperty("--size", size);
      document.body.style.setProperty("--blending-value", blendingValue);
    }
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      const newX = curX + (tgX - curX) / 20;
      const newY = curY + (tgY - curY) / 20;
      setCurX(newX);
      setCurY(newY);
      interactiveRef.current.style.transform = `translate(${Math.round(
        newX
      )}px, ${Math.round(newY)}px)`;
    }

    move();

    const interval = setInterval(move, 1000 / 60);
    return () => clearInterval(interval);
  }, [curX, curY, tgX, tgY, interactiveRef]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsSafari(navigator.userAgent.toLowerCase().includes("safari") && !navigator.userAgent.toLowerCase().includes("chrome"));
    }
  }, []);

  return (
    <div className={cn("h-[inherit] overflow-hidden", containerClassName)}>
      <div
        className={cn(
          "relative h-full transition duration-300 w-full",
          className
        )}
        style={{
          background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        }}
      >
        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="40"
                result="blur"
              />
            </filter>
          </defs>
        </svg>
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
          )}
        >
          <div
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
              "translate-x-[var(--x)] translate-y-[var(--y)]",
              "animate-first",
              "opacity-100"
            )}
          ></div>
          <div
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
              "translate-x-[var(--x)] translate-y-[var(--y)]",
              "animate-second",
              "opacity-100"
            )}
          ></div>
          <div
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
              "translate-x-[var(--x)] translate-y-[var(--y)]",
              "animate-third",
              "opacity-100"
            )}
          ></div>
          <div
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
              "translate-x-[var(--x)] translate-y-[var(--y)]",
              "animate-fourth",
              "opacity-100"
            )}
          ></div>
          <div
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
              "translate-x-[var(--x)] translate-y-[var(--y)]",
              "animate-fifth",
              "opacity-100"
            )}
          ></div>
          {interactive && (
            <div
              ref={interactiveRef}
              onMouseMove={handleMouseMove}
              className={cn(
                "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
                "[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2",
                "opacity-0",
                "group-hover/card:opacity-100",
                "transition-opacity duration-500"
              )}
            ></div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};