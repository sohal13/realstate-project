import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFaliur:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart :(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFaliur:(state)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutStart :(state)=>{
            state.loading=true;
        },
        signOutSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading=false;
            state.error=null;
        },
        signOutFaliur:(state)=>{
            state.error=action.payload;
            state.loading=false;
        },
        userDeletedStart :(state)=>{
            state.loading=true;
        },
        userDeletedSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading=false;
            state.error=null;
        },
        userDeletedFaliur:(state)=>{
            state.error=action.payload;
            state.loading=false;
        },
    }
})

export const {signInStart,signInSuccess,signInFaliur, updateUserFaliur,updateUserStart,updateUserSuccess,
signOutFaliur,signOutStart,signOutSuccess
,userDeletedFaliur,userDeletedSuccess,userDeletedStart} = userSlice.actions;

export default userSlice.reducer;