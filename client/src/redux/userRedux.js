import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  currentUserToken:null,
  currentUserPost: [],
  isFetching: false,
  currentUserDataChanged: false,
  error: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    setUserToken: (state, action) => {
      state.currentUserToken = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUser: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    setUserDataStatus: (state, action) => {
      state.currentUserDataChanged = action.payload;
    },
    setCurrentUserPost: (state, action) => {
      state.currentUserPost = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.currentUserToken = null;
      state.currentUserPost = [];
      state.error = false;
    }
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure ,
  updateUser,
  setUserToken,
  logout,
  setUserDataStatus,
  setCurrentUserPost
} = userSlice.actions;

export default userSlice.reducer;