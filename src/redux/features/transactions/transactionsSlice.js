import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    SET_TRANSACTIONS(state, action) {
      const transactions = action.payload;
      //
      //

      if (transactions.length > 0) {
        state.transactions = transactions;
      }
    },
  },
});

export const { SET_TRANSACTIONS } = transactionsSlice.actions;
export const selectTransactions = (state) => state.transaction.transactions;

export default transactionsSlice.reducer;
