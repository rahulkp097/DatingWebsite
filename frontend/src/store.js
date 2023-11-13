import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice  } from "./slices/apiSlice";
import adminAuthSlice from "./slices/adminAuthSlice";
import SubscripctionSlice from "./slices/SubscripctionSlice";
const store=configureStore({
    reducer:{
        auth:authSlice,
        adminAuth:adminAuthSlice,
        subscriptionsPlans: SubscripctionSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(apiSlice.middleware),
  devTools: true,
})


export default store