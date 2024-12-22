import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    showEditBanner: boolean,
    editDescription: boolean,
    additem: {
        show: boolean,
        categoryId: number
    },
    editCategory: {
        show: boolean,
        id: number,
    }
    addClub: boolean,
    editItem: {id:number, title?:string, description?:string, price?: string, state: boolean},
    showQR: boolean,
    editClubMembers: boolean,
    showAddCategory: boolean
} = {
    showEditBanner: false,
    editDescription: false,
    additem: {
        show: false,
        categoryId: 0
    },
    editCategory: {
        show: false,
        id: 0,
    },
    addClub: false,
    editItem: {id: 0, title: "", description: "", price: "", state: false},
    showQR: false,
    editClubMembers: false,
    showAddCategory: false
}

const adminSlice = createSlice({
    name: "admins" ,
    initialState,
    reducers: {
        setEditBannerState : (state, action: PayloadAction<boolean>) => {
            state.showEditBanner = action.payload
        },
        setEditDescription : (state, action: PayloadAction<boolean>) => {
            state.editDescription = action.payload
        },
        setAddItemModalState: (state, action: PayloadAction<{categoryId: number, show:boolean}>) => {
            console.log(action.payload)
            state.additem = action.payload
    
        },
        setEditCategoryState: (state, action: PayloadAction<{id: number, show: boolean}>) => {
            state.editCategory = action.payload
        },
        setAddClubState: (state, action:PayloadAction<boolean>) => {
            state.addClub = action.payload
        },
        setQrCodeState: (state, action: PayloadAction<boolean>) => {
            state.showQR = action.payload
        },
        setEditItem: (state, action: PayloadAction<{id:number, title?:string, description?:string, price?: string, state: boolean}>) => {
            state.editItem = action.payload
        },
        setEditClubMembers: (state, action: PayloadAction<boolean>) => {
            state.editClubMembers = action.payload
        },
        setShowAddCategory: (state, action: PayloadAction<boolean>) => {
            state.showAddCategory = action.payload
        }
    }
})

export const { setEditBannerState } = adminSlice.actions
export const { setEditDescription } = adminSlice.actions
export const { setAddItemModalState } = adminSlice.actions
export const { setAddClubState } = adminSlice.actions
export const { setQrCodeState } = adminSlice.actions
export const { setEditItem } = adminSlice.actions
export const { setEditClubMembers } = adminSlice.actions
export const { setShowAddCategory } = adminSlice.actions
export const { setEditCategoryState } = adminSlice.actions 

export const adminReducer = adminSlice.reducer