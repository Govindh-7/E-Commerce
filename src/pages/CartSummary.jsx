// src/components/CartSummary.js
import React from 'react';

const CartSummary = ({ totalPrice, onProceed }) => {
  return (
    <div className="flex justify-between mb-6">
      <h2 className="text-2xl font-semibold">Total Price:</h2>
      <span className="text-xl">${totalPrice.toFixed(2)}</span>
      <button 
        onClick={onProceed} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-500"
      >
        Proceed to Buy
      </button>
    </div>
  );
};

export default CartSummary;
