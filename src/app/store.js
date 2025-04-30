import { configureStore } from '@reduxjs/toolkit'
import { UserSlice } from '../redux/slice/UserSlice'

export const store = configureStore({
    reducer: {
        User: UserSlice,
    },
})

export default store