import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../Interceptor/Interceptor"

export const getToken = createAsyncThunk('TokenSocket/getToken', async () => {
    const response = await axios.get("/auth/WsToken");  
    return response.data;
});

interface token {
    token: string;
}

const initialState: token = {
    token: '',
};

const TokenSocket = createSlice({
    name: 'token',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getToken.pending, (state) => {
            })
            .addCase(getToken.fulfilled, (state, action) => {
                if (action.payload !== undefined)
                state.token = action.payload;
            })
            .addCase(getToken.rejected, (state) => {
            });
    },
})

export default TokenSocket.reducer;