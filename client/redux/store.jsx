import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../redux/slices/productSlice";
// import { postSlice } from "../redux/slices/postSlice";
// import { categorySlice } from "../redux/slices/categorySlice";
import { empSlice } from "../redux/slices/empSlice";
import { registerSlice } from "../redux/slices/registerSlice";
import { userSlice } from "../redux/slices/userSlice";

const store = configureStore({
  reducer: { 
    [productSlice.reducerPath]: productSlice.reducer,
    // [postSlice.reducerPath]: postSlice.reducer,
    // [categorySlice.reducerPath]: categorySlice.reducer,
    [empSlice.reducerPath]: empSlice.reducer,
    [registerSlice.reducerPath]: registerSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productSlice.middleware)
      // .concat(postSlice.middleware)
      // .concat(categorySlice.middleware)
      .concat(empSlice.middleware)
      .concat(registerSlice.middleware)
      .concat(userSlice.middleware),
});

export default store;
