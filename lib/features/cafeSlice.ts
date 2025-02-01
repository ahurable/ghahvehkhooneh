// src/lib/features/cafeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItemProps } from "../types";

// Define the category type
interface Category {
  name: string;
  items: MenuItemProps[];
}

// Define the slice state type
interface CafeState {
  isMenuOpen: boolean;
  selectedCategory: Category;
}

const initialState: CafeState = {
  isMenuOpen: false,
  selectedCategory: { name: "", items: [] },
};

const cafeSlice = createSlice({
  name: "cafeslice",
  initialState,
  reducers: {
    setMenuModal: (state, action: PayloadAction<{ isOpen: boolean; category: Category }>) => {
      state.isMenuOpen = action.payload.isOpen;
      state.selectedCategory = action.payload.category || { name: "", items: [] };
    },
  },
});

export const { setMenuModal } = cafeSlice.actions;
export const cafeSliceReducer = cafeSlice.reducer;
