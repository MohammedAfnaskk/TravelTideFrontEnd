    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        MainPlace: {},
         Invitations: {},

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
             setInvitations:(state, action) =>{
                state.Invitations =action.payload;
            },
            clearInvitaions: (state) =>{
                state.Invitations ={};
            },
        },
    });

    export const {setMainPlace,clearMainPlace,setInvitations,clearInvitaions} = userSlice.actions;
 
    export default userSlice.reducer;
