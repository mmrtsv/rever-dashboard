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
    token: string | undefined
}

const initialState: State = {
    getMe: initialApiState,
    token: undefined
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
        },
        setTokenData(state, action) {
            state.token = action.payload
        },
        resetTokenData(state) {
            state.token = undefined
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

export const { resetAuthApiCalls, setTokenData, resetTokenData } =
    authApiSlice.actions
export default authApiSlice.reducer
