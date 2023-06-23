import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading : true
}
const Loading = createSlice({
    name : 'isLoading',
    initialState,
    reducers : {
        setTrue : (state:any) => {
            state.isLoading = true;
        },
        setFalse : (state:any) => {
            state.isLoading = false;
        }
    }
})

export const { setTrue, setFalse } = Loading.actions;
export default Loading.reducer;