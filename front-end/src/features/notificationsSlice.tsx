import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { NotificationType } from '../interface/interfaces'

export const getNotification = createAsyncThunk('notification/getNotification', async () => {
    const response = await axios.get("http://localhost:3001/notifications");
    return response.data;
});

interface notificationsState {
    notifications: NotificationType[];
    loading: boolean;
}

const initialState: notificationsState = {
    notifications: [],
    loading: false,
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotification.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(getNotification.rejected, (state) => {
                state.loading = false;
            });
    },
})
export default notificationSlice.reducer;