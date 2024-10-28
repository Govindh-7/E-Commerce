import { createSlice } from '@reduxjs/toolkit';

// Initialize cart items from localStorage
const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
    removeFromCart: (state, action) => {
      const newItems = state.items.filter(item => item.id !== action.payload);
      state.items = newItems;
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
    updateCartItemQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems'); // Clear localStorage
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
