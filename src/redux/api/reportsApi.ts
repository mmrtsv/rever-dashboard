import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    ReportsApiFindReportsRequest,
    ReportsApi,
    ReportsReportResponse,
    ReportsApiFindReturnTypesRequest,
    ProcessessapiDbTotalReturnTypes,
    ReportsApiFindReturnTypesByDayRequest,
    ProcessessapiDbReturnStatsByDay,
    ReportsApiFindReturnsMetricsRequest,
    ReportsMainMetricsResponse
} from '@itsrever/dashboard-api'
import { axiosInstance } from './apiConfiguration'

const reportsApi = new ReportsApi(undefined, undefined, axiosInstance)

interface GetReportCall extends ApiCallBase {
    response: ReportsReportResponse
}
interface GetReturnTypesCall extends ApiCallBase {
    response: ProcessessapiDbTotalReturnTypes
}
interface GetReturnTypesByDayCall extends ApiCallBase {
    response: ProcessessapiDbReturnStatsByDay[]
}
interface GetReturnsMetricsCall extends ApiCallBase {
    response: ReportsMainMetricsResponse
}

interface State {
    getReport: GetReportCall
    getReturnTypes: GetReturnTypesCall
    getReturnTypesByDay: GetReturnTypesByDayCall
    getReturnsMetrics: GetReturnsMetricsCall
}

const initialState: State = {
    getReport: initialApiState,
    getReturnTypes: initialApiState,
    getReturnTypesByDay: initialApiState,
    getReturnsMetrics: initialApiState
}

const defaultValueReports: ReportsApiFindReportsRequest = {
    ecommerceId: '',
    month: undefined,
    year: undefined
}

const defaultValueReturnTypes: ReportsApiFindReturnTypesRequest = {
    ecommerceId: '',
    from: undefined,
    to: undefined
}

const defaultValueReturnByDay: ReportsApiFindReturnTypesByDayRequest = {
    ecommerceId: '',
    from: undefined,
    to: undefined
}

const defaultValueReturnMetrics: ReportsApiFindReturnsMetricsRequest = {
    ecommerceId: '',
    from: undefined,
    to: undefined
}

export const getReport = createAsyncThunk(
    '/getReport',
    async (args: ReportsApiFindReportsRequest) => {
        const { ecommerceId, month, year } = args || defaultValueReports
        const getReport = await reportsApi.findReports({
            ecommerceId,
            month,
            year
        })
        return getReport.data
    }
)
export const getReturnMetrics = createAsyncThunk(
    '/getReturnMetrics',
    async (args: ReportsApiFindReturnsMetricsRequest) => {
        const { ecommerceId, from, to } = args || defaultValueReturnMetrics
        const getReturnMetrics = await reportsApi.findReturnsMetrics({
            ecommerceId,
            from,
            to
        })
        return getReturnMetrics.data
    }
)
export const getReturnTypes = createAsyncThunk(
    '/getReturnTypes',
    async (args: ReportsApiFindReturnTypesRequest) => {
        const { ecommerceId, from, to } = args || defaultValueReturnTypes
        const getReturnTypes = await reportsApi.findReturnTypes({
            ecommerceId,
            from,
            to
        })
        return getReturnTypes.data
    }
)

export const getReturnTypesByDay = createAsyncThunk(
    '/getReturnTypesByDay',
    async (args: ReportsApiFindReturnTypesByDayRequest) => {
        const { ecommerceId, from, to } = args || defaultValueReturnByDay
        const getReturnTypesByDay = await reportsApi.findReturnTypesByDay({
            ecommerceId,
            from,
            to
        })
        return getReturnTypesByDay.data
    }
)

const reportSlice = createSlice({
    name: 'reportsApi',
    initialState,
    reducers: {
        resetReportsApiCalls: (state) => {
            state.getReport = {
                ...initialApiState,
                response: state.getReport.response
            }
            state.getReturnTypes = {
                ...initialApiState,
                response: state.getReturnTypes.response
            }
            state.getReturnTypesByDay = {
                ...initialApiState,
                response: state.getReturnTypesByDay.response
            }
            state.getReturnsMetrics = {
                ...initialApiState,
                response: state.getReturnsMetrics.response
            }
        }
    },
    extraReducers: (builder) => {
        // Get Report
        builder.addCase(getReport.pending, (state) => {
            state.getReport.loading = 'pending'
        })
        builder.addCase(getReport.fulfilled, (state, action) => {
            state.getReport.loading = 'succeeded'
            state.getReport.response = action.payload
        })
        builder.addCase(getReport.rejected, (state, action) => {
            state.getReport.loading = 'failed'
            state.getReport.error = action.error
        })
        // Get Return Metrics
        builder.addCase(getReturnMetrics.pending, (state) => {
            state.getReturnsMetrics.loading = 'pending'
        })
        builder.addCase(getReturnMetrics.fulfilled, (state, action) => {
            state.getReturnsMetrics.loading = 'succeeded'
            state.getReturnsMetrics.response = action.payload
        })
        builder.addCase(getReturnMetrics.rejected, (state, action) => {
            state.getReturnsMetrics.loading = 'failed'
            state.getReturnsMetrics.error = action.error
        })
        // Get Return Types
        builder.addCase(getReturnTypes.pending, (state) => {
            state.getReturnTypes.loading = 'pending'
        })
        builder.addCase(getReturnTypes.fulfilled, (state, action) => {
            state.getReturnTypes.loading = 'succeeded'
            state.getReturnTypes.response = action.payload
        })
        builder.addCase(getReturnTypes.rejected, (state, action) => {
            state.getReturnTypes.loading = 'failed'
            state.getReturnTypes.error = action.error
        })
        // Get Return Types By Day
        builder.addCase(getReturnTypesByDay.pending, (state) => {
            state.getReturnTypesByDay.loading = 'pending'
        })
        builder.addCase(getReturnTypesByDay.fulfilled, (state, action) => {
            state.getReturnTypesByDay.loading = 'succeeded'
            state.getReturnTypesByDay.response = action.payload
        })
        builder.addCase(getReturnTypesByDay.rejected, (state, action) => {
            state.getReturnTypesByDay.loading = 'failed'
            state.getReturnTypesByDay.error = action.error
        })
    }
})

export const { resetReportsApiCalls } = reportSlice.actions
export default reportSlice.reducer
