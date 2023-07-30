import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { MessageType } from '../interface/interfaces'

export const getMessage = createAsyncThunk('message/Message', async () => {
    const response = await axios.get("http://localhost:3001/messages");
    return response.data;
});

interface messagesState {
    messages: MessageType[];
    loading: boolean;
}

const initialState: messagesState = {
    messages: [],
    loading: false,
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getMessage.rejected, (state) => {
                state.loading = false;
            });
    },
})
export default messageSlice.reducer;