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

import LineItemsPage from '../../pages/LineItems.page'

describe('Line Items Page', () => {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    const state = reduxState()
    afterEach(cleanup)

    it('should render the correct elements - TopBar , search, line items table and pagination', () => {
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemsPage />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('TopBar')
        screen.getByTestId('SearchIcon')
        screen.getAllByText('Search...')
        screen.getByTestId('LineItemsTable')
        screen.getByText('2 total pages')
        screen.getByText('10 / page')
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
        lineItemsApi: {
            getLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            },
            getPendingLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            },
            getCompletedLineItems: {
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
