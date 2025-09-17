const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        state.items = JSON.parse(savedCart);
      }
    },
  },
});

export const { addToCart, loadCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
