import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLogin : false
}
const theLogin = createSlice({
    name : 'theLogin',
    initialState,
    reducers : {
        setTrue : (state:any) => {
            state.isLogin = true;
        }
    }
})

export const { setTrue } = theLogin.actions;
export default theLogin.reducer;