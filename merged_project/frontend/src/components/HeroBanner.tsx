import type React from 'react';
import { Button } from '@/components/ui/button';

const HeroBanner: React.FC = () => (
  <section
    className="relative bg-cover bg-center h-[300px] md:h-[500px]"
    style={{ backgroundImage: "url('https://ext.same-assets.com/311281781/2590442717.png')" }}
  >
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
      <h1 className="text-4xl lg:text-5xl font-bold text-white max-w-xl">
        Celebrating your business. Today and every day.
      </h1>
      <p className="mt-4 text-lg text-white/75 max-w-lg">
        We’re here to help you thrive. Get everything you need to keep your business running smoothly.
      </p>
      <div className="mt-6 flex space-x-4">
        <Button size="lg">Business Cards</Button>
        <Button variant="outline" size="lg">Signage</Button>
        <Button variant="outline" size="lg">Clothing & Bags</Button>
      </div>
    </div>
  </section>
);

export default HeroBanner;
