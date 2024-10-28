// src/components/CartItem.js
import React from 'react';

const CartItem = ({ item, onQuantityChange, onDelete }) => {
  const itemPrice = parseFloat(item.price); // Ensure item.price is a number
  const formattedPrice = !isNaN(itemPrice) ? itemPrice.toFixed(2) : 'N/A'; // Fallback to 'N/A' if NaN

  return (
    <li key={item.id} className="flex justify-between items-center mb-2 border-b pb-2 last:border-b-0">
      <div className="flex items-center">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
        <span className="font-medium">{item.title}</span>
      </div>
      <div>
        <span className="mr-2">${formattedPrice} x {item.quantity || 1}</span>
        <button onClick={() => onQuantityChange(item.id, true)} className="bg-blue-500 text-white px-2 rounded">+</button>
        <button onClick={() => onQuantityChange(item.id, false)} className="bg-red-500 text-white px-2 rounded" disabled={item.quantity <= 1}>-</button>
        <button onClick={() => onDelete(item.id)} className="ml-2 text-red-600">Remove</button>
      </div>
    </li>
  );
};

export default CartItem;
