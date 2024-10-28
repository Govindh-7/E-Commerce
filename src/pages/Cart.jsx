import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity, clearCart } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // This line is important to import the default styles
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Checkout from './Checkout';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });
  const [address, setAddress] = useState('');
  const [isCheckout, setIsCheckout] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state for payment processing

  // Calculate total price whenever cartItems change
  useEffect(() => {
    const price = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price); // Ensure item.price is a number
      return total + (isNaN(itemPrice) ? 0 : itemPrice * (item.quantity || 1)); // Fallback to 0 if NaN
    }, 0);
    setTotalPrice(price);
  }, [cartItems]);

  const handleQuantityChange = (itemId, increment) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
      if (newQuantity > 0) {
        dispatch(updateCartItemQuantity({ id: itemId, quantity: newQuantity }));
      }
    }
  };

  const handleDeleteItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleProceedToBuy = () => {
    setIsCheckout(true);
  };

  const handleSubmitPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'upi' && !paymentDetails.upiId) {
      alert('Please enter your UPI ID');
      return;
    } else if (paymentMethod === 'card' && (!paymentDetails.cardNumber || !paymentDetails.cardExpiry || !paymentDetails.cardCVV)) {
      alert('Please fill in your card details');
      return;
    } else if (!address) {
      alert('Please provide a delivery address');
      return;
    }

    setLoading(true); // Start loading state
    // Implement payment processing logic here
    console.log('Payment details submitted:', { paymentMethod, paymentDetails, address });
    toast.success('Payment successful! Your order has been placed.', { autoClose: 3000 });

    // Clear cart after successful payment
    dispatch(clearCart());
    setLoading(false); // End loading state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Cart Items</h2>
            <ul className="border border-gray-300 rounded-lg shadow-sm p-4">
              {cartItems.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onQuantityChange={handleQuantityChange} 
                  onDelete={handleDeleteItem} 
                />
              ))}
            </ul>
          </div>

          <CartSummary 
            totalPrice={totalPrice} 
            onProceed={handleProceedToBuy} 
          />

          {isCheckout && (
            <Checkout 
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod} 
              paymentDetails={paymentDetails} 
              setPaymentDetails={setPaymentDetails} 
              address={address} 
              setAddress={setAddress} 
              onSubmit={handleSubmitPayment} 
              loading={loading} 
            />
          )}
        </div>
      )}

      <ToastContainer /> {/* Include ToastContainer for notifications */}
    </div>
  );
};

export default Cart;
