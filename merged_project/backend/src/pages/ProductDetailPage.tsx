import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Share2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { getProductById, getRelatedProducts } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { addToViewHistory } from '../utils/storage';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      
      setIsLoading(true);
      try {
        const productData = await getProductById(productId);
        
        if (productData) {
          setProduct(productData);
          setSelectedVariant(productData.variants[0]);
          setActiveImage(productData.featuredImage);
          
          // Add to view history
          addToViewHistory(productId);
          
          // Load related products
          const related = await getRelatedProducts(productId);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        addToast('error', 'Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId, addToast]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    
    addToCart({
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity,
      image: product.featuredImage,
    });
    
    addToast('success', `Added ${product.name} to your cart`);
  };

  // Handle customize and design
  const handleCustomize = () => {
    if (!product) return;
    navigate(`/design-studio/${product.id}?variant=${selectedVariant?.id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button to="/products" variant="primary">Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/products" className="hover:text-brand-500 transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.categoryId}`} className="hover:text-brand-500 transition-colors">
            {product.categoryId}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
          {/* Product Images */}
          <div className="lg:col-span-3">
            <div className="mb-4 relative overflow-hidden rounded-lg">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-96 object-contain bg-gray-50"
              />
              {product.hasDesignOptions && (
                <span className="absolute top-4 right-4 bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Customizable
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative rounded-md overflow-hidden border-2 ${
                    activeImage === image ? 'border-brand-500' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16}
                    fill={i < Math.floor(product.averageRating) ? "currentColor" : "none"}
                    className={i < Math.floor(product.averageRating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl font-bold text-gray-800">
                ${selectedVariant ? selectedVariant.price.toFixed(2) : product.minPrice.toFixed(2)}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.shortDescription}</p>
            
            {/* Variants */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Select Option</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`px-4 py-3 rounded-md text-left transition-colors ${
                      selectedVariant?.id === variant.id
                        ? 'bg-brand-50 border border-brand-500'
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <div className="flex justify-between items-center">
                      <span className={selectedVariant?.id === variant.id ? 'font-medium text-brand-700' : 'text-gray-800'}>
                        {variant.name}
                      </span>
                      <span className="font-medium">${variant.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Lead Time: {variant.leadTime}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
              <div className="flex">
                <button
                  className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
                />
                <button
                  className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col space-y-3 mt-auto">
              <Button
                variant="primary"
                fullWidth
                onClick={handleAddToCart}
                disabled={!selectedVariant}
              >
                Add to Cart
              </Button>
              
              {product.hasDesignOptions && (
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleCustomize}
                  disabled={!selectedVariant}
                >
                  Customize & Design
                </Button>
              )}
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <Truck size={18} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Free shipping on orders over $50
                </span>
              </div>
              <div className="flex items-center">
                <ShieldCheck size={18} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Satisfaction guaranteed or your money back
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Details */}
        <div className="border-t border-gray-200 p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Description</h2>
            <div className="prose max-w-none text-gray-600">
              <p>{product.description}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Materials</h3>
                <p className="text-gray-600">High-quality materials for professional results.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Printing</h3>
                <p className="text-gray-600">Full-color printing with vibrant, accurate colors.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Turnaround Time</h3>
                <p className="text-gray-600">Production time varies by product and quantity. See options for details.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Customization</h3>
                <p className="text-gray-600">
                  {product.hasDesignOptions 
                    ? 'Custom design options available. Use our design studio for personalization.' 
                    : 'This product does not offer customization options.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">You May Also Like</h2>
            <Link 
              to="/products" 
              className="text-brand-500 hover:text-brand-600 flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;