import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    FindPaginatedInlineItemsResults,
    FindPaginatedResults,
    ProcessesApi,
    ProcessesApiFindProcessesRequest,
    ProcessesApiFindLineItemsRequest
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

interface GetLineItemsCall extends ApiCallBase {
    response: FindPaginatedInlineItemsResults
}

interface State {
    getProcesses: GetProcessesCall
    getLineItems: GetLineItemsCall
}

const initialState: State = {
    getProcesses: initialApiState,
    getLineItems: initialApiState
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

const defaultValueLineItems: ProcessesApiFindLineItemsRequest = {
    ecommerceId: undefined,
    freetext: undefined,
    fullyRefunded: undefined,
    limit: undefined,
    offset: undefined,
    orderId: undefined,
    platform: undefined,
    processId: undefined,
    status: undefined
}

export const getLineItems = createAsyncThunk(
    '/getLineItems',
    async (args?: ProcessesApiFindLineItemsRequest) => {
        const {
            ecommerceId,
            freetext,
            fullyRefunded,
            limit,
            offset,
            orderId,
            platform,
            processId,
            status
        } = args || defaultValueLineItems
        const getLineItemsResponse = await processesApi.findLineItems({
            ecommerceId,
            freetext,
            fullyRefunded,
            limit,
            offset,
            orderId,
            platform,
            processId,
            status
        })
        return getLineItemsResponse.data
    }
)

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
        // console.log('getProcessesResponse', getProcessesResponse)

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
            state.getLineItems = {
                ...initialApiState,
                response: state.getLineItems.response
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
        builder.addCase(getLineItems.pending, (state) => {
            state.getLineItems.loading = 'pending'
        })
        builder.addCase(getLineItems.fulfilled, (state, action) => {
            state.getLineItems.loading = 'succeeded'
            state.getLineItems.response = action.payload
        })
        builder.addCase(getLineItems.rejected, (state, action) => {
            state.getLineItems.loading = 'failed'
            state.getLineItems.error = action.error
        })
    }
})

export const { resetProcessesApiCalls } = processesSlice.actions
export default processesSlice.reducer
