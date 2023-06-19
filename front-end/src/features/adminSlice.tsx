import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminType } from '../interface/interfaces'
import { userType } from '../interface/interfaces'


const initialState: adminType | undefined = {
    login: "",
    level: 0,
    lastGame: null,
    avatar: '',
    points: 0
}

const Admin = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state: adminType, action: PayloadAction<userType | undefined>) => {
            if(action.payload !== undefined)
            {
                state.login = action.payload.login;
                state.avatar = action.payload.avatar;
                state.points = action.payload.points;
                state.level = action.payload.level;
                state.lastGame = action.payload.lastGame;
            }
        }
    },
});
export const { setAdmin } = Admin.actions;
export default Admin.reducer;