import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      await axios.post('http://localhost:5000/api/register', formData);
      setMessage('Registration successful!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error registering user.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Register</h2>
        {/* Username Input */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">Username</label>
          <input
            className="border p-2 w-full"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <button className="bg-blue-500 text-white p-2 w-full rounded" type="submit">Register</button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
