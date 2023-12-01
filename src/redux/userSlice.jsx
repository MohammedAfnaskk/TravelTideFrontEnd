    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        MainPlace: {},
<<<<<<< HEAD
        Invitations: {},

     }

=======
     }
>>>>>>> origin/main
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
<<<<<<< HEAD
            setInvitations:(state, action) =>{
                state.Invitations =action.payload;
            },
            clearInvitaions: (state) =>{
                state.Invitations ={};
            },
        },
    });

    export const {setMainPlace,clearMainPlace,setInvitations,clearInvitaions} = userSlice.actions;
=======
        },
    });

    export const {setMainPlace,clearMainPlace} = userSlice.actions;
>>>>>>> origin/main
    export default userSlice.reducer;
