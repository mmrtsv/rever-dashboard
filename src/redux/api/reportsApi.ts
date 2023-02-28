import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    ReportsApiFindReportsRequest,
    ReportsApi,
    ReportsReportResponse,
    ReportsApiFindReturnTypesByDayRequest,
    ProcessessapiDbReturnStatsByDay,
    ReportsApiFindReturnsMetricsRequest,
    ReportsMainMetricsResponse,
    ReportsApiFindReturnsByCountryRequest,
    ProcessessapiDbReturnsByCountry
} from '@itsrever/dashboard-api'
import { axiosInstance } from './apiConfiguration'

const reportsApi = new ReportsApi(undefined, undefined, axiosInstance)

interface GetReportCall extends ApiCallBase {
    response: ReportsReportResponse
}
interface GetReturnTypesByDayCall extends ApiCallBase {
    response: ProcessessapiDbReturnStatsByDay[]
}
interface GetReturnsMetricsCall extends ApiCallBase {
    response: ReportsMainMetricsResponse
}
interface GetReturnsByCountryCall extends ApiCallBase {
    response: ProcessessapiDbReturnsByCountry[]
}

interface State {
    getReport: GetReportCall
    getReturnTypesByDay: GetReturnTypesByDayCall
    getReturnsMetrics: GetReturnsMetricsCall
    getReturnsByCountry: GetReturnsByCountryCall
}

const initialState: State = {
    getReport: initialApiState,
    getReturnTypesByDay: initialApiState,
    getReturnsMetrics: initialApiState,
    getReturnsByCountry: initialApiState
}

const defaultValueReports: ReportsApiFindReportsRequest = {
    ecommerceId: '',
    month: undefined,
    year: undefined
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

const defaultValueReturnByCountry: ReportsApiFindReturnsByCountryRequest = {
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

export const getReturnsByCountry = createAsyncThunk(
    '/getReturnsByCountry',
    async (args: ReportsApiFindReturnsByCountryRequest) => {
        const { ecommerceId, from, to } = args || defaultValueReturnByCountry
        const getReturnsByCountry = await reportsApi.findReturnsByCountry({
            ecommerceId,
            from,
            to
        })
        return getReturnsByCountry.data
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
            state.getReturnTypesByDay = {
                ...initialApiState,
                response: state.getReturnTypesByDay.response
            }
            state.getReturnsMetrics = {
                ...initialApiState,
                response: state.getReturnsMetrics.response
            }
            state.getReturnsByCountry = {
                ...initialApiState,
                response: state.getReturnsByCountry.response
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
        // Get Returns By Country
        builder.addCase(getReturnsByCountry.pending, (state) => {
            state.getReturnsByCountry.loading = 'pending'
        })
        builder.addCase(getReturnsByCountry.fulfilled, (state, action) => {
            state.getReturnsByCountry.loading = 'succeeded'
            state.getReturnsByCountry.response = action.payload
        })
        builder.addCase(getReturnsByCountry.rejected, (state, action) => {
            state.getReturnsByCountry.loading = 'failed'
            state.getReturnsByCountry.error = action.error
        })
    }
})

export const { resetReportsApiCalls } = reportSlice.actions
export default reportSlice.reducer
