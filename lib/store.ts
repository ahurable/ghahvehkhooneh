import { configureStore } from '@reduxjs/toolkit'
import { profileModalReducer } from './features/profileModalSlice'
import { menuReducer } from './features/menuMobileSlice'
import { avatarModalReducer } from './features/avatarModalSlice'
import { hobbyModalReducer } from './features/hobbyModalSlice'
import { jobModalReducer } from './features/jobModalSlice'
import { musicGenreModalReducer } from './features/mgenreModalSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
        profilemodal: profileModalReducer,
        menumobile: menuReducer,
        avatarmodal: avatarModalReducer,
        hobbymodal: hobbyModalReducer,
        jobmodal: jobModalReducer,
        mgenremodal: musicGenreModalReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']