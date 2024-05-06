import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    isOpen: boolean
} = {
    isOpen: false
}

const jobModalSlice = createSlice({
    name: "jobmodalstate" ,
    initialState,
    reducers: {
        setJobModalState: (state, action: PayloadAction<boolean>) => {

            state.isOpen = action.payload
    
        }
    }
})


export const { setJobModalState } = jobModalSlice.actions
export const jobModalReducer = jobModalSlice.reducer