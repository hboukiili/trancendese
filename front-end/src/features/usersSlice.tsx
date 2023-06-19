import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {userType} from '../interface/interfaces'

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get("http://localhost:3001/users");
  return response.data;
});

interface UsersState {
  users: userType[];
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
