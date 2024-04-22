import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


export interface menuState {
    isMenuOpen: boolean
}

const initialState: menuState = {
    isMenuOpen: false
} 

export const menuMobileSlice = createSlice({
    name: 'ismenuopen',
    initialState,
    reducers: {
        setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
            // console.log('clicked')
            state.isMenuOpen = action.payload
        }
    }
})

export const { setIsMenuOpen } = menuMobileSlice.actions
export const menuReducer = menuMobileSlice.reducer