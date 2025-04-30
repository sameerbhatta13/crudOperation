import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'User',
    initialState: {
        token: localStorage.getItem('token')
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        }
    }
})

export const { setToken } = UserSlice.actions
export default UserSlice.reducer