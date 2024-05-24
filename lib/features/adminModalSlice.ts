import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    additem: boolean
} = {
    additem: false
}

const adminSlice = createSlice({
    name: "admins" ,
    initialState,
    reducers: {
        setAddItemModalState: (state, action: PayloadAction<boolean>) => {

            state.additem = action.payload
    
        }
    }
})


export const { setAddItemModalState } = adminSlice.actions
export const adminReducer = adminSlice.reducer