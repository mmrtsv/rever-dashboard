import { createSlice } from '@reduxjs/toolkit'

interface State {
    selectedEcommerce?: string
    limitPagination: number
    drawerOpen: boolean
}

const initialState: State = {
    selectedEcommerce: localStorage.getItem('selectedEcommerce') ?? undefined,
    limitPagination: 10,
    drawerOpen: window.innerWidth >= 900
}

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState,
    reducers: {
        setSelectedEcommerce(state, action) {
            state.selectedEcommerce = action.payload
        },
        setLimitPagination(state, action) {
            state.limitPagination = action.payload
        },
        toggleDrawer(state) {
            state.drawerOpen = !state.drawerOpen
        }
    }
})

export const { setSelectedEcommerce, toggleDrawer, setLimitPagination } =
    generalDataSlice.actions
export default generalDataSlice.reducer
