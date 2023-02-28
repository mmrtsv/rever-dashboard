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
    getProcess: GetProcessesCall
    getProcesses: GetProcessesCall
    getPendingProcesses: GetProcessesCall
    getCompletedProcesses: GetProcessesCall
    getActionRequiredProcesses: GetProcessesCall
}

const initialState: State = {
    getProcess: initialApiState,
    getProcesses: initialApiState,
    getPendingProcesses: initialApiState,
    getCompletedProcesses: initialApiState,
    getActionRequiredProcesses: initialApiState
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

export const getProcess = createAsyncThunk(
    '/getProcess',
    async (args: ProcessesApiFindProcessesRequest) => {
        const { processId } = args || defaultValueProcesses
        const getProcessResponse = await processesApi.findProcesses({
            processId
        })
        return getProcessResponse.data
    }
)

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
export const getActionRequiredProcesses = createAsyncThunk(
    '/getActionRequiredProcesses',
    async (args: ProcessesApiFindProcessesRequest) => {
        const { freetext, offset, limit, ecommerceId } =
            args || defaultValueProcesses
        const getActionRequiredProcessesResponse =
            await processesApi.findProcesses({
                freetext,
                offset,
                limit,
                ecommerceId,
                returnStatus: 'ACTION_REQUIRED'
            })
        return getActionRequiredProcessesResponse.data
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
            state.getProcess = {
                ...initialApiState,
                response: state.getProcess.response
            }
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
            state.getActionRequiredProcesses = {
                ...initialApiState,
                response: state.getActionRequiredProcesses.response
            }
        }
    },
    extraReducers: (builder) => {
        // Get Process
        builder.addCase(getProcess.pending, (state) => {
            state.getProcess.loading = 'pending'
        })
        builder.addCase(getProcess.fulfilled, (state, action) => {
            state.getProcess.loading = 'succeeded'
            state.getProcess.response = action.payload
        })
        builder.addCase(getProcess.rejected, (state, action) => {
            state.getProcess.loading = 'failed'
            state.getProcess.error = action.error
        })

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
        builder.addCase(getActionRequiredProcesses.pending, (state) => {
            state.getActionRequiredProcesses.loading = 'pending'
        })
        builder.addCase(
            getActionRequiredProcesses.fulfilled,
            (state, action) => {
                state.getActionRequiredProcesses.loading = 'succeeded'
                state.getActionRequiredProcesses.response = action.payload
            }
        )
        builder.addCase(
            getActionRequiredProcesses.rejected,
            (state, action) => {
                state.getActionRequiredProcesses.loading = 'failed'
                state.getActionRequiredProcesses.error = action.error
            }
        )
    }
})

export const { resetProcessesApiCalls } = processesSlice.actions
export default processesSlice.reducer
