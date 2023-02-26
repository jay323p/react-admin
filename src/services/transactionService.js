import axios from 'axios';
import { toast } from 'react-toastify';

// ADD TRANSACTIONS ----------------------------------------------------------------------
export const addTransaction = async (userData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/transactions/addTransactions`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Successfully added new transaction!');
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

// GET TEAM TRANSACTIONS ----------------------------------------------------------------------
export const getTeamTransactions = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/transactions/getTransactions`,
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

// GET SINGLE TRANSACTION ----------------------------------------------------------------------
export const getSingleTeamTransaction = async (formData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/transactions/getSingleTransaction`,
      formData,
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
