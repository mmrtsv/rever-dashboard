import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    FindPaginatedResults,
    ProcessesApi,
    ProcessesApiFindProcessesRequest
} from '@itsrever/dashboard-api'
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

const defaultValueProcesses: ProcessesApiFindProcessesRequest = {
    customerPrintedOrderId: undefined,
    freetext: undefined,
    fullyRefunded: undefined,
    limit: undefined,
    offset: undefined,
    order: undefined,
    orderId: undefined,
    platform: undefined,
    processId: undefined,
    returnMethod: undefined,
    sortby: undefined
}

export const getProcesses = createAsyncThunk(
    '/getProcesses',
    async (args?: ProcessesApiFindProcessesRequest) => {
        const {
            customerPrintedOrderId,
            freetext,
            fullyRefunded,
            limit,
            offset,
            order,
            orderId,
            platform,
            processId,
            returnMethod,
            sortby
        } = args || defaultValueProcesses
        const getProcessesResponse = await processesApi.findProcesses({
            customerPrintedOrderId,
            freetext,
            fullyRefunded,
            limit,
            offset,
            order,
            orderId,
            platform,
            processId,
            returnMethod,
            sortby
        })
        return getProcessesResponse.data
    }
)

const processesSlice = createSlice({
    name: 'processesApi',
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
            state.getProcesses.response = action.payload
        })
        builder.addCase(getProcesses.rejected, (state, action) => {
            state.getProcesses.loading = 'failed'
            state.getProcesses.error = action.error
        })
    }
})

export const { resetProcessesApiCalls } = processesSlice.actions
export default processesSlice.reducer
