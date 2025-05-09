import type React from 'react';
import ProductCard from './ProductCard';

const items = [
  { title: 'Invitations & Announcements', imgUrl: 'https://via.placeholder.com/150', discount: null },
  { title: 'Graduation', imgUrl: 'https://via.placeholder.com/150', discount: null },
  { title: 'Wedding', imgUrl: 'https://via.placeholder.com/150', discount: null },
  { title: 'Birthday', imgUrl: 'https://via.placeholder.com/150', discount: null },
];

const CelebrationGrid: React.FC = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Make it your best celebration yet</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(item => (
        <ProductCard key={item.title} {...item} />
      ))}
    </div>
  </section>
);

export default CelebrationGrid;
