import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <div
        key={router.pathname}
        className={`${inter.className} bg-[#141414] h-screen w-full m-0 text-white`}
      >
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AnimatePresence>
  );
}
