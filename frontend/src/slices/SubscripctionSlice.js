// subscriptionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "setSubscriptionsPlans",
  initialState: [],
  reducers: {
    SetSubscriptionPlans: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setSubscriptionsPlans } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
