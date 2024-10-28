import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for redirection

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Add navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      setMessage('Login successful!');
      localStorage.setItem('token', response.data.token); // Store the token
      localStorage.setItem('userId', response.data.userId); // Store the userId if availabl
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error logging in.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Login</h2>
        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            className="border p-2 w-full"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            className="border p-2 w-full"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="bg-blue-500 text-white p-2 w-full rounded" type="submit">Login</button>
        {message && <p className="mt-4 text-red-500">{message}</p>}

        {/* Additional links */}
        <div className="mt-4 text-center">
          <p>
            New user? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
