import { createSlice } from '@reduxjs/toolkit'

export enum RefundActions {
    NoAction,
    ToExchange,
    ToReturn
}

export enum ReturnStatus {
    Running,
    Failed,
    Completed,
    OnHold
}

export enum RefundPaymentMethods {
    NoPaymentMethod,
    BankTransfer,
    Original,
    PromoCode,
    GiftCard
}

export enum RefundTimings {
    NoTiming,
    OnStartReturnProcess,
    OnItemSent,
    OnItemVerified
}

export enum ReturnMethods {
    NoReturnMethod,
    HomePickup,
    CollectionPoint
}

export enum ShippingStatuses {
    NoShippingStatus,
    Created,
    Collected,
    InWarehouse,
    Error,
    Cancelled
}

interface State {
    selectedEcommerce?: string
    limitPagination: number
    drawerOpen: boolean
}

const initialState: State = {
    selectedEcommerce: undefined,
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
