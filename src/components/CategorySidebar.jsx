// src/components/CategorySidebar.jsx
import React from 'react';
import { FaTshirt, FaMobileAlt, FaHome, FaLaptop, FaGamepad, FaTimes } from 'react-icons/fa';

const CategorySidebar = ({ onSelectCategory, isOpen, onClose }) => {
  const categoryIcons = {
    fashion: <FaTshirt className="inline mr-2" />,
    electronics: <FaMobileAlt className="inline mr-2" />,
    home: <FaHome className="inline mr-2" />,
    toys: <FaGamepad className="inline mr-2" />,
    computers: <FaLaptop className="inline mr-2" />,
    
  };

  const sidebarCategories = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Fashion' },       // Combined Men and Women Fashion
    { id: 3, name: 'Toys' },
    { id: 4, name: 'Electronics' },
    { id: 5, name: 'Sports' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Close Button */}
      <button onClick={onClose} className="text-red-500 hover:text-red-700 mb-4">
        <FaTimes className="inline" /> Close
      </button>

      <h2 className="font-semibold text-xl mb-4 text-gray-800">Categories</h2>
      <ul className="space-y-3">
        {sidebarCategories.map((category) => (
          <li
            key={category.id}
            className="cursor-pointer text-blue-600 hover:underline flex items-center"
            onClick={() => {
              onSelectCategory(category.name); 
              onClose();
            }}
          >
            {categoryIcons[category.name.toLowerCase()] || null}
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
