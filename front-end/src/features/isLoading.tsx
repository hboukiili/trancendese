import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading : false
}
const Loading = createSlice({
    name : 'Loading',
    initialState,
    reducers : {
        setTrue : (state:any) => {
            state.isLoading = true;
        }
    }
})

export const { setTrue } = Loading.actions;
export default Loading.reducer;