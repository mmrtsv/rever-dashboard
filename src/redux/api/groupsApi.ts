import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GroupsAllGroupsResponse, GroupApi } from '@itsrever/dashboard-api'
import { axiosInstance } from './apiConfiguration'

const groupApi = new GroupApi(undefined, undefined, axiosInstance)

interface GetGroupCommercesCall extends ApiCallBase {
    response: GroupsAllGroupsResponse
}

interface State {
    getGroupCommerces: GetGroupCommercesCall
}

const initialState: State = {
    getGroupCommerces: initialApiState
}

export const getGroupCommmerces = createAsyncThunk(
    '/getGroupCommerces',
    async () => {
        const getGroupCommercesResponse = await groupApi.allGroups()
        return getGroupCommercesResponse.data
    }
)

const groupApiSlice = createSlice({
    name: 'groupApi',
    initialState,
    reducers: {
        resetGroupsApiCalls: (state) => {
            state.getGroupCommerces = {
                ...initialApiState,
                response: state.getGroupCommerces.response
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getGroupCommmerces.pending, (state) => {
            state.getGroupCommerces.loading = 'pending'
        })
        builder.addCase(getGroupCommmerces.fulfilled, (state, action) => {
            state.getGroupCommerces.loading = 'succeeded'
            state.getGroupCommerces.response = action.payload
        })
        builder.addCase(getGroupCommmerces.rejected, (state, action) => {
            state.getGroupCommerces.loading = 'failed'
            state.getGroupCommerces.error = action.error
        })
    }
})

export const { resetGroupsApiCalls } = groupApiSlice.actions
export default groupApiSlice.reducer
