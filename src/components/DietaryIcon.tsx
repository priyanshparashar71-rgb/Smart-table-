import React from 'react';

interface DietaryIconProps {
  type: 'vegetarian' | 'non-veg';
  showLabel?: boolean;
  className?: string;
}

export const DietaryIcon: React.FC<DietaryIconProps> = ({ type, showLabel = false, className = '' }) => {
  if (type === 'vegetarian') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <div 
          className="w-4 h-4 rounded-[3px] border-[1.5px] border-[#15803d] flex items-center justify-center bg-white shrink-0" 
          title="Vegetarian"
        >
          <div className="w-[7px] h-[7px] rounded-full bg-[#15803d]" />
        </div>
        {showLabel && (
          <span className="text-xs font-semibold text-[#15803d]">Veg</span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div 
        className="w-4 h-4 rounded-[3px] border-[1.5px] border-[#991b1b] flex items-center justify-center bg-white shrink-0" 
        title="Non-Vegetarian"
      >
        {/* Equilateral triangle */}
        <div 
          className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6.5px] border-b-[#991b1b]" 
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-[#991b1b]">Non-Veg</span>
      )}
    </div>
  );
};
