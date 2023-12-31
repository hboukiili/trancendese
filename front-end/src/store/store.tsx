import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/usersSlice"
import adminReducer from "../features/adminSlice"
import isDown from "../features/ServerDown"
import TwoFa from "../features/2FA"
import token from "../features/SocketToken"

const store = configureStore({
    reducer:{
        users: userReducer,
        admin : adminReducer,
        TwoFa,
        isDown,
        token,
    },
})
export default  store;
export type AppDispatch = typeof store.dispatch