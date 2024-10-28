// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'; // Import Profile
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Layout
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onCategorySelect={setSelectedCategory}
        setSearchTerm={setSearchTerm}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<ProductList selectedCategory={selectedCategory} searchTerm={searchTerm} />}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute><Cart /></ProtectedRoute>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
