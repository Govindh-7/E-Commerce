// src/components/Checkout.js
import React from 'react';

const Checkout = ({ 
  paymentMethod, 
  setPaymentMethod, 
  paymentDetails, 
  setPaymentDetails, 
  address, 
  setAddress, 
  onSubmit, 
  loading 
}) => {
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    // Reset payment details when changing payment methods
    setPaymentDetails({ upiId: '', cardNumber: '', cardExpiry: '', cardCVV: '' });
  };

  return (
    <div className="mt-8 p-4 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
      <div>
        <label>
          <input 
            type="radio" 
            value="upi" 
            checked={paymentMethod === 'upi'} 
            onChange={handlePaymentChange} 
            className="mr-2"
          />
          UPI
        </label>
        <label className="ml-6">
          <input 
            type="radio" 
            value="card" 
            checked={paymentMethod === 'card'} 
            onChange={handlePaymentChange} 
            className="mr-2"
          />
          Credit & Debit Cards
        </label>
        <label className="ml-6">
          <input 
            type="radio" 
            value="emi" 
            checked={paymentMethod === 'emi'} 
            onChange={handlePaymentChange} 
            className="mr-2"
          />
          EMI
        </label>
        <label className="ml-6">
          <input 
            type="radio" 
            value="netBanking" 
            checked={paymentMethod === 'netBanking'} 
            onChange={handlePaymentChange} 
            className="mr-2"
          />
          Net Banking
        </label>
      </div>

      {paymentMethod === 'upi' && (
        <div>
          <label className="block mt-4">UPI ID:</label>
          <input 
            type="text" 
            name="upiId" 
            value={paymentDetails.upiId} 
            onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })} 
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
      )}

      {paymentMethod === 'card' && (
        <div>
          <label className="block mt-4">Card Number:</label>
          <input 
            type="text" 
            name="cardNumber" 
            value={paymentDetails.cardNumber} 
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} 
            className="border border-gray-300 p-2 rounded w-full"
          />
          <label className="block mt-2">Expiry Date:</label>
          <input 
            type="text" 
            name="cardExpiry" 
            value={paymentDetails.cardExpiry} 
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })} 
            placeholder="MM/YY" 
            className="border border-gray-300 p-2 rounded w-full"
          />
          <label className="block mt-2">CVV:</label>
          <input 
            type="text" 
            name="cardCVV" 
            value={paymentDetails.cardCVV} 
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCVV: e.target.value })} 
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
      )}

      <div className="mt-4">
        <label className="block">Delivery Address:</label>
        <textarea 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <button 
        onClick={onSubmit} 
        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4 transition duration-300 hover:bg-green-500"
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Processing...' : 'Submit Payment'}
      </button>
    </div>
  );
};

export default Checkout;
