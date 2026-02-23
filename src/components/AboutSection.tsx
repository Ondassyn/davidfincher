"use client";

import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  WheelEvent,
} from "react";
import { motion } from "framer-motion";
import { ABOUT_TEXT } from "../../utils/text";

const SCROLL_MAX = 10;

const AboutSection = () => {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(SCROLL_MAX);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [scrollMin, setScrollMin] = useState(-85);
  const [rectHeight, setRectHeight] = useState(0);
  const [rectTravel, setRectTravel] = useState(0);

  const minimapTextRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculate = () => {
      if (!minimapTextRef.current || !bigTextRef.current) return;

      const screenH = window.innerHeight;
      const bigH = bigTextRef.current.getBoundingClientRect().height;
      const minimapH = minimapTextRef.current.getBoundingClientRect().height;

      // How far the big text needs to travel so its bottom aligns with screen bottom
      // Big text starts at SCROLL_MAX vh from top, so total scroll needed in vh:
      const totalScrollVh = ((bigH - screenH) / screenH) * 100 + SCROLL_MAX;
      setScrollMin(-totalScrollVh);

      // Rect sizing
      const visibleFraction = screenH / bigH;
      const rh = minimapH * visibleFraction;
      setRectHeight(rh);
      setRectTravel(minimapH - rh);
    };

    setTimeout(calculate, 800);
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const scrollRange = SCROLL_MAX - scrollMin;

  const handleDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMouseDownAt(e.clientY);
  };

  const handleUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (mouseDownAt === 0) return;
    const mouseDelta = mouseDownAt - e.clientY;
    const maxDelta = window.innerWidth / 2;
    const next = Math.max(
      Math.min(prevPercentage + (mouseDelta / maxDelta) * -100, SCROLL_MAX),
      scrollMin,
    );
    setPercentage(next);
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const value = Math.max(
      Math.min(percentage + (e.deltaY / 26) * -1, SCROLL_MAX),
      scrollMin,
    );
    setPercentage(value);
    setPrevPercentage(value);
  };

  const progress = (SCROLL_MAX - percentage) / scrollRange;

  return (
    <div
      className="h-screen w-full flex flex-row px-12 cursor-default"
      onWheel={handleWheel}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
    >
      {/* Minimap */}
      <div className="absolute left-12 top-24 pl-12" style={{ width: "25vw" }}>
        {/* Static small text */}
        <div ref={minimapTextRef} className="text-xs flex flex-col w-full">
          {ABOUT_TEXT.map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5 + lineIndex * 0.05,
              }}
              className={`block tracking-tight whitespace-pre-wrap ${
                line.includes("\t") ? "pl-4" : ""
              } ${!isNaN(parseFloat(line.trim())) ? "font-thin" : ""}`}
            >
              {line.includes("\t") ? line.substring(1) : line}
            </motion.div>
          ))}
        </div>

        {/* Moving rectangle */}
        {rectHeight > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="border border-white absolute top-0 left-0 pointer-events-none"
            style={{
              width: "25vw",
              height: rectHeight,
              transform: `translateY(${progress * rectTravel}px)`,
              transition: "transform 1.2s ease",
            }}
          />
        )}
      </div>

      {/* Big text */}
      <div
        ref={bigTextRef}
        className="text-5xl flex flex-col gap-4 absolute left-[40%]"
        style={{
          transform: `translateY(${percentage}vh)`,
          transition: "transform 1.2s ease",
        }}
      >
        {ABOUT_TEXT.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5 + lineIndex * 0.05,
            }}
            className={`block tracking-tight whitespace-pre-wrap ${
              line.includes("\t") ? "pl-12" : ""
            } ${!isNaN(parseFloat(line.trim())) ? "font-thin text-3xl" : ""}`}
          >
            {line.includes("\t") ? line.substring(1) : line}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
