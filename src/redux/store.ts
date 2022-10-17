import { configureStore } from '@reduxjs/toolkit'
import authApiReducer from './api/authApi'

export const store = configureStore({
    reducer: {
        authApi: authApiReducer
    },
    // devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
