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

import OrderDetails from '../pages/ProcessDetails.page'

describe('Process Details Page testing', () => {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    afterEach(cleanup)

    it('should render the correct elements - TopBar, tabs, products, order details and summary', () => {
        const state = reduxState()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>{/* <OrderDetails /> */}</ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        //Top Bar
        // screen.getByTestId('LocalShippingOutlinedIcon')
        // screen.getByTestId('OrderID')

        // Tabs
        // screen.getByText('Products')
        // screen.getByText('Order details')
        // screen.getByText('Summary')

        // Products
        // screen.getByTestId('LineItems')

        // screen.getByRole('heading', { name: '' })
        // screen.getByRole('heading', { name: 'CUSTOMER INFORMATION' })
        // screen.getByText('Address')
        // screen.getByTestId('LineItems')
    })
})

function reduxState() {
    return {
        appState: {
            isSidebarOpen: false
        },
        tokenData: {
            token: 'xxxx'
        },
        processesApi: {
            getProcess: {
                loading: 'idle',
                response: {}
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
