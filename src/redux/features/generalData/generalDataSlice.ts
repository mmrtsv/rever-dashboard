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
    group?: string
    ecommerceList?: string[]
}

const initialState: State = {
    selectedEcommerce: undefined,
    group: undefined,
    ecommerceList: []
}

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState,
    reducers: {
        setSelectedEcommerce(state, action) {
            state.selectedEcommerce = action.payload
        },
        setGroup(state, action) {
            state.group = action.payload
        },
        setEcommerceList(state, action) {
            state.ecommerceList = action.payload
        }
    }
})

export const { setSelectedEcommerce, setEcommerceList, setGroup } =
    generalDataSlice.actions
export default generalDataSlice.reducer
