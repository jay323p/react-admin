import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inventory: [],
  totalQty: 0,
  inventoryCost: 0,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    SET_INVENTORY(state, action) {
      const inventory = action.payload;

      state.inventory = inventory;
    },
    SET_INVENTORY_QTY(state, action) {
      const inventory = action.payload;

      state.totalQty = inventory.totalQty;
    },
    SET_INVENTORY_COST(state, action) {
      const inventory = action.payload;

      state.inventoryCost = inventory.inventoryCost;
    },
  },
});

export const { SET_INVENTORY, SET_INVENTORY_QTY, SET_INVENTORY_COST } =
  inventorySlice.actions;
export const selectInventory = (state) => state.inventory.inventory;
export const selectTotalQty = (state) => state.inventory.totalQty;
export const selectInventoryCost = (state) => state.inventory.inventoryCost;

export default inventorySlice.reducer;
