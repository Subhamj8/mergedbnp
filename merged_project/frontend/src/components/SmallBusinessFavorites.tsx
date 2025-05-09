import type React from 'react';
import Carousel from './Carousel';
import ProductCard from './ProductCard';

const favorites = [
  { title: 'Business Cards', imgUrl: 'https://ext.same-assets.com/311281781/3470012853.png', discount: '25% off' },
  { title: 'T-shirts', imgUrl: 'https://ext.same-assets.com/311281781/4167018637.png', discount: undefined },
  { title: 'Vinyl Banners', imgUrl: 'https://ext.same-assets.com/311281781/1408763502.png', discount: '20% off' },
  { title: 'Custom Postcards', imgUrl: 'https://ext.same-assets.com/311281781/3777136361.png', discount: undefined },
  { title: 'Yard Signs', imgUrl: 'https://ext.same-assets.com/311281781/1736208782.png', discount: '25% off' },
  { title: 'Drinkware', imgUrl: 'https://via.placeholder.com/150', discount: undefined },
];

const SmallBusinessFavorites: React.FC = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Small Business Week Favorites</h2>
    <Carousel>
      {favorites.map(item => (
        <ProductCard key={item.title} {...item} />
      ))}
    </Carousel>
  </section>
);

export default SmallBusinessFavorites;
