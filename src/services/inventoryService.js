import axios from 'axios';
import { toast } from 'react-toastify';

// CREATE INITIAL INVENTORY ----------------------------------------------------------------------
export const addInventory = async (userData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/inventory/addInventory`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(
        'Successfully setup of initial inventory! To add items, scan invoice pdfs! To remove items, scan transaction pdfs'
      );
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

// GET TEAM INVENTORY ----------------------------------------------------------------------
export const getInventory = async () => {
  try {
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/inventory/getInventory`,
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

// GET INVENTORY ITEM ----------------------------------------------------------------------
export const getInventoryItem = async (userData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/inventory/getInventoryItem`,
      userData,
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

// UPDATE INVENTORY ITEM ----------------------------------------------------------------------
export const updateInventoryItem = async (userData) => {
  //

  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/inventory/updateInventory`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Update Successful!');
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

// DELETE INVENTORY ITEM ----------------------------------------------------------------------
export const deleteInventoryItem = async (userData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/inventory/deleteItem`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Deletion Successful!');
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

// GET UPDATED STATS ------------------------------------------------------------------------------------
export const getUpdatedStatsFromInventory = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/inventory/getUpdatedInventoryStats`,
      {
        withCredentials: true,
      }
    );

    //
    //

    if (response.statusText === 'OK') {
      toast.success('Team Stats Are Up To Date!');
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

// GET UPDATED SALES DATA ------------------------------------------------------------------------------------
export const getUpdatedSalesDataFromInventory = async () => {
  try {
    //
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/inventory/updateSaleData`,
      {
        withCredentials: true,
      }
    );

    //
    //

    if (response.statusText === 'OK') {
      toast.success('Inventory Sales Up To Date!');
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
