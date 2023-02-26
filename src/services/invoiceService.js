import axios from 'axios';
import { toast } from 'react-toastify';

// CREATE INVOICE ENTRY ----------------------------------------------------------------------
export const addInvoice = async (userData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/invoice/addInvoice`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Successfully added new invoice!');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET ALL TEAM INVOICES ---------------------------------------------------------------------------
export const getTeamInvoices = async () => {
  try {
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/invoice/getAllInvoices`,
      {
        withCredentials: true,
      }
    );

    // if (response.statusText === 'OK') {
    //   toast.success('Successfully created new profile!');
    // }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET SPECIFIC INVOICE ---------------------------------------------------------------------------
export const getInvoice = async (id) => {
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/invoice/getInvoice`,
      id,
      {
        withCredentials: true,
      }
    );

    // if (response.statusText === 'OK') {
    //   toast.success('Successfully created new profile!');
    // }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// DELETE SPECIFIC INVOICE ---------------------------------------------------------------------------
export const deleteInvoice = async (id) => {
  //
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/invoice/deleteInvoice`,
      id,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Invoice successfully deleted!');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// UPDATE INVOICE BALANCE ---------------------------------------------------------------------------
export const updateBalance = async (formData) => {
  //
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/invoice/updateBalance`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Invoice Balance Updated!');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
