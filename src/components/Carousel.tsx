'use client';

import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
  WheelEvent,
} from 'react';
import { MOVIES } from '../../utils/movies';
import CarouselItem from './CarouselItem';
import { AnimatePresence, motion } from 'framer-motion';

export const FLOOR = 50;
export const CEILING = -50;

const Carousel = ({
  setLoadingState,
}: {
  setLoadingState: Dispatch<SetStateAction<number>>;
}) => {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(FLOOR);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [itemsInView, setItemsInView] = useState(
    new Array(MOVIES?.length).fill(false)
  );

  const handleDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMouseDownAt(e.clientX);
  };

  const handleUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 2;

    setPercentage(
      Math.max(
        Math.min(
          prevPercentage + (mouseDelta / maxDelta) * -100,
          FLOOR
        ),
        CEILING +
          (100 / (MOVIES.length * 20 + (MOVIES.length - 1) * 2)) * 20
      )
    );
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const value = Math.max(
      Math.min(percentage + (e.deltaY / 26) * -1, FLOOR),
      CEILING +
        (100 / (MOVIES.length * 20 + (MOVIES.length - 1) * 2)) * 20
    );

    setPercentage(value);
    setPrevPercentage(value);
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center py-12"
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onWheel={handleWheel}
    >
      <div
        className="flex flex-row items-center gap-[2vw]"
        style={{
          transform: `translate(${
            percentage -
            1000 / (MOVIES.length * 20 + (MOVIES.length - 1) * 2)
          }%, 0%)`,
          transition: 'transform 1.2s ease',
        }}
      >
        {MOVIES.map((movie, index) => (
          <CarouselItem
            key={movie.title}
            img={movie.img}
            percentage={percentage}
            setItemsInView={setItemsInView}
            itemsInView={itemsInView}
            index={index}
            setPercentage={setPercentage}
            setPrevPercentage={setPrevPercentage}
            setLoadingState={setLoadingState}
          />
        ))}
      </div>

      <div>{}</div>
      <AnimatePresence mode="wait">
        {!itemsInView.some((iiv) => iiv) && (
          <motion.div
            initial={{ scale: 0, origin: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl font-thin z-10 fixed"
          >
            +
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-row gap-4  overflow-y-hidden fixed bottom-12">
        <div
          className="absolute flex flex-col gap-1"
          style={{
            transform: `translate(0%, ${
              percentage === 0
                ? 0
                : -FLOOR +
                  percentage -
                  100 / (MOVIES.length * 20 + (MOVIES.length - 1) * 2)
            }%)`,
            transition: 'transform 1.2s ease',
          }}
        >
          {MOVIES.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="text-[#141414]">{'10'}</div>-
        <div>{MOVIES.length}</div>
      </div>
    </div>
  );
};

export default Carousel;
