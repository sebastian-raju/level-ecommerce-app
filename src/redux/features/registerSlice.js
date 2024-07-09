import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  register: false
}


const registerSlice = createSlice({
  name:"register",
  initialState,
  reducers:{
    setRegister:(state, action) => {
      state.register = action.payload;
    }
  }
})


export const { setRegister } = registerSlice.actions;
export default registerSlice.reducer;