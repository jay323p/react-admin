import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inventoryCost: 0,
  inventoryQty: 0,
  qtySold: 0,
  revenue: 0,
  profit: 0,
  losses: 0,
  reorderList: [],
  recentTransactions: [],
  highDemandItems: [],
  lowDemandItems: [],
  highDemandLineData: {},
  lowDemandLineData: {},
  nearDueDateInvoices: [],
};

const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    SET_STATS(state, action) {
      const stats = action.payload;
      //
      //

      if (stats && stats.teamName !== '') {
        state.inventoryCost = stats.inventoryCost;
        state.inventoryQty = stats.inventoryQty;
        state.qtySold = stats.qtySold;
        state.revenue = stats.revenue;
        state.profit = stats.profit;
        state.losses = stats.losses;
        state.reorderList = stats.reorderList;
        state.recentTransactions = stats.recentTransactions;
        state.highDemandItems = stats.highDemandItems;
        state.lowDemandItems = stats.lowDemandItems;
        state.nearDueDateInvoices = stats.nearDueDateInvoices;
      }
    },
    SET_DEMAND_LINE_DATA(state, action) {
      const data = action.payload;

      state.highDemandLineData = data[0];
      state.lowDemandLineData = data[1];
    },
    SET_NEAR_DUE_INVOICES(state, action) {
      const data = action.payload;

      state.nearDueDateInvoices = data;
    },
  },
});

export const { SET_STATS, SET_DEMAND_LINE_DATA, SET_NEAR_DUE_INVOICES } =
  statSlice.actions;
export const selectInventoryCost = (state) => state.stat.inventoryCost;
export const selectInventoryQty = (state) => state.stat.inventoryQty;
export const selectQtySold = (state) => state.stat.qtySold;
export const selectRevenue = (state) => state.stat.revenue;
export const selectProfit = (state) => state.stat.profit;
export const selectLosses = (state) => state.stat.losses;
export const selectReorderList = (state) => state.stat.reorderList;
export const selectRecentTransactions = (state) =>
  state.stat.recentTransactions;
export const selectHighDemandItems = (state) => state.stat.highDemandItems;
export const selectLowDemandItems = (state) => state.stat.lowDemandItems;
export const selecthighDemandLineData = (state) =>
  state.stat.highDemandLineData;
export const selectlowDemandLineData = (state) => state.stat.lowDemandLineData;
export const selectNearDueDateInvoices = (state) =>
  state.stat.nearDueDateInvoices;

export default statSlice.reducer;
