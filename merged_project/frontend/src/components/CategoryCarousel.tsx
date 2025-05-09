import type React from 'react';
import Carousel from './Carousel';

const categories = [
  { title: 'Deals', imgUrl: 'https://ext.same-assets.com/311281781/1607347650.png' },
  { title: 'Business Cards', imgUrl: 'https://ext.same-assets.com/311281781/3777136361.png' },
  { title: 'Postcards & Print Advertising', imgUrl: 'https://ext.same-assets.com/311281781/1419389917.png' },
  { title: 'Signs, Banners & Posters', imgUrl: 'https://ext.same-assets.com/311281781/3974144177.png' },
  { title: 'Labels & Stickers', imgUrl: 'https://ext.same-assets.com/311281781/1736208782.png' },
  { title: 'Packaging', imgUrl: 'https://ext.same-assets.com/311281781/1764919935.png' },
];

const CategoryCarousel: React.FC = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Explore all categories</h2>
    <Carousel>
      {categories.map(cat => (
        <div key={cat.title} className="flex flex-col items-center">
          <img src={cat.imgUrl} alt={cat.title} className="w-24 h-24 object-cover mb-2 rounded-full bg-white p-2" />
          <span className="text-sm text-gray-700">{cat.title}</span>
        </div>
      ))}
    </Carousel>
  </section>
);

export default CategoryCarousel;
