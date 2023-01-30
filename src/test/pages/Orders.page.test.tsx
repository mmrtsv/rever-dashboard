import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@itsrever/design-system'
import thunk from 'redux-thunk'
import i18n from '../../i18nForTests'
import { I18nextProvider } from 'react-i18next'

import Orders from '../../pages/Orders.page'

describe('Order Page test', () => {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    const state = reduxState()
    afterEach(cleanup)

    it('should render the correct elements - Filter , selector, orders table and pagination', () => {
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <Orders />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getAllByText('Search...')
        screen.getByTestId('filter')
        screen.getAllByText('Pending to review')
        screen.getAllByText('Reviewed')
        screen.getAllByTestId('OrdersTable')
        screen.getAllByText('1 total pages')
        screen.getByText('25 / page')
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
            getProcesses: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            }
        },
        userApi: {
            getMe: {
                response: {
                    user: {
                        ecommerces: ['nude', 'artesta']
                    }
                },
                Loading: 'idle'
            }
        },
        generalData: {
            selectedEcommerce: 'nude'
        }
    }
}
