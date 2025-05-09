import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { mockCategories, mockProducts } from '../data/mockData';

const HomePage: React.FC = () => {
  // Get featured products
  const featuredProducts = mockProducts.slice(0, 3);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-gradient-to-r from-brand-700 to-brand-500 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5650047/pexels-photo-5650047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Professional Printing & Branding Solutions</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">From business cards to banners, we provide high-quality printing services that help your brand stand out.</p>
            <div className="flex flex-wrap gap-4">
              <Button to="/products" variant="primary" size="lg">
                Explore Products
              </Button>
              <Button to="/design-studio" variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Start Designing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Product Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of high-quality print products for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCategories.map((category) => (
              <Link
                to={`/products?category=${category.slug}`}
                key={category.id}
                className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-9 w-full h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-3">{category.description}</p>
                  <span className="inline-flex items-center text-accent-400 group-hover:text-accent-300">
                    Shop Now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular products chosen by customers like you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/products/${product.id}`} className="block relative">
                  <img 
                    src={product.featuredImage} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                  {product.hasDesignOptions && (
                    <span className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Customizable
                    </span>
                  )}
                </Link>
                <div className="p-6">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-brand-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-800 font-semibold">
                        {product.minPrice === product.maxPrice
                          ? `$${product.minPrice.toFixed(2)}`
                          : `$${product.minPrice.toFixed(2)} - $${product.maxPrice.toFixed(2)}`}
                      </span>
                    </div>
                    <Button to={`/products/${product.id}`} variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button to="/products" variant="primary" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality printing services with exceptional customer support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
                <CheckCircle size={32} className="text-brand-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials and state-of-the-art printing technology for professional results.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">
                Quick production and shipping to meet your deadlines without compromising quality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                Affordable options for businesses of all sizes without sacrificing quality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team of printing experts is available to help you with all your design and printing needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Create stunning designs and bring your brand to life with our professional printing services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/products" variant="primary" size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
              Browse Products
            </Button>
            <Button to="/design-studio" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Try Our Design Studio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;