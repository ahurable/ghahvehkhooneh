import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OpenModalState {
    isOpen: boolean
}

const initialState: OpenModalState = {
    isOpen: false
}

export const profileModalSlice = createSlice({
    name: 'profilemodal',
    initialState,
    reducers: {
        setProfileModalState: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
})

export const { setProfileModalState } = profileModalSlice.actions
export const profileModalReducer = profileModalSlice.reducer