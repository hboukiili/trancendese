import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../Interceptor/Interceptor"
type twoFA = {
    "isFirst": boolean,
    "FA_ON": boolean
}
const initialState: twoFA | undefined = {
    "isFirst": true,
    "FA_ON": false
}
export const get2FA = createAsyncThunk('twoFA/get2FA', async () => {
    const response = await axios.get("/auth/isFA-enabled");
    return response.data;
});

const TwoFa = createSlice({
    name: "TwoFa",
    initialState,
    reducers: {
        setFA_ON: (state: twoFA, action: PayloadAction<boolean>) => {
            if (action.payload !== undefined)
                state.FA_ON = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get2FA.pending, (state) => {
                // state.loading = true;
            })
            .addCase(get2FA.fulfilled, (state, action) => {
                // state.loading = false;
                const { isFirst, FA_ON} = action.payload;
                state.isFirst = isFirst;
                state.FA_ON = FA_ON;
            })
            .addCase(get2FA.rejected, (state) => {
                // state.loading = false;
            });
    },
});
export const { setFA_ON } = TwoFa.actions;
export default TwoFa.reducer;