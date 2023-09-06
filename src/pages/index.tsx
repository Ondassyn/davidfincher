import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Carousel from '../components/Carousel';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
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
      <Carousel />
    </motion.div>
  );
}
