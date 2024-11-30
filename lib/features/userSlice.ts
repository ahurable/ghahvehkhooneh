import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    avatar: string,
    username: string,
    isAdmin: boolean,
    loggedIn: boolean
} = {
    avatar: "",
    username: "",
    isAdmin: false,
    loggedIn: false
}

const userSlice = createSlice({
    name: "userslice" ,
    initialState,
    reducers: {
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload
        },
        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload
        },
    }
})


export const { 
    setAvatar,
    setUsername,
    setIsAdmin,
    setLoggedIn
} = userSlice.actions
export const userReducer = userSlice.reducer