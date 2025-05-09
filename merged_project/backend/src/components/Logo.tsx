import React from 'react';
import { Printer } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'light';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', withText = true }) => {
  return (
    <div className="flex items-center">
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
        variant === 'light' ? 'bg-white' : 'bg-brand-500'
      }`}>
        <Printer 
          size={24} 
          className={variant === 'light' ? 'text-brand-500' : 'text-white'} 
        />
      </div>
      {withText && (
        <h1 className={`ml-2 text-xl font-bold ${
          variant === 'light' ? 'text-white' : 'text-gray-800'
        }`}>
          PrintMaster
        </h1>
      )}
    </div>
  );
};

export default Logo;