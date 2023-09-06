import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';
import { MOVIES } from '../../utils/movies';
import LoaderSection from '@/components/LoaderSection';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(0);

  return (
    <AnimatePresence mode="wait">
      <div
        key={router.pathname}
        className={`${inter.className} bg-[#141414] h-screen w-full m-0 text-white`}
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
        <Navbar />
        <AnimatePresence mode="wait">
          {loadingState < MOVIES.length && (
            <LoaderSection loadingState={loadingState} />
          )}
        </AnimatePresence>
        <Component {...pageProps} setLoadingState={setLoadingState} />
      </div>
    </AnimatePresence>
  );
}
