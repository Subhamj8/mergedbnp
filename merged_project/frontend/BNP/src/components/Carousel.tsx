import type React from 'react';

export interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => (
  <div className="relative">
    <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory py-2">
      {children.map((child, idx) => (
        <div key={idx} className="snap-start flex-shrink-0 w-64">
          {child}
        </div>
      ))}
    </div>
  </div>
);

export default Carousel;
