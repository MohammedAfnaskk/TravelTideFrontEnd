    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        MainPlace: {},
     }
    const userSlice = createSlice({
        name: 'user',
        initialState,
        
        reducers: {
            setMainPlace: (state, action) =>{
                state.MainPlace = action.payload;
            },
            clearMainPlace: (state) =>{
                state.MainPlace ={};
            },
        },
    });

    export const {setMainPlace,clearMainPlace} = userSlice.actions;
    export default userSlice.reducer;
