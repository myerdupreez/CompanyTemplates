import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center w-12 h-12 rounded-full
        transition-all duration-300 transform hover:scale-110
        ${isDark 
          ? 'bg-navy-700 hover:bg-navy-600 text-webstrat-400' 
          : 'bg-white hover:bg-gray-100 text-navy-700 shadow-lg'
        }
      `}
      aria-label="Toggle theme"
    >
      <div className="relative">
        {isDark ? (
          <Sun className="w-5 h-5 transition-all duration-300" />
        ) : (
          <Moon className="w-5 h-5 transition-all duration-300" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
