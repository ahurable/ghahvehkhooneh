import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    isOpen: boolean
} = {
    isOpen: false
}

const musicGenreModalSlice = createSlice({
    name: "mgenremodalstate" ,
    initialState,
    reducers: {
        setMGenreModalState: (state, action: PayloadAction<boolean>) => {

            state.isOpen = action.payload
    
        }
    }
})


export const { setMGenreModalState } = musicGenreModalSlice.actions
export const musicGenreModalReducer = musicGenreModalSlice.reducer