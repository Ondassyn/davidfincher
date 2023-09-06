import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '@/components/AboutSection';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className=""
    >
      <AboutSection />
    </motion.div>
  );
};

export default About;
