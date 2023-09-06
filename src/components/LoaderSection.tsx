import React from 'react';
import { MOVIES } from '../../utils/movies';
import { motion } from 'framer-motion';

const LoaderSection = ({
  loadingState,
}: {
  loadingState: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
      className="bg-[#141414] z-30 absolute top-0 h-screen w-full flex flex-col justify-center items-center"
    >
      <motion.p
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-lg"
      >{`${Math.trunc(
        ((loadingState + 1) / MOVIES.length) * 100
      )}%`}</motion.p>
    </motion.div>
  );
};

export default LoaderSection;
