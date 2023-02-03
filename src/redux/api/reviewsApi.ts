import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from './apiConfiguration'
import {
    CreateLineItemReviewsInput,
    ReviewsApi,
    ReviewsApiCreateLineItemReviewsRequest
} from '@itsrever/dashboard-api'

const reviewsApi = new ReviewsApi(undefined, undefined, axiosInstance)

interface CreateReviewCall extends ApiCallBase {
    response: any
}

interface State {
    createReview: CreateReviewCall
}

const initialState: State = {
    createReview: initialApiState
}

export const createReview = createAsyncThunk(
    '/createReview',
    async (args: ReviewsApiCreateLineItemReviewsRequest) => {
        const { createLineItemReviewsInput } = args || {}
        const createReviewResponse = await reviewsApi.createLineItemReviews({
            createLineItemReviewsInput
        })
        return createReviewResponse
    }
)

const reviewsApiSlice = createSlice({
    name: 'reviewsApi',
    initialState,
    reducers: {
        resetReviewsApiCalls: (state) => {
            state.createReview = {
                ...initialApiState,
                response: state.createReview.response
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createReview.pending, (state) => {
            state.createReview.loading = 'pending'
        })
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.createReview.loading = 'succeeded'
            state.createReview.response = action.payload
        })
        builder.addCase(createReview.rejected, (state, action) => {
            state.createReview.loading = 'failed'
            state.createReview.error = action.error
        })
    }
})

export const { resetReviewsApiCalls } = reviewsApiSlice.actions
export default reviewsApiSlice.reducer
