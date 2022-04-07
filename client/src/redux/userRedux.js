import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  currentUserToken:null,
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
    logout: (state) => {
      state.currentUser = undefined;
      state.currentUserToken = undefined;
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
  setUserDataStatus
} = userSlice.actions;

export default userSlice.reducer;