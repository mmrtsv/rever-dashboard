import { configureStore } from '@reduxjs/toolkit'
import processesApiReducer from './api/processesApi'
import lineItemsApiReducer from './api/lineItemsApi'
import generalDataReducer from './features/generalData/generalDataSlice'
import userApiReducer from './api/userApi'
import reportsApi from './api/reportsApi'
import reviewsApi from './api/reviewsApi'

export const store = configureStore({
    reducer: {
        processesApi: processesApiReducer,
        lineItemsApi: lineItemsApiReducer,
        generalData: generalDataReducer,
        userApi: userApiReducer,
        reportsApi: reportsApi,
        reviewsApi: reviewsApi
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
