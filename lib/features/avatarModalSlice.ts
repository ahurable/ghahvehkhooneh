import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    isOpen: boolean
} = {
    isOpen: false
}

const avatarModalSlice = createSlice({
    name: "avatarmodalstate" ,
    initialState,
    reducers: {
        setAvatarModalState: (state, action: PayloadAction<boolean>) => {

            state.isOpen = action.payload
    
        }
    }
})


export const { setAvatarModalState } = avatarModalSlice.actions
export const avatarModalReducer = avatarModalSlice.reducer