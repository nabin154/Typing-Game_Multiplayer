import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

export const typingSlice = createSlice({
    name: "typing",
    initialState,
    reducers:{
   setMode : (state , action)=>{
    state.user = action.payload;
   }
    }
});


export const { setMode } = typingSlice.actions;

export default typingSlice.reducer;