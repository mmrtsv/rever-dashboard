import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@itsrever/design-system'
import thunk from 'redux-thunk'
import i18n from '../i18nForTests'
import { I18nextProvider } from 'react-i18next'
import ProcessDetails from '@/pages/ProcessDetails.page'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

describe('Process Details Page testing', () => {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    afterEach(cleanup)

    it('should render the correct elements - TopBar, tabs, products', () => {
        const state = reduxState()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <ProcessDetails />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        //Top Bar
        screen.getByTestId('LocalShippingOutlinedIcon')
        screen.getByText('ABC123')

        // Tabs
        screen.getByText('Products')
        screen.getByText('Details')
        screen.getByText('Summary')

        // Products
        screen.getByText('Line Item 1')
    })

    it('should render the start review button if process.reviewavailable', () => {
        const state = reduxState(true)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <ProcessDetails />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // Button
        screen.getByTestId('EditIcon')
        screen.getByText('Review')
    })
})

function reduxState(reviewAvail?: boolean) {
    return {
        reviewsApi: {
            createReview: {
                loading: 'idle'
            }
        },
        processesApi: {
            getProcess: {
                loading: 'idle',
                response: {
                    processes: [mockProcess(reviewAvail)]
                }
            }
        },
        userApi: {
            getMe: {
                response: {},
                Loading: 'idle'
            }
        },
        generalData: {
            drawerOpen: false
        }
    }
}

function mockProcess(reviewAvail?: boolean): ModelsPublicReturnProcess {
    return {
        customer_printed_order_id: 'ABC123',
        review_available: reviewAvail ? reviewAvail : false,
        return_status: 'COMPLETED',
        line_items: [
            {
                name: 'Line Item 1',
                product_return_reason: 'NOT_AS_EXPECTED',
                quantity: 1,
                type: 'product',
                reviews: []
            },
            {
                type: 'cost',
                name: 'Shipping cost',
                total: 500
            }
        ]
    }
}
