import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import profileReducer from '../redux/features/profile/profileSlice';
import inventoryReducer from '../redux/features/inventory/inventorySlice';
import invoiceReducer from '../redux/features/invoice/invoiceSlice';
import transactionReducer from '../redux/features/transactions/transactionsSlice';
import statReducer from '../redux/features/stats/statSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    invoice: invoiceReducer,
    inventory: inventoryReducer,
    stat: statReducer,
    transaction: transactionReducer,
  },
});
