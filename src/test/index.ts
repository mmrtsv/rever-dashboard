import {
    ModelsMoneyFormat,
    ModelsPublicReturnProcess,
    ModelsReturnLineItem,
    OpsapiModelsLineItemReview
} from '@itsrever/dashboard-api'
import { RefundActions, ReturnStatus, ReviewStatus } from '@/utils'

export const mockReduxStore = () => {
    return {
        generalData: {},
        processesApi: {
            getProcesses: {},
            getPendingProcesses: {},
            getReviewRequiredProcesses: {},
            getCompletedProcesses: {}
        },
        lineItemsApi: {
            getLineItems: {},
            getPendingLineItems: {},
            getReviewRequiredLineItems: {},
            getCompletedLineItems: {}
        },
        userApi: {
            getMe: {},
            token: ''
        },
        reportsApi: {
            getReport: {},
            getReturnTypesByDay: {},
            getReturnsMetrics: {},
            getReturnsByCountry: {},
            getTransitAnalytics: {}
        },
        reviewsApi: {
            createReview: {}
        },
        locationsApi: {
            getCountries: {}
        }
    }
}

export const mockMoneyFormat = () => {
    const mf: ModelsMoneyFormat = {
        amount_multiplied_by: 100,
        currency: 'EUR',
        currency_symbol: '€',
        decimal_separator: ',',
        display_prices_with_taxes: true,
        is_currency_left_position: false,
        thousand_separator: '.',
        visible_number_of_decimals: 2
    }
    return mf
}

export const mockProcess = () => {
    const process: ModelsPublicReturnProcess = {
        customer_printed_order_id: 'ABC123',
        return_status: ReturnStatus.Started,
        currency_money_format: mockMoneyFormat(),
        line_items: mockLineItems()
    }
    return process
}

export const mockLineItems = () => {
    const lItems: ModelsReturnLineItem[] = [
        {
            action: RefundActions.ToReturn,
            name: 'Line Item 1',
            product_image_url:
                'https://cdn.shopify.com/s/files/1/0007/5192/7347/products/013603_bf_7ca0bb3e-99aa-4bea-89e5-ce07916c5dfb.jpg?v=1579616399',
            product_return_reason: 'NOT_AS_EXPECTED',
            quantity: 1,
            total: 1000,
            type: 'product',
            variant_name: 'Variant 1',
            reviews: []
        },
        {
            action: RefundActions.ToReturn,
            name: 'Line Item 2',
            product_image_url:
                'https://cdn.shopify.com/s/files/1/0007/5192/7347/products/013603_bf_7ca0bb3e-99aa-4bea-89e5-ce07916c5dfb.jpg?v=1579616399',
            product_return_reason: 'NOT_AS_EXPECTED',
            quantity: 1,
            total: 500,
            type: 'product',
            reviews: []
        },
        {
            type: 'cost',
            name: 'Shipping cost',
            total: 700
        }
    ]
    return lItems
}

export const mockExchangedLineItems = () => {
    const exchangedLineItems: ModelsReturnLineItem[] = [
        {
            name: 'Line Item 1',
            pending_purchase: true,
            type: 'cost'
        },
        {
            name: 'Line Item 2',
            pending_purchase: true,
            type: 'cost'
        }
    ]
    return exchangedLineItems
}
