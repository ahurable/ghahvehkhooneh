import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OpenModalState {
    isOpen: boolean,
    isCityModal: boolean,
    city: number
}

const initialState: OpenModalState = {
    isOpen: false,
    isCityModal: false,
    city: 1
}

export const profileModalSlice = createSlice({
    name: 'profilemodal',
    initialState,
    reducers: {
        setEditProfileModalState: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setSelectCity: (state, action: PayloadAction<boolean>) => {
            state.isCityModal = action.payload;
        },
        setCity: (state, action: PayloadAction<number>) => {
            state.city = action.payload
        }
    }
})

export const { 
    setEditProfileModalState,
    setSelectCity,
    setCity
} = profileModalSlice.actions
export const profileModalReducer = profileModalSlice.reducer