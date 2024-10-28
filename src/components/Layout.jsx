// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CategorySidebar from './CategorySidebar';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, onToggleSidebar, isSidebarOpen, onCategorySelect }) => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Toys' },
    { id: 4, name: 'Electronics' },
    { id: 5, name: 'Sports' },
  ];

  const handleCategorySelect = (category) => {
    if (category === 'Home') {
      onCategorySelect(null); // Reset selected category
      navigate('/'); // Navigate to home page
    } else {
      onCategorySelect(category); // Set selected category
      navigate('/products'); // Navigate to products page with selected category
    }
    onToggleSidebar(); // Close sidebar after selection
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleSidebar={onToggleSidebar} />
      <CategorySidebar
        categories={categories}
        isOpen={isSidebarOpen}
        onClose={onToggleSidebar}
        onSelectCategory={handleCategorySelect} // Pass navigation handler
      />
      <main className="flex-grow">{children}</main>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default Layout;
