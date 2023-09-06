'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="absolute w-full flex flex-row justify-center items-center gap-12 py-8 z-20">
      <div
        className={`${
          pathname !== '/' ? 'text-gray-500' : ''
        } cursor-pointer hover:text-white transition duration-500 ease-in-out`}
        onClick={() => router.push('/')}
      >
        Work
      </div>
      <div
        className={`${
          pathname !== '/about' ? 'text-gray-500' : ''
        } cursor-pointer hover:text-white transition duration-500 ease-in-out`}
        onClick={() => router.push('/about')}
      >
        About
      </div>
    </nav>
  );
};

export default Navbar;
