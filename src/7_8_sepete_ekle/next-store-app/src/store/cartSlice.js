import { add_to_cart, get_cart } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  items: [],
  loading: false,
};

export const fecthCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await get_cart();
      return data.items;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Fetch cart failed"
      );
    }
  }
);

export const addProductToDb = createAsyncThunk(
  "cart/addProductToDb",
  async ({ product_id, quantity = 1 }, { rejectWithValue }) => {
    try {
      const data = await add_to_cart(product_id, quantity);
      return data.items;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Add to cart failed"
      );
    }
  }
);

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
        state.items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.images[0].image,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        state.items = JSON.parse(savedCart);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fecthCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fecthCart.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        console.error("Fetch cart failed:", action.payload);
      })
      .addCase(addProductToDb.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToDb.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addProductToDb.rejected, (state, action) => {
        state.loading = false;
        console.error("Add to cart failed:", action.payload);
      });
  },
});

export const {
  addToCart,
  loadCartFromStorage,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
