'use client';

import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { MOVIES } from '../../utils/movies';
import { FLOOR } from './Carousel';
import { motion } from 'framer-motion';

const CarouselItem = ({
  img,
  percentage,
  setItemsInView,
  itemsInView,
  index,
  setPercentage,
  setPrevPercentage,
  setLoadingState,
}: {
  img: string;
  percentage: number;
  setItemsInView: Dispatch<SetStateAction<boolean[]>>;
  itemsInView: boolean[];
  index: number;
  setPercentage: Dispatch<SetStateAction<number>>;
  setPrevPercentage: Dispatch<SetStateAction<number>>;
  setLoadingState: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      className={`${
        itemsInView[index] ? 'w-[90vw] h-[70vh]' : 'w-[20vw] h-[56vh]'
      } relative transition-all duration-500 ease-in-out`}
      onClick={() => {
        setItemsInView((prev) => {
          let temp = [...prev];
          if (temp[index]) {
            temp[index] = false;
          } else {
            temp[temp.indexOf(true)] = false;
            temp[index] = true;
            setPercentage(
              FLOOR -
                (100 * (index * 20 + (index - 1) * 2 + 34)) /
                  ((MOVIES.length - 1) * 22 + 90)
            );
            setPrevPercentage(
              FLOOR -
                (100 * (index * 20 + (index - 1) * 2 + 34)) /
                  ((MOVIES.length - 1) * 22 + 90)
            );
          }
          return temp;
        });
      }}
    >
      <Image
        alt={'img'}
        src={img}
        fill
        style={{
          objectFit: 'cover',
          objectPosition: `${-FLOOR + percentage + 100}% 50%`,
          transition: 'object-position 1.2s ease',
          animationFillMode: 'forwards',
          filter: 'brightness(80%)',
        }}
        onLoadingComplete={() => {
          setLoadingState((state) => state + 1);
        }}
        loading="eager"
      />
      {itemsInView[index] && (
        <div className="absolute w-full top-[46%] h-full">
          <div className="h-16 overflow-hidden flex flex-row justify-around items-center">
            <motion.div
              initial={{ scale: 0, origin: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-6xl font-extralight z-20"
            >
              +
            </motion.div>
            <motion.div
              initial={{ y: 100, originY: 1 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-5xl font-medium whitespace-nowrap">
                {MOVIES[index].title}
              </p>
            </motion.div>
            <motion.div
              initial={{ scale: 0, origin: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.7 }}
              className="text-6xl font-extralight z-20"
            >
              +
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
