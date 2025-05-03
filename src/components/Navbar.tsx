'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaHome, FaTrophy, FaMusic, FaBell } from 'react-icons/fa';
import { PiListBold } from 'react-icons/pi';
import { HiOutlineViewGrid } from 'react-icons/hi';

// Define all navigation items in one place
const navItems = [
  { path: '/dashboard', icon: <FaHome /> },
  { path: '/dashboard/articles', icon: <FaTrophy /> },
  { path: '/music', icon: <FaMusic /> },
  { path: '/lists', icon: <PiListBold /> },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Keeps track of the current active route
  const [activeRoute, setActiveRoute] = useState('/');

  // Update active route whenever the URL path changes
  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  // Navigate to a different page
  const navigateTo = (path: string) => {
    router.push(path);
    setActiveRoute(path);
  };

  // Check if a given path is the currently active page
  const isActive = (path: string) => activeRoute === path;

  return (
    <>
      {/* Top Navbar for larger screens */}
      <nav className="w-full flex justify-between items-center px-6 py-2 bg-white shadow-sm md:relative">
        
        {/* Brand logo on the left */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigateTo('/')}
        >
          {/* Dots as logo graphic */}
          <div className="relative w-8 h-8">
            <div className="absolute w-3 h-3 rounded-full bg-blue-400 top-0 left-0" />
            <div className="absolute w-3 h-3 rounded-full bg-purple-400 top-1 left-2" />
            <div className="absolute w-3 h-3 rounded-full bg-indigo-400 top-2 left-1" />
          </div>
          <span className="text-lg font-semibold text-gray-800">Care Dairy</span>
        </div>

        {/* Center navigation icons (visible on desktop only) */}
        <div className="hidden md:flex gap-12 items-center text-gray-600 text-xl">
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`p-2 rounded-full cursor-pointer transition ${
                isActive(item.path)
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Right-side icons (notifications/settings) */}
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-full cursor-pointer transition">
            <HiOutlineViewGrid className="text-xl" />
          </div>
          <div className="p-2 rounded-full cursor-pointer transition">
            <FaBell className="text-xl" />
          </div>
        </div>
      </nav>

      {/* Bottom navigation bar for mobile screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 px-6 flex justify-around items-center text-gray-600 text-xl z-50">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigateTo(item.path)}
            className={`p-2 rounded-full cursor-pointer transition ${
              isActive(item.path)
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
