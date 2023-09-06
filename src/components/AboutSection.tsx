'use client';

import React, { useState, MouseEvent, WheelEvent } from 'react';
import { motion } from 'framer-motion';
import { ABOUT_TEXT } from '../../utils/text';

const AboutSection = () => {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(10);
  const [prevPercentage, setPrevPercentage] = useState(0);

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

    setPercentage(
      Math.max(
        Math.min(prevPercentage + (mouseDelta / maxDelta) * -100, 10),
        -85
      )
    );
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const value = Math.max(
      Math.min(percentage + (e.deltaY / 26) * -1, 10),
      -85
    );

    setPercentage(value);
    setPrevPercentage(value);
  };

  return (
    <div
      className="h-screen w-full flex flex-row px-12 cursor-default"
      onWheel={handleWheel}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="border border-white absolute"
        style={{
          width: '25vw',
          height: '25vh',
          transform: `translate(0%, ${(-percentage + 75) / 2.2}vh)`,
          transition: 'transform 1.2s ease',
        }}
      ></motion.div>
      <div
        className="text-xs flex flex-col absolute px-12"
        style={{
          transform: `translate(0%, ${(percentage + 70) / 2}%)`,
          transition: 'transform 1.2s ease',
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
              line.includes('\t') && 'pl-12'
            } ${
              !isNaN(parseFloat(line.trim())) && 'font-thin text-sm'
            }`}
          >
            {line.includes('\t') ? line.substring(1) : line}
          </motion.div>
        ))}
      </div>
      <div
        className="text-5xl flex flex-col gap-4 absolute left-[40%]"
        style={{
          transform: `translate(0%, ${percentage}%)`,
          transition: 'transform 1.2s ease',
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
              line.includes('\t') && 'pl-12'
            } ${
              !isNaN(parseFloat(line.trim())) && 'font-thin text-3xl'
            }`}
          >
            {line.includes('\t') ? line.substring(1) : line}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
