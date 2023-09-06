import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import { Dispatch, SetStateAction } from 'react';

export default function Home({
  setLoadingState,
}: {
  setLoadingState: Dispatch<SetStateAction<number>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: '0%' }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Carousel setLoadingState={setLoadingState} />
    </motion.div>
  );
}
