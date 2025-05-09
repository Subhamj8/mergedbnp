import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star } from 'lucide-react';
import Button from './ui/Button';
import { addToViewHistory } from '../utils/storage';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleClick = () => {
    addToViewHistory(product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`} onClick={handleClick} className="block relative">
        <img 
          src={product.featuredImage} 
          alt={product.name} 
          className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.hasDesignOptions && (
          <span className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
            Customizable
          </span>
        )}
      </Link>
      <div className="p-5">
        <Link 
          to={`/products/${product.id}`} 
          onClick={handleClick}
          className="block"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-brand-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14}
                fill={i < Math.floor(product.averageRating) ? "currentColor" : "none"} 
                className={i < Math.floor(product.averageRating) ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
        <div className="flex justify-between items-center">
          <div className="text-gray-800 font-semibold">
            {product.minPrice === product.maxPrice
              ? `$${product.minPrice.toFixed(2)}`
              : `$${product.minPrice.toFixed(2)} - $${product.maxPrice.toFixed(2)}`}
          </div>
          <Button to={`/products/${product.id}`} variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;