import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    FindPaginatedLineItemsResults,
    ProcessesApi,
    ProcessesApiFindLineItemsRequest
} from '@itsrever/dashboard-api'
import { axiosInstance } from './apiConfiguration'

const lineItemsApi = new ProcessesApi(undefined, undefined, axiosInstance)

interface GetLineItemsCall extends ApiCallBase {
    response: FindPaginatedLineItemsResults
}

interface State {
    getLineItem: GetLineItemsCall
    getLineItems: GetLineItemsCall
    getPendingLineItems: GetLineItemsCall
    getReviewRequiredLineItems: GetLineItemsCall
    getCompletedLineItems: GetLineItemsCall
}

const initialState: State = {
    getLineItem: initialApiState,
    getLineItems: initialApiState,
    getPendingLineItems: initialApiState,
    getReviewRequiredLineItems: initialApiState,
    getCompletedLineItems: initialApiState
}

const defaultValueLineItems: ProcessesApiFindLineItemsRequest = {
    ecommerceId: undefined,
    freetext: undefined,
    fullyRefunded: undefined,
    lastKnownShippingStatus: undefined,
    limit: undefined,
    offset: undefined,
    orderId: undefined,
    platform: undefined,
    processId: undefined,
    status: undefined,
    lineItemsId: undefined,
    returnStatus: undefined
}

export const getLineItem = createAsyncThunk(
    '/getLineItem',
    async (args?: ProcessesApiFindLineItemsRequest) => {
        const { lineItemsId } = args || defaultValueLineItems
        const getLineItemResponse = await lineItemsApi.findLineItems({
            lineItemsId
        })
        return getLineItemResponse.data
    }
)

export const getPendingLineItems = createAsyncThunk(
    '/getPendingLineItems',
    async (args?: ProcessesApiFindLineItemsRequest) => {
        const { limit, offset, freetext, ecommerceId } =
            args || defaultValueLineItems
        const getLineItemsResponse = await lineItemsApi.findLineItems({
            freetext,
            limit,
            offset,
            ecommerceId,
            returnStatus: 'STARTED,COLLECTED'
        })
        return getLineItemsResponse.data
    }
)

export const getReviewRequiredLineItems = createAsyncThunk(
    '/getReviewRequiredLineItems',
    async (args?: ProcessesApiFindLineItemsRequest) => {
        const { limit, offset, freetext, ecommerceId } =
            args || defaultValueLineItems
        const getLineItemsResponse = await lineItemsApi.findLineItems({
            freetext,
            limit,
            offset,
            ecommerceId,
            returnStatus: 'REVIEW_REQUIRED'
        })
        return getLineItemsResponse.data
    }
)

export const getCompletedLineItems = createAsyncThunk(
    '/getCompletedLineItems',
    async (args?: ProcessesApiFindLineItemsRequest) => {
        const { limit, offset, freetext, ecommerceId } =
            args || defaultValueLineItems
        const getLineItemsResponse = await lineItemsApi.findLineItems({
            freetext,
            limit,
            offset,
            ecommerceId,
            returnStatus: 'COMPLETED'
        })
        return getLineItemsResponse.data
    }
)

export const getLineItems = createAsyncThunk(
    '/getLineItems',
    async (args?: ProcessesApiFindLineItemsRequest) => {
        const {
            ecommerceId,
            freetext,
            fullyRefunded,
            lastKnownShippingStatus,
            limit,
            offset,
            orderId,
            platform,
            processId,
            status,
            returnStatus
        } = args || defaultValueLineItems
        const getLineItemsResponse = await lineItemsApi.findLineItems({
            ecommerceId,
            freetext,
            fullyRefunded,
            lastKnownShippingStatus,
            limit,
            offset,
            orderId,
            platform,
            processId,
            status,
            returnStatus
        })
        return getLineItemsResponse.data
    }
)

const lineItemsSlice = createSlice({
    name: 'lineItemsApi',
    initialState,
    reducers: {
        resetLineItemsApiCalls: (state) => {
            state.getLineItem = {
                ...initialApiState,
                response: state.getLineItem.response
            }
            state.getLineItems = {
                ...initialApiState,
                response: state.getLineItems.response
            }
            state.getPendingLineItems = {
                ...initialApiState,
                response: state.getPendingLineItems.response
            }
            state.getCompletedLineItems = {
                ...initialApiState,
                response: state.getCompletedLineItems.response
            }
        }
    },
    extraReducers: (builder) => {
        // Line Item
        builder.addCase(getLineItem.pending, (state) => {
            state.getLineItem.loading = 'pending'
        })
        builder.addCase(getLineItem.fulfilled, (state, action) => {
            state.getLineItem.loading = 'succeeded'
            state.getLineItem.response = action.payload
        })
        builder.addCase(getLineItem.rejected, (state, action) => {
            state.getLineItem.loading = 'failed'
            state.getLineItem.error = action.error
        })

        // Pending Line Items
        builder.addCase(getPendingLineItems.pending, (state) => {
            state.getPendingLineItems.loading = 'pending'
        })
        builder.addCase(getPendingLineItems.fulfilled, (state, action) => {
            state.getPendingLineItems.loading = 'succeeded'
            state.getPendingLineItems.response = action.payload
        })
        builder.addCase(getPendingLineItems.rejected, (state, action) => {
            state.getPendingLineItems.loading = 'failed'
            state.getPendingLineItems.error = action.error
        })

        // Review Required Line Items
        builder.addCase(getReviewRequiredLineItems.pending, (state) => {
            state.getReviewRequiredLineItems.loading = 'pending'
        })
        builder.addCase(
            getReviewRequiredLineItems.fulfilled,
            (state, action) => {
                state.getReviewRequiredLineItems.loading = 'succeeded'
                state.getReviewRequiredLineItems.response = action.payload
            }
        )
        builder.addCase(
            getReviewRequiredLineItems.rejected,
            (state, action) => {
                state.getReviewRequiredLineItems.loading = 'failed'
                state.getReviewRequiredLineItems.error = action.error
            }
        )

        // Completed Line Items
        builder.addCase(getCompletedLineItems.pending, (state) => {
            state.getCompletedLineItems.loading = 'pending'
        })
        builder.addCase(getCompletedLineItems.fulfilled, (state, action) => {
            state.getCompletedLineItems.loading = 'succeeded'
            state.getCompletedLineItems.response = action.payload
        })
        builder.addCase(getCompletedLineItems.rejected, (state, action) => {
            state.getCompletedLineItems.loading = 'failed'
            state.getCompletedLineItems.error = action.error
        })

        // Line Items
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

export const { resetLineItemsApiCalls } = lineItemsSlice.actions
export default lineItemsSlice.reducer
