import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    MainPlace: {},
    // TripPlanning:[],
}

 
const userSlice = createSlice({
    name: 'user',
    initialState,
    
    reducers: {
        setMainPlace: (state, action) =>{
            state.MainPlace = action.payload;
        },
        clearMainPlace: (state, action) =>{
            state.MainPlace ={};
        },
        // setTripPlanning: (state, action) =>{
        //     state.TripPlanning =action.payload;
        // },
     },
});

export const {setMainPlace,clearMainPlace, setTripPlanning} = userSlice.actions;
export default userSlice.reducer;
