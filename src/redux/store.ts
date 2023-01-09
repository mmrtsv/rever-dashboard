import { configureStore } from '@reduxjs/toolkit'
// import authApiReducer from './api/authApi'
import processesApiReducer from './api/processesApi'
import userDataReducer from './features/generalData/userDataSlice'
import appStateReducer from './features/appState/appStateSlice'
import lineItemsApiReducer from './api/lineItemsApi'
import tokenDataSlice from './features/generalData/tokenDataSlice'
import groupsApiReducer from './api/groupsApi'
import generalDataReducer from './features/generalData/generalDataSlice'

export const store = configureStore({
    reducer: {
        // authApi: authApiReducer,
        tokenData: tokenDataSlice,
        processesApi: processesApiReducer,
        lineItemsApi: lineItemsApiReducer,
        groupsApi: groupsApiReducer,
        userData: userDataReducer,
        appState: appStateReducer,
        generalData: generalDataReducer
    },
    // devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
