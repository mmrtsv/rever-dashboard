import { createSlice } from '@reduxjs/toolkit'
import { AuthUser } from '@itsrever/dashboard-api'

export type UserData = AuthUser | undefined

interface State {
    user: UserData
}

const initialState: State = {
    user: undefined
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData(state, action) {
            state.user = action.payload
        },
        resetUserData(state) {
            state.user = undefined
        }
    }
})

export const { setUserData, resetUserData } = userDataSlice.actions
export default userDataSlice.reducer
