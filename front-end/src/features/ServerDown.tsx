import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "../Interceptor/Interceptor"
type isDown = {
    "isDown": boolean,
}
const initialState: isDown | undefined = {
    "isDown": true,
}

const isDown = createSlice({
    name: "isDown",
    initialState,
    reducers: {
        seIsDown: (state: isDown, action: PayloadAction<boolean>) => {
            if (action.payload !== undefined)
                state.isDown = action.payload;
        },
    }
});
export const { seIsDown } = isDown.actions;
export default isDown.reducer;