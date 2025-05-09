import type React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-200 py-8">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="font-bold mb-2">You need it. We print it. You love it.</h4>
        <p className="text-sm">© {new Date().getFullYear()} VistaPrint. All rights reserved.</p>
      </div>
      <div>
        <h5 className="font-semibold mb-2">Let Us Help</h5>
        <ul className="space-y-1 text-sm">
          <li><a href="#" className="hover:underline">My Account</a></li>
          <li><a href="#" className="hover:underline">Shipping</a></li>
          <li><a href="#" className="hover:underline">Contact & Support</a></li>
          <li><a href="#" className="hover:underline">All Products</a></li>
          <li><a href="#" className="hover:underline">Deals</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold mb-2">Our Company</h5>
        <ul className="space-y-1 text-sm">
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Careers</a></li>
          <li><a href="#" className="hover:underline">Affiliate Program</a></li>
          <li><a href="#" className="hover:underline">Accessibility</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
