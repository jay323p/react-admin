import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// CREATE PROFILE ----------------------------------------------------------------------
export const createProfile = async (userData) => {
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/profile/createprofile`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Successfully created new profile!');
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

// GET PROFILE ----------------------------------------------------------------------
export const getProfile = async () => {
  try {
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/profile/getprofile`,
      {
        withCredentials: true,
      }
    );

    //

    if (response.statusText === 'OK') {
      toast.success(`Welcome, ${response.data.name}`);
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

// UPDATE PROFILE ----------------------------------------------------------------------
export const updateProfile = async (userData) => {
  try {
    const response = await axios.patch(
      `https://jays-inventory-management.herokuapp.com/api/profile/updateprofile`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Successfully Updated Profile!');
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

// REMOVE PROFILE ----------------------------------------------------------------------
export const removeProfile = async (userData) => {
  try {
    //
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/profile/deleteprofile`,
      { teamName: userData },
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success('Successfully Deleted Profile!');
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

// CREATE TEAMID AND TEAMNAME ----------------------------------------------------------------------
export const createTeam = async (userData) => {
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/profile/createteamID`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(response.data.message);
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

// JOIN TEAM ----------------------------------------------------------------------
export const joinTeamAPI = async (userData) => {
  try {
    const response = await axios.patch(
      `https://jays-inventory-management.herokuapp.com/api/profile/joinTeam`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(response.data.message);
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

// GET ALL TEAM MEMBERS ----------------------------------------------------------------------
export const getTeamMembers = async (userData) => {
  try {
    const response = await axios.post(
      `https://jays-inventory-management.herokuapp.com/api/profile/getAllTeamProfiles`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(`Success!`);
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

// REMOVE MEMBER FROM TEAM ----------------------------------------------------------------------
export const removeMember = async (id) => {
  //
  try {
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/profile/removeProfile/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(`Success!`);
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

// UPDATE ACCESS ----------------------------------------------------------------------
export const updateAccess = async (userData) => {
  try {
    const response = await axios.patch(
      `https://jays-inventory-management.herokuapp.com/api/profile/updateAdmins`,
      userData,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(`Success!`);
    }
    //
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// GET SPECIFIC MEMBER PROFILE ----------------------------------------------------------------------
export const getMemberProfile = async (profileOwner) => {
  try {
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/profile/getMemberProfile/${profileOwner}`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(`Success!`);
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

// CAN POPULATE APP ----------------------------------------------------------------------
export const canPopulateApp = async () => {
  try {
    const response = await axios.get(
      `https://jays-inventory-management.herokuapp.com/api/profile/canPopulateApp`,
      {
        withCredentials: true,
      }
    );

    if (response.statusText === 'OK') {
      toast.success(`Success!`);
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
