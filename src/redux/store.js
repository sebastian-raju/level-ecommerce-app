import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import cartSliceReducer from "./features/cartSlice";
import authSliceReducer from "./features/authSlice";
import registerSliceReducer from "./features/registerSlice";



const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    register: registerSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, 
})

export default store;