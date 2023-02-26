import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  distributorInfo: {
    companyName: '',
    streetAddress: '',
    cityState: '',
    zipCode: '',
    phone: '',
    email: '',
    invoiceNumber: '',
    dateOfIssue: '',
    dueDate: '',
  },
  invoiceItems: [],
  teamInvoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    SET_INVOICE(state, action) {
      const invoice = action.payload;
      //

      state.distributorInfo.companyName = invoice.companyName;
      state.distributorInfo.streetAddress = invoice.streetAddress;
      state.distributorInfo.cityState = invoice.cityState;
      state.distributorInfo.zipCode = invoice.zipCode;
      state.distributorInfo.phone = invoice.phone;
      state.distributorInfo.email = invoice.email;
      state.distributorInfo.invoiceNumber = invoice.invoiceNumber;
      state.distributorInfo.dateOfIssue = invoice.dateOfIssue;
      state.distributorInfo.dueDate = invoice.dueDate;
      state.invoiceItems = invoice.invoiceItems;
    },
    SET_TEAM_INVOICES(state, action) {
      const invoices = action.payload;

      state.teamInvoices = invoices;
    },
  },
});

export const { SET_INVOICE, SET_TEAM_INVOICES } = invoiceSlice.actions;
export const selectDistributorInfo = (state) => state.invoice.distributorInfo;
export const selectInvoiceItems = (state) => state.invoice.invoiceItems;
export const selectTeamInvoices = (state) => state.invoice.teamInvoices;

export default invoiceSlice.reducer;
