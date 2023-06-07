import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    ApiPaginatedResults,
    ProcessesApi,
    ProcessesApiFindProcessesRequest
} from '@itsrever/dashboard-api'
import { axiosInstance } from './apiConfiguration'

const processesApi = new ProcessesApi(undefined, undefined, axiosInstance)

interface GetProcessesCall extends ApiCallBase {
    response: ApiPaginatedResults
}

interface State {
    getProcesses: GetProcessesCall
    getPendingProcesses: GetProcessesCall
    getCompletedProcesses: GetProcessesCall
    getReviewRequiredProcesses: GetProcessesCall
}

const initialState: State = {
    getProcesses: initialApiState,
    getPendingProcesses: initialApiState,
    getCompletedProcesses: initialApiState,
    getReviewRequiredProcesses: initialApiState
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
    sortby: undefined,
    status: undefined,
    returnStatus: undefined
}

export async function getProcess(args: ProcessesApiFindProcessesRequest) {
    const { processId } = args || defaultValueProcesses
    const getProcessResponse = await processesApi.findProcesses({
        processId
    })
    return getProcessResponse.data
}

export const getPendingProcesses = createAsyncThunk(
    '/getPendingProcesses',
    async (args: ProcessesApiFindProcessesRequest) => {
        const { freetext, offset, limit, ecommerceId } =
            args || defaultValueProcesses
        const getPendingProcessesResponse = await processesApi.findProcesses({
            freetext,
            offset,
            limit,
            ecommerceId,
            returnStatus: 'STARTED,COLLECTED'
        })
        return getPendingProcessesResponse.data
    }
)

export const getReviewRequiredProcesses = createAsyncThunk(
    '/getReviewRequiredProcesses',
    async (args: ProcessesApiFindProcessesRequest) => {
        const { freetext, offset, limit, ecommerceId } =
            args || defaultValueProcesses
        const getReviewRequiredProcessesResponse =
            await processesApi.findProcesses({
                freetext,
                offset,
                limit,
                ecommerceId,
                returnStatus: 'REVIEW_REQUIRED'
            })
        return getReviewRequiredProcessesResponse.data
    }
)

export const getCompletedProcesses = createAsyncThunk(
    '/getCompletedProcesses',
    async (args: ProcessesApiFindProcessesRequest) => {
        const { freetext, offset, limit, ecommerceId } =
            args || defaultValueProcesses
        const getCompletedProcessesResponse = await processesApi.findProcesses({
            freetext,
            offset,
            limit,
            ecommerceId,
            returnStatus: 'COMPLETED'
        })
        return getCompletedProcessesResponse.data
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
            sortby,
            ecommerceId,
            returnStatus
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
            sortby,
            ecommerceId,
            returnStatus
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
            state.getPendingProcesses = {
                ...initialApiState,
                response: state.getPendingProcesses.response
            }
            state.getCompletedProcesses = {
                ...initialApiState,
                response: state.getCompletedProcesses.response
            }
            state.getReviewRequiredProcesses = {
                ...initialApiState,
                response: state.getReviewRequiredProcesses.response
            }
        }
    },
    extraReducers: (builder) => {
        // Get Processes
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

        // Get Pending Processes
        builder.addCase(getPendingProcesses.pending, (state) => {
            state.getPendingProcesses.loading = 'pending'
        })
        builder.addCase(getPendingProcesses.fulfilled, (state, action) => {
            state.getPendingProcesses.loading = 'succeeded'
            state.getPendingProcesses.response = action.payload
        })
        builder.addCase(getPendingProcesses.rejected, (state, action) => {
            state.getPendingProcesses.loading = 'failed'
            state.getPendingProcesses.error = action.error
        })

        // Get Completed Processes
        builder.addCase(getCompletedProcesses.pending, (state) => {
            state.getCompletedProcesses.loading = 'pending'
        })
        builder.addCase(getCompletedProcesses.fulfilled, (state, action) => {
            state.getCompletedProcesses.loading = 'succeeded'
            state.getCompletedProcesses.response = action.payload
        })
        builder.addCase(getCompletedProcesses.rejected, (state, action) => {
            state.getCompletedProcesses.loading = 'failed'
            state.getCompletedProcesses.error = action.error
        })

        // Get Action Required Processes
        builder.addCase(getReviewRequiredProcesses.pending, (state) => {
            state.getReviewRequiredProcesses.loading = 'pending'
        })
        builder.addCase(
            getReviewRequiredProcesses.fulfilled,
            (state, action) => {
                state.getReviewRequiredProcesses.loading = 'succeeded'
                state.getReviewRequiredProcesses.response = action.payload
            }
        )
        builder.addCase(
            getReviewRequiredProcesses.rejected,
            (state, action) => {
                state.getReviewRequiredProcesses.loading = 'failed'
                state.getReviewRequiredProcesses.error = action.error
            }
        )
    }
})

export const { resetProcessesApiCalls } = processesSlice.actions
export default processesSlice.reducer
