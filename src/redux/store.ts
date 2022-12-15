import { configureStore } from '@reduxjs/toolkit'
import authApiReducer from './api/authApi'
import processesApiReducer from './api/processesApi'
import userDataReducer from './features/userData/userDataSlice'
import appStateReducer from './features/appState/appStateSlice'
import lineItemsApiReducer from './api/lineItemsApi'

export const store = configureStore({
    reducer: {
        authApi: authApiReducer,
        processesApi: processesApiReducer,
        lineItemsApi: lineItemsApiReducer,
        userData: userDataReducer,
        appState: appStateReducer
    },
    // devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
