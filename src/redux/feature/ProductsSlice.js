import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  wishlist: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Fetch All Products
export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (_, thunkApi) => {
    const apiUrl = 'https://stgpim.getketch.com/pim/pimresponse.php/?service=category&store=1&url_key=mens-fashion%2Fshirts%2Fcasual-shirts&page=1&count=50&sort_by=&sort_dir=desc&filter=';
    try {
      const response = await axios.get(apiUrl);
      return response.data.result.products;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(product => product.id !== action.payload.id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addToWishlist, removeFromWishlist } = productsSlice.actions;
export default productsSlice.reducer;
