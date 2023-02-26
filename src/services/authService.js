import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// REGISTER USER --------------------------------------------------------------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/users/register`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Registered Successfully!');
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

// LOGIN USER -----------------------------------------------------------------------
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/users/login`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Login Successfull!');
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

// LOGOUT USER ---------------------------------------------------------------------
export const logoutUser = async () => {
  try {
    await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/users/logout`,
      {
        withCredentials: true,
      }
    );

    toast.success('Session has expired, log-out successful!');
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET LOGIN STATUS --------------------------------------------------------------------
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/users/loginstatus`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// FORGOT PASSWORD -------------------------------------------------------------------
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/users/forgotpass`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// RESET PASSWORD ----------------------------------------------------------------------
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(
      `https://jays-inventory-management.herokuapp.com/api/users/resetpassword/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
