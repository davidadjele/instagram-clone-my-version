import {createSlice} from '@reduxjs/toolkit'

const otherUserSlice = createSlice({
    name: "otherUser",
    initialState:{
        otherUser: null,
        otherUserPosts: null,
    },
    reducers:{
        setOtherUser: (state,action) => {
            state.otherUser = action.payload;
        },
        setOtherUserPosts: (state,action) => {
            state.otherUserPosts = action.payload;
        },
        logoutOtherUser: (state, action) => {
            state.otherUser = action.payload;
            state.otherUserPosts = action.payload;
        }
    }

});

export const { 
    setOtherUser, 
    setOtherUserPosts ,
    logoutOtherUser,
} = otherUserSlice.actions;

export default otherUserSlice.reducer;