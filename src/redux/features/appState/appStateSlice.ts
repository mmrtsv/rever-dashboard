import { createSlice } from '@reduxjs/toolkit'

interface State {
    isSidebarOpen: boolean
}

const initialState: State = {
    isSidebarOpen: window.innerWidth >= 900
}

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isSidebarOpen = !state.isSidebarOpen
        }
    }
})

export const { toggleSidebar } = appStateSlice.actions
export default appStateSlice.reducer
