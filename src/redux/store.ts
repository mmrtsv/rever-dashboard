import { configureStore } from '@reduxjs/toolkit'
import processesApiReducer from './api/processesApi'
import appStateReducer from './features/appState/appStateSlice'
import lineItemsApiReducer from './api/lineItemsApi'
import tokenDataSlice from './features/generalData/tokenDataSlice'
import generalDataReducer from './features/generalData/generalDataSlice'
import userApiReducer from './api/userApi'

export const store = configureStore({
    reducer: {
        tokenData: tokenDataSlice,
        processesApi: processesApiReducer,
        lineItemsApi: lineItemsApiReducer,
        appState: appStateReducer,
        generalData: generalDataReducer,
        userApi: userApiReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
