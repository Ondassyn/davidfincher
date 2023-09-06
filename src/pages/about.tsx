import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AboutSection from '@/components/AboutSection';
import Head from 'next/head';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      // animate={{ y: '0%' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className=""
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
      <AboutSection />
    </motion.div>
  );
};

export default About;
