import type React from 'react';
import Carousel from './Carousel';
import ProductCard from './ProductCard';

const topPicks = [
  { title: 'Pens', imgUrl: 'https://via.placeholder.com/150', discount: undefined },
  { title: 'Notebooks', imgUrl: 'https://via.placeholder.com/150', discount: undefined },
  { title: 'Mugs', imgUrl: 'https://via.placeholder.com/150', discount: undefined },
  { title: 'Water Bottles', imgUrl: 'https://ext.same-assets.com/311281781/3470012853.png', discount: undefined },
];

const TopPicks: React.FC = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Top Picks from Vista Collective Brand Ambassador</h2>
    <Carousel>
      {topPicks.map(item => (
        <ProductCard key={item.title} {...item} />
      ))}
    </Carousel>
  </section>
);

export default TopPicks;
