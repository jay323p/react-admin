import axios from 'axios';
import { toast } from 'react-toastify';

// POST UPDATED STATS ----------------------------------------------------------------------
export const getUpdatedTeamStats = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/stats/getStats`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// POST UPDATED STATS ----------------------------------------------------------------------
export const postUpdatedStats = async (noData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/stats/postStats`,
      noData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET REVENUE LINE DATA ---------------------------------------------------------------------
export const getRevenueLineData = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/stats/createLineData`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// UPDATE REORDERLISTITEMFINALQTYTOORDER ---------------------------------------------------------------------
export const updateFinalQtyToOrderService = async (formData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/stats/updateQtyToOrder`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Update successful!');
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// CREATE DEMAND LINE CHART DATA ---------------------------------------------------------------------
export const getDemandLineChartData = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/stats/createDemandLineData`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET NEAR DUE DATE INVOICES ----------------------------------------------------------------------------
export const getNearDueDateInvoicesFromInvoices = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/stats/getNearDueDateInvoices`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET RECENT TRANSACTIONS BAR CHART DATA ----------------------------------------------------------------------------
export const getRecentTransactionsBarChartData = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/stats/createTransactionsBarData`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
