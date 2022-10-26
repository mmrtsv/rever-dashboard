import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FindPaginatedResults, ProcessesApi } from '@itsrever/dashboard-api'
import axios from 'axios'

// axios.defaults.withCredentials = true
const axiosInstance = axios.create({
    withCredentials: true
})
const processesApi = new ProcessesApi(undefined, undefined, axiosInstance)

interface GetProcessesCall extends ApiCallBase {
    response: FindPaginatedResults
}

interface State {
    getProcesses: GetProcessesCall
}

const initialState: State = {
    getProcesses: initialApiState
}

export const getProcesses = createAsyncThunk('/getProcesses', async () => {
    const getProcessesResponse = await processesApi.findProcesses()
    // console.log('getProcessesResponse', getProcessesResponse)

    return getProcessesResponse
})

const processesSlice = createSlice({
    name: 'processes',
    initialState,
    reducers: {
        resetProcessesApiCalls: (state) => {
            state.getProcesses = {
                ...initialApiState,
                response: state.getProcesses.response
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProcesses.pending, (state) => {
            state.getProcesses.loading = 'pending'
        })
        builder.addCase(getProcesses.fulfilled, (state, action) => {
            state.getProcesses.loading = 'succeeded'
            state.getProcesses.response = action.payload.data
        })
        builder.addCase(getProcesses.rejected, (state, action) => {
            state.getProcesses.loading = 'failed'
            state.getProcesses.error = action.error
        })
    }
})

export const { resetProcessesApiCalls } = processesSlice.actions
export default processesSlice.reducer
