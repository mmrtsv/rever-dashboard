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
