import { createSlice } from '@reduxjs/toolkit'

export enum RefundActions {
    NoAction,
    ToExchange,
    ToReturn
}

export enum RefundPaymentMethod {
    NoPaymentMethod,
    BankTransfer,
    Original,
    PromoCode,
    GiftCard
}

export enum ReturnMethod {
    NoReturnMethod,
    HomePickup,
    CollectionPoint
}

export enum ShippingStatus {
    NoShippingStatus,
    Created,
    Collected,
    InWarehouse,
    Error,
    Cancelled
}

interface State {
    selectedEcommerce?: string
}

const initialState: State = {
    selectedEcommerce: undefined
}

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState,
    reducers: {
        setSelectedEcommerce(state, action) {
            state.selectedEcommerce = action.payload
        }
    }
})

export const { setSelectedEcommerce } = generalDataSlice.actions
export default generalDataSlice.reducer
