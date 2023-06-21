import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/usersSlice"
import notificationReducer from "../features/notificationsSlice"
import messageReducer from "../features/messageSlice"
import adminReducer from "../features/adminSlice"
import theLoginReducer from "../features/isLoading"

const store = configureStore({
    reducer:{
        users: userReducer,
        notification: notificationReducer,
        messages: messageReducer,
        admin : adminReducer,
        theLogin : theLoginReducer
    },
})
export default  store;
export type AppDispatch = typeof store.dispatch