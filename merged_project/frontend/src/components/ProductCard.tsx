import type React from 'react';

export interface ProductCardProps {
  title: string;
  imgUrl: string;
  discount?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imgUrl, discount }) => (
  <div className="bg-white shadow rounded p-4 flex flex-col items-center">
    <img src={imgUrl} alt={title} className="w-32 h-32 object-cover rounded mb-2" />
    {discount && <span className="text-sm text-green-600 mb-1">{discount}</span>}
    <span className="text-sm font-medium text-gray-800 text-center">{title}</span>
  </div>
);

export default ProductCard;
