import { configureStore } from '@reduxjs/toolkit'
import processesApiReducer from './api/processesApi'
import appStateReducer from './features/appState/appStateSlice'
import lineItemsApiReducer from './api/lineItemsApi'
import tokenDataSlice from './features/generalData/tokenDataSlice'
import generalDataReducer from './features/generalData/generalDataSlice'
import userApiReducer from './api/userApi'
import reportsApi from './api/reportsApi'
import reviewsApi from './api/reviewsApi'

export const store = configureStore({
    reducer: {
        tokenData: tokenDataSlice,
        processesApi: processesApiReducer,
        lineItemsApi: lineItemsApiReducer,
        appState: appStateReducer,
        generalData: generalDataReducer,
        userApi: userApiReducer,
        reportsApi: reportsApi,
        reviewsApi: reviewsApi
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
