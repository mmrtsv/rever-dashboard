import { createSlice } from '@reduxjs/toolkit'

interface State {
    token: string | undefined
}

const initialState: State = {
    token: undefined
}

const userDataSlice = createSlice({
    name: 'tokenData',
    initialState,
    reducers: {
        setTokenData(state, action) {
            state.token = action.payload
        },
        resetTokenData(state) {
            state.token = undefined
        }
    }
})

export const { setTokenData, resetTokenData } = userDataSlice.actions
export default userDataSlice.reducer
