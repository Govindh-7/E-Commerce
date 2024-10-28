// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 px-4 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="font-semibold text-lg mb-3">About E-Store</h2>
          <p>
            E-Store is your one-stop online shop for everything from fashion and electronics to toys and sports gear. 
            We are committed to bringing you the best products at the best prices.
          </p>
        </div>
        
        {/* Categories Section */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Shop By Category</h2>
          <ul>
            <li><Link to="/products?category=fashion" className="hover:underline">Fashion</Link></li>
            <li><Link to="/products?category=electronics" className="hover:underline">Electronics</Link></li>
            <li><Link to="/products?category=toys" className="hover:underline">Toys</Link></li>
            <li><Link to="/products?category=sports" className="hover:underline">Sports</Link></li>
            <li><Link to="/products?category=home" className="hover:underline">Home & Living</Link></li>
          </ul>
        </div>
        
        {/* Customer Service Section */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Customer Service</h2>
          <ul>
            <li><Link to="/help" className="hover:underline">Help Center</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:underline">Shipping Info</Link></li>
            <li><Link to="/returns" className="hover:underline">Returns & Refunds</Link></li>
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Our Policies</h2>
          <ul>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link to="/sitemap" className="hover:underline">Sitemap</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-lg font-semibold mt-8 text-gray-500">
  © {new Date().getFullYear()} E-Store. All rights reserved.
</div>

    </footer>
  );
};

export default Footer;
