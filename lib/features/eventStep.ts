import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    steps: number,
    cafe: number | null,
    club: number | null
} = {
    steps: 0,
    cafe: null,
    club: null
}

const eventStepSlice = createSlice({
    name: "eventsteps" ,
    initialState,
    reducers: {
        setEventStep: (state, action: PayloadAction<number>) => {

            state.steps += action.payload
    
        }, 
        setEventCafe: (state, action: PayloadAction<number>) => {
            state.cafe = action.payload
        },
        setEventClub: (state, action: PayloadAction<number>) => {
            state.club = action.payload
        }
    }
})


export const { setEventStep, setEventCafe, setEventClub } = eventStepSlice.actions
export const eventStepReducer = eventStepSlice.reducer