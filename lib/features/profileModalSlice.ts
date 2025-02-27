import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OpenModalState {
    isOpen: boolean,
    isCityModal: boolean,
    city: {id:number, name:string},
    isPhoneValidationModal: boolean,
    isPhoneChangeModal: boolean
}

const initialState: OpenModalState = {
    isOpen: false,
    isCityModal: false,
    city: { id: 0, name: 'default'},
    isPhoneValidationModal: false,
    isPhoneChangeModal: false
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
        setCity: (state, action: PayloadAction<{id:number,name:string}>) => {
            state.city = action.payload
        },
        setPhoneValidationModal: (state, action:PayloadAction<boolean>) => {
            state.isPhoneValidationModal = action.payload
        },
        setPhoneChangeModal: (state, action:PayloadAction<boolean>) => {
            state.isPhoneChangeModal = action.payload
        }
    }
})

export const { 
    setEditProfileModalState,
    setSelectCity,
    setCity,
    setPhoneValidationModal,
    setPhoneChangeModal
} = profileModalSlice.actions
export const profileModalReducer = profileModalSlice.reducer