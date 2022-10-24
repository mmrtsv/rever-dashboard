import { initialApiState, ApiCallBase } from './apiConfiguration'
import { AuthApi, AuthUserResponse, LoginInput } from '@itsrever/dashboard-api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const axiosInstance = axios.create({
    withCredentials: true
})

const authApi = new AuthApi(undefined, undefined, axiosInstance)

interface LoginCall extends ApiCallBase {
    response: AuthUserResponse
}

interface State {
    login: LoginCall
}

const initialState: State = {
    login: initialApiState
}

//Api actions
export const login = createAsyncThunk(
    '/login',
    async (args: { username: string; password: string }) => {
        const { username, password } = args
        const loginResponse = await authApi.login({ username, password })
        console.log('loginResponse', loginResponse)
        return loginResponse
    }
)

//Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthApiCalls: (state) => {
            //Reset all api calls conserving the response data
            state.login = {
                ...initialApiState,
                response: state.login.response
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.login.loading = 'pending'
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.login.loading = 'succeeded'
            state.login.response = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.login.loading = 'failed'
            state.login.error = action.error
        })
    }
})

export const { resetAuthApiCalls } = authSlice.actions
export default authSlice.reducer
