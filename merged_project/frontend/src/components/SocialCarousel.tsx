import type React from 'react';
import Carousel from './Carousel';

const images = [
  'https://ext.same-assets.com/311281781/2590442717.png',
  'https://ext.same-assets.com/311281781/1607347650.png',
  'https://ext.same-assets.com/311281781/3777136361.png',
  'https://ext.same-assets.com/311281781/1419389917.png',
];

const SocialCarousel: React.FC = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Made by you, #MadeWithVistaPrint</h2>
    <Carousel>
      {images.map((src, idx) => (
        <img key={idx} src={src} alt="Social post" className="w-48 h-48 object-cover rounded-md" />
      ))}
    </Carousel>
  </section>
);

export default SocialCarousel;
