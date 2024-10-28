import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]); // State to hold user orders
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    if (userId && token) {
      fetchUserDetails(); // Fetch user details when component mounts
      fetchUserOrders(); // Fetch user orders when component mounts
    } else {
      setMessage('User not authenticated.'); // Show message if user is not authenticated
    }
  }, [userId, token]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set authorization header
        },
      });
      setUserDetails(response.data.user); // Set user details in state
    } catch (error) {
      console.error('Error fetching user details:', error);
      setMessage('Error fetching user details.'); // Set error message
    }
  };



  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set authorization header
        },
      });
      if (response.data.orders.length === 0) {
        setMessage('No orders found for this user.'); // Update the message if no orders
      } else {
        setOrders(response.data.orders); // Set user orders in state
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setMessage('Error fetching user orders.'); // Set error message
    }
  };
  

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value }); // Update user details in state
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Set authorization header
        },
      });
      setMessage('User details updated successfully!'); // Show success message
      setIsEditing(false); // Exit edit mode
      fetchUserDetails(); // Refresh user details
    } catch (error) {
      console.error('Error updating user details:', error);
      setMessage('Error updating user details.'); // Show error message
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set authorization header
        },
      });
      localStorage.removeItem('token'); // Clear token
      localStorage.removeItem('userId'); // Clear userId
      navigate('/'); // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage('Error deleting account.'); // Show error message
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('userId'); // Clear userId
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Profile</h2>
      {message && <p className="text-red-500">{message}</p>}

      {/* User Details Section */}
      <div className="mb-4">
        {isEditing ? (
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={userDetails.username}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={userDetails.email}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
            <button type="button" onClick={handleEditToggle} className="ml-2 bg-gray-500 text-white p-2 rounded">Cancel</button>
          </form>
        ) : (
          <div className="bg-white p-6 rounded shadow-md">
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <button onClick={handleEditToggle} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div className="mb-4">
        <h3 className="text-xl mb-2">Your Orders</h3>
        {orders.length === 0 ? (
          <p>No orders by the user.</p>
        ) : (
          <ul className="bg-white p-4 rounded shadow-md">
            {orders.map((order) => (
              <li key={order.id} className="border-b py-2">
                <div><strong>Order ID:</strong> {order.id}</div>
                <div><strong>Payment Status:</strong> {order.paymentStatus}</div>
                <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
                <div><strong>Shipping Address:</strong> {order.shippingAddress}</div>
                <div><strong>Items:</strong> {JSON.stringify(order.items)}</div> {/* Display items as JSON for simplicity */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout and Delete Account Section */}
      <div className="mb-4">
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
        <button onClick={handleDeleteAccount} className="ml-2 bg-red-700 text-white p-2 rounded">Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
