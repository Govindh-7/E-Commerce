// src/components/Product.jsx
import React from 'react';

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
      <p className="text-red-600 font-bold mb-1">${parseFloat(product.price).toFixed(2)}</p>
      <p className="text-gray-600 text-sm mb-1">
        {product.rating ? `Rating: ${product.rating.rate}` : 'Rating: N/A'}
        <span className="text-yellow-500"> ⭐ ({product.review_count || 0} reviews)</span>
      </p>
      <button
        onClick={() => onAddToCart(product)}
        className="w-full mt-2 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
