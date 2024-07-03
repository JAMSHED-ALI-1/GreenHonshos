import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './feature/ProductsSlice'
import counterSlice from './feature/counterSlice'

export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    counter:counterSlice
  },
})