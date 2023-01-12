import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MeUserResponse, AuthApi } from '@itsrever/dashboard-api'
import { axiosInstance } from './apiConfiguration'

const authApi = new AuthApi(undefined, undefined, axiosInstance)

interface GetMeCall extends ApiCallBase {
    response: MeUserResponse
}

interface State {
    getMe: GetMeCall
}

const initialState: State = {
    getMe: initialApiState
}

export const getMe = createAsyncThunk('/getMe', async () => {
    const getMeResponse = await authApi.me()
    return getMeResponse.data
})

const authApiSlice = createSlice({
    name: 'authApi',
    initialState,
    reducers: {
        resetAuthApiCalls: (state) => {
            state.getMe = {
                ...initialApiState,
                response: state.getMe.response
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMe.pending, (state) => {
            state.getMe.loading = 'pending'
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.getMe.loading = 'succeeded'
            state.getMe.response = action.payload
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.getMe.loading = 'failed'
            state.getMe.error = action.error
        })
    }
})

export const { resetAuthApiCalls } = authApiSlice.actions
export default authApiSlice.reducer
