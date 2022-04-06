import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  currentUserToken:null,
  isFetching: false,
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
    logout: (state, action) => {
      state.currentUser = action.payload;
      state.currentUserToken = action.payload;
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
  logout
} = userSlice.actions;

export default userSlice.reducer;