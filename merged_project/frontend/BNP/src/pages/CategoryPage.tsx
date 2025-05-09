import React from 'react';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
  title: `Product ${i + 1}`,
  imgUrl: 'https://via.placeholder.com/200',
  discount: i % 3 === 0 ? '15% off' : undefined,
}));

const CategoryPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const totalPages = 4;

  return (
    <div className="container mx-auto px-4 py-8 flex space-x-6">
      <FiltersSidebar />
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">Business Cards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map(prod => (
            <ProductCard key={prod.title} {...prod} />
          ))}
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default CategoryPage;
