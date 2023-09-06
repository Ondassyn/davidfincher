import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MOVIES } from '../../utils/movies';

const Test = () => {
  const [inView, setInView] = useState(false);

  return (
    <div className="h-screen py-12 relative">
      <div
        className="flex flex-row gap-[2vw]"
        style={{
          transform: `translate(50%, 0%)`,
          transition: 'transform 1.2s ease',
        }}
      >
        {MOVIES.map((movie, index) => (
          <div
            key={index}
            className={`${
              index === 3
                ? 'w-[100vw] h-screen '
                : 'w-[20vw] h-[56vh] relative'
            } transition-all duration-500 ease-in-out`}
            onClick={() => {
              setInView((prev) => !prev);
            }}
            style={{
              position: index === 3 ? 'absolute' : 'relative',
              top: index === 3 ? 0 : 'auto',
              left: index === 3 ? 0 : 'auto',
              zIndex: index === 3 ? 10 : 'auto',
            }}
          >
            <Image
              alt={'img'}
              src={movie?.img}
              fill
              style={{
                objectFit: 'cover',
                transition: 'object-position 1.2s ease',
                animationFillMode: 'forwards',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
