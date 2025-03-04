import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    isOpen: boolean
} = {
    isOpen: false
}

const hobbyModalSlice = createSlice({
    name: "hobbymodal" ,
    initialState,
    reducers: {
        setHobbyModalState: (state, action: PayloadAction<boolean>) => {

            state.isOpen = action.payload
    
        }
    }
})


export const { setHobbyModalState } = hobbyModalSlice.actions
export const hobbyModalReducer = hobbyModalSlice.reducer