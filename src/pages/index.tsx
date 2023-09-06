import { AnimatePresence, motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import Head from 'next/head';
import { useState } from 'react';
import { MOVIES } from '../../utils/movies';
import LoaderSection from '@/components/LoaderSection';

export default function Home() {
  const [loadingState, setLoadingState] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0, y: '0%' }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Head>
        <title>David Fincher</title>
        <meta
          name="description"
          content="Tribute to David Fincher's work"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Carousel setLoadingState={setLoadingState} />

      <AnimatePresence mode="wait">
        {loadingState < MOVIES.length && (
          <LoaderSection loadingState={loadingState} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
