import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@itsrever/design-system'
import thunk from 'redux-thunk'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import i18n from '../i18nForTests'
import { I18nextProvider } from 'react-i18next'

import LineItemDetails from '../pages/LineItemDetails.page'

describe('Line Items Details Page', () => {
    const LineItem: ModelsPublicReturnLineItem = {
        name: 'OREGANO HOOD GREEN - M',
        return_process: {
            customer_printed_order_id: 'ES-16658',
            customer: {
                first_name: 'David',
                last_name: 'Overflow',
                email: 'david.overflow@itsrever.com'
            },
            pickup_address: {
                address_line_1: 'Francesc Macia',
                address_line_2: '6to piso',
                city: 'Barcelona',
                postcode: '08017',
                country: 'Spain'
            }
        },
        product: {
            images: undefined
        }
    }

    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    afterEach(cleanup)

    it('should render the left column elements correctly', () => {
        const state = reduxState(LineItem)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemDetails />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByAltText('ProductImage')
        screen.getByRole('heading')
        screen.getByTestId('CustomerName')
        screen.getByTestId('Email')
        screen.getByText('Address')
        screen.getByTestId('ReturnDate')
        screen.getAllByText('Pending')
    })

    it('should the right elements correctly', () => {
        const state = reduxState(LineItem)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemDetails />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('ProductName')
        screen.getByText('Pending to receive')
        screen.getByText('Completed')
        screen.getByText('Amount')
        screen.getByText('Type of return')
        screen.getByText('Type of refund')
        screen.getByText('Reason')
        screen.getByText('Tracking information')
        screen.getByText('Why was it denied')
    })
})

function reduxState(retLineItem: ModelsPublicReturnLineItem) {
    return {
        appState: {
            isSidebarOpen: false
        },
        tokenData: {
            token: 'xxxx'
        },
        lineItemsApi: {
            getLineItem: {
                loading: 'idle',
                response: { rowcount: 1, line_items: [retLineItem] }
            }
        },
        userApi: {
            getMe: {
                response: {},
                Loading: 'idle'
            }
        },
        generalData: {
            group: 'nudeproject',
            ecommerceList: ['nudeproject']
        }
    }
}
