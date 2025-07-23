// components/Navbar.tsx

import React, { useState, useEffect } from 'react';
import { isOnline, isPWA } from '@/utils/storage';

interface Props {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<Props> = ({ onThemeToggle, isDarkMode }) => {
  const [isOnlineStatus, setIsOnlineStatus] = useState(true);
  const [isPWAStatus, setIsPWAStatus] = useState(false);

  useEffect(() => {
    // Initial status
    setIsOnlineStatus(isOnline());
    setIsPWAStatus(isPWA());

    // Listen for online/offline events
    const handleOnline = () => setIsOnlineStatus(true);
    const handleOffline = () => setIsOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <nav className="h-14 bg-blue-600 text-white flex items-center justify-between px-8 shadow-md">
              <div className="flex items-center">
          <span className="text-xl font-bold tracking-wide">
            IdeaPulse
          </span>
          <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            Beta
          </span>
          {isPWAStatus && (
            <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              PWA
            </span>
          )}
        </div>
      
                <div className="flex items-center space-x-4">
            {/* Online Status Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <div 
                className={`w-2 h-2 rounded-full ${
                  isOnlineStatus ? 'bg-green-400' : 'bg-red-400'
                }`}
                title={isOnlineStatus ? 'Çevrimiçi' : 'Çevrimdışı'}
              />
              <span className="text-xs text-blue-100">
                {isOnlineStatus ? 'Çevrimiçi' : 'Çevrimdışı'}
              </span>
            </div>
            
            {/* Mobile Only - Just the dot */}
            <div className="md:hidden">
              <div 
                className={`w-3 h-3 rounded-full ${
                  isOnlineStatus ? 'bg-green-400' : 'bg-red-400'
                }`}
                title={isOnlineStatus ? 'Çevrimiçi' : 'Çevrimdışı'}
              />
            </div>

            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
              aria-label={isDarkMode ? 'Açık temaya geç' : 'Karanlık temaya geç'}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
          </div>
    </nav>
  );
};

export default Navbar; 