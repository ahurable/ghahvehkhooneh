import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    showEditBanner: boolean,
    additem: boolean,
    addClub: boolean,
    editItem: boolean,
    showQR: boolean,
    editClubMembers: boolean,
} = {
    showEditBanner: false,
    additem: false,
    addClub: false,
    editItem: false,
    showQR: false,
    editClubMembers: false,
}

const adminSlice = createSlice({
    name: "admins" ,
    initialState,
    reducers: {
        setEditBannerState : (state, action: PayloadAction<boolean>) => {
            state.showEditBanner = action.payload
        },
        setAddItemModalState: (state, action: PayloadAction<boolean>) => {

            state.additem = action.payload
    
        },
        setAddClubState: (state, action:PayloadAction<boolean>) => {
            state.addClub = action.payload
        },
        setQrCodeState: (state, action: PayloadAction<boolean>) => {
            state.showQR = action.payload
        },
        setEditClubMembers: (state, action: PayloadAction<boolean>) => {
            state.editClubMembers = action.payload
        }
    }
})

export const {setEditBannerState} = adminSlice.actions
export const { setAddItemModalState } = adminSlice.actions
export const { setAddClubState } = adminSlice.actions
export const { setQrCodeState } = adminSlice.actions
export const { setEditClubMembers } = adminSlice.actions


export const adminReducer = adminSlice.reducer