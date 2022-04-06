import {createSlice} from '@reduxjs/toolkit'

const navBarSlice = createSlice({
    name: "active",
    initialState:{
        activeHome: false,
        activeAdd: false,
        activeProfile: false,
        activeMessage: false,
    },
    reducers:{
        setActiveHome: (state,action) => {
            state.activeHome = true;
            state.activeAdd = false;
            state.activeMessage = false;
            state.activeProfile = false;
        },setActiveMessage: (state,action) => {
            state.activeHome = false;
            state.activeAdd = false;
            state.activeMessage = true;
            state.activeProfile = false;
        },
        setActiveAdd: (state,action) => {
            state.activeHome = false;
            state.activeAdd = true;
            state.activeMessage = false;
            state.activeProfile = false;
        },
        setActiveProfile: (state,action) => {
            state.activeHome = false;
            state.activeAdd = false;
            state.activeMessage = false;
            state.activeProfile = true;
        }
    }

});

export const {setActiveHome,setActiveAdd,setActiveMessage,setActiveProfile} = navBarSlice.actions;
export default navBarSlice.reducer;