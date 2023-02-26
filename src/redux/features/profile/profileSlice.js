import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  profile: {
    profileOwner: '',
    teamName: undefined,
    teamJoined: '',
    name: '',
    age: undefined,
    access: '',
    email: '',
    photo: {
      fileName: '',
      filePath: '',
      fileType: '',
      fileSize: '',
    },
    phone: '',
    bio: '',
    accessChanges: [],
  },
  teamName: '',
  memberProfile: {
    profileOwner: '',
    teamName: undefined,
    teamJoined: '',
    name: '',
    age: undefined,
    access: '',
    email: '',
    photo: {
      fileName: '',
      filePath: '',
      fileType: '',
      fileSize: '',
    },
    phone: '',
    bio: '',
    createdAt: '',
  },
  hasInventory: false,
  hasInvoices: false,
  hasTransactions: false,
  hasStats: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_PROFILE(state, action) {
      const profile = action.payload;

      state.profile.profileOwner = profile.profileOwner;
      state.profile.teamName = profile.teamName;
      state.profile.teamJoined = profile.teamJoined;
      state.profile.name = profile.name;
      state.profile.age = profile.age;
      state.profile.access = profile.access;
      state.profile.email = profile.email;
      state.profile.photo.fileName = profile.photo.fileName
        ? profile.photo.fileName
        : '';
      state.profile.photo.filePath = profile.photo.filePath
        ? profile.photo.filePath
        : '';
      state.profile.photo.fileType = profile.photo.fileType
        ? profile.photo.fileType
        : '';
      state.profile.photo.fileSize = profile.photo.fileSize
        ? profile.photo.fileSize
        : '';
      state.profile.phone = profile.phone;
      state.profile.bio = profile.bio;
      state.profile.accessChanges = profile.accessChanges
        ? profile.accessChanges
        : [];
    },
    SET_TEAMNAME(state, action) {
      const teamName = action.payload;
      state.teamName = teamName;
    },
    SET_MEMBER_PROFILE(state, action) {
      const profile = action.payload;

      state.memberProfile.profileOwner = profile.profileOwner;
      state.memberProfile.teamName = profile.teamName;
      state.memberProfile.teamJoined = profile.teamJoined;
      state.memberProfile.name = profile.name;
      state.memberProfile.age = profile.age;
      state.memberProfile.access = profile.access;
      state.memberProfile.email = profile.email;
      state.memberProfile.photo.filePath = profile.photo.filePath;
      state.memberProfile.photo.fileName = profile.photo.fileName;
      state.memberProfile.photo.fileType = profile.photo.fileType;
      state.memberProfile.photo.fileSize = profile.photo.fileSize;
      state.memberProfile.phone = profile.phone;
      state.memberProfile.bio = profile.bio;
      state.memberProfile.createdAt = profile.createdAt;
    },
    SET_TEAM_BOOLEANS(state, action) {
      const booleans = action.payload;

      state.hasInventory = booleans.hasInventory;
      state.hasInvoices = booleans.hasInvoices;
      state.hasTransactions = booleans.hasTransactions;
      state.hasStats = booleans.hasStats;
    },
  },
});

export const {
  SET_LOGIN,
  SET_PROFILE,
  SET_TEAMNAME,
  SET_MEMBER_PROFILE,
  SET_TEAM_BOOLEANS,
} = profileSlice.actions;
export const selectIsLoggedIn = (state) => state.profile.isLoggedIn;
export const selectProfile = (state) => state.profile.profile;
export const selectMemberProfile = (state) => state.profile.memberProfile;
export const selectHasInventory = (state) => state.profile.hasInventory;
export const selectHasInvoices = (state) => state.profile.hasInvoices;
export const selectHasTransactions = (state) => state.profile.hasTransactions;
export const selectHasStats = (state) => state.profile.hasStats;

export default profileSlice.reducer;
