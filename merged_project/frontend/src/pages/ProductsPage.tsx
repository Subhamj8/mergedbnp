import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { getProducts, getCategories } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  // Get query parameters
  const categorySlug = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  // Load products and categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // Find category ID from slug
        const categoryId = categorySlug
          ? categoriesData.find(cat => cat.slug === categorySlug)?.id
          : undefined;

        // Load products with filters
        const { products: productsData, total } = await getProducts(
          categoryId,
          searchQuery,
          minPrice,
          maxPrice,
          page
        );
        setProducts(productsData);
        setTotalProducts(total);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [categorySlug, searchQuery, minPrice, maxPrice, page]);

  // Update price filter
  const handlePriceFilter = (min?: number, max?: number) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (min !== undefined) {
      newParams.set('minPrice', String(min));
    } else {
      newParams.delete('minPrice');
    }
    
    if (max !== undefined) {
      newParams.set('maxPrice', String(max));
    } else {
      newParams.delete('maxPrice');
    }
    
    // Reset to first page when filter changes
    newParams.set('page', '1');
    
    setSearchParams(newParams);
  };

  // Update category filter
  const handleCategoryFilter = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (slug) {
      newParams.set('category', slug);
    } else {
      newParams.delete('category');
    }
    
    // Reset to first page when filter changes
    newParams.set('page', '1');
    
    setSearchParams(newParams);
    setFilterOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) {
      newParams.set('search', searchQuery);
    }
    setSearchParams(newParams);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  // Check if any filters are active
  const hasActiveFilters = categorySlug || minPrice !== undefined || maxPrice !== undefined;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {categorySlug 
              ? categories.find(c => c.slug === categorySlug)?.name || 'Products'
              : searchQuery 
                ? `Search Results: "${searchQuery}"`
                : 'All Products'
            }
          </h1>
          <p className="text-gray-600">
            {isLoading 
              ? 'Loading products...' 
              : `Showing ${products.length} of ${totalProducts} products`
            }
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={() => setFilterOpen(!filterOpen)}
            icon={<Filter size={16} />}
            className="md:hidden"
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter sidebar - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-brand-500 hover:text-brand-600"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-gray-800 font-medium mb-3">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryFilter('')}
                    className={`text-sm ${!categorySlug ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryFilter(category.slug)}
                      className={`text-sm ${categorySlug === category.slug ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-gray-800 font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handlePriceFilter(undefined, undefined)}
                  className={`text-sm ${!minPrice && !maxPrice ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  All Prices
                </button>
                <button
                  onClick={() => handlePriceFilter(0, 50)}
                  className={`text-sm ${minPrice === 0 && maxPrice === 50 ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Under $50
                </button>
                <button
                  onClick={() => handlePriceFilter(50, 100)}
                  className={`text-sm ${minPrice === 50 && maxPrice === 100 ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  $50 - $100
                </button>
                <button
                  onClick={() => handlePriceFilter(100, 200)}
                  className={`text-sm ${minPrice === 100 && maxPrice === 200 ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  $100 - $200
                </button>
                <button
                  onClick={() => handlePriceFilter(200, undefined)}
                  className={`text-sm ${minPrice === 200 && !maxPrice ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  $200 & Above
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {filterOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setFilterOpen(false)}></div>
            <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              
              {/* Mobile Categories */}
              <div className="mb-6">
                <h3 className="text-gray-800 font-medium mb-3">Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => handleCategoryFilter('')}
                      className={`text-sm ${!categorySlug ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryFilter(category.slug)}
                        className={`text-sm ${categorySlug === category.slug ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Mobile Price Range */}
              <div className="mb-6">
                <h3 className="text-gray-800 font-medium mb-3">Price Range</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handlePriceFilter(undefined, undefined)}
                    className={`text-sm ${!minPrice && !maxPrice ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    All Prices
                  </button>
                  <button
                    onClick={() => handlePriceFilter(0, 50)}
                    className={`text-sm ${minPrice === 0 && maxPrice === 50 ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Under $50
                  </button>
                  <button
                    onClick={() => handlePriceFilter(50, 100)}
                    className={`text-sm ${minPrice === 50 && maxPrice === 100 ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    $50 - $100
                  </button>
                  <button
                    onClick={() => handlePriceFilter(100, 200)}
                    className={`text-sm ${minPrice === 100 && maxPrice === 200 ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    $100 - $200
                  </button>
                  <button
                    onClick={() => handlePriceFilter(200, undefined)}
                    className={`text-sm ${minPrice === 200 && !maxPrice ? 'font-medium text-brand-500' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    $200 & Above
                  </button>
                </div>
              </div>
              
              {/* Apply/Clear Buttons */}
              <div className="flex space-x-4">
                <Button 
                  variant="primary" 
                  fullWidth 
                  onClick={() => setFilterOpen(false)}
                >
                  Apply Filters
                </Button>
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching your criteria. Try adjusting your filters.
              </p>
              <Button variant="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalProducts > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.ceil(totalProducts / 12) }).map((_, index) => (
                  <Button
                    key={index}
                    variant={page === index + 1 ? 'primary' : 'outline'}
                    onClick={() => handlePageChange(index + 1)}
                    className="w-10"
                  >
                    {index + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= Math.ceil(totalProducts / 12)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;