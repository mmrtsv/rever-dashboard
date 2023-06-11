export const LineItemTypes = {
    Product: 'product',
    Cost: 'cost'
}

export enum RefundActions {
    NoAction,
    ToExchange,
    ToReturn
}

export enum WorkflowStatus {
    Running,
    Failed,
    Completed,
    OnHold
}

export const ReturnStatus = {
    Started: 'STARTED',
    Collected: 'COLLECTED',
    ReviewRequired: 'REVIEW_REQUIRED',
    Completed: 'COMPLETED'
}

export const ReviewStatus = {
    Approved: 'APPROVED',
    Declined: 'DECLINED',
    Missing: 'MISSING'
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
