import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductList = ({ selectedCategory, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/items'); // Endpoint for products
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image_url,
      quantity: 1
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md w-full max-w-7xl">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-2xl transition-shadow duration-200 transform hover:-translate-y-2"
            >
              <div className="h-48 flex items-center justify-center mb-3 overflow-hidden bg-gray-100 rounded-lg">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-1 leading-snug line-clamp-2">
                {product.name}
              </h3>
              <p className="text-blue-600 font-bold text-xl mb-3">${parseFloat(product.price).toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium text-sm transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 font-medium">
            No items available for this search.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
