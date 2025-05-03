// components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer justify-center gap-2 px-20 py-3 rounded-full text-sm font-medium text-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 hover:scale-105 transition-transform"
    >
      Save Mood
    </button>
  );
};

export default Button;
