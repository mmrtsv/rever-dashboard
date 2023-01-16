import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import LineItemsByStatus from '../../pages/LineItemsByStatus.page'

import { ThemeProvider } from '@itsrever/design-system'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18nForTests'

describe('Line Items By Status Page tests', () => {
    const loggedInState = {
        authApi: {
            login: { loading: 'idle', response: {} }
        },
        userData: {
            user: {
                name: 'admin@partner.com',
                avatar: 'https://cdn-icons-png.flaticon.com/512/187/187134.png',
                role: 'admin',
                group: 'REVER'
            }
        },
        appState: {
            isSidebarOpen: true
        },
        lineItemsApi: {
            getCompletedLineItems: {
                loading: 'idle',
                response: {
                    next: '',
                    rowcount: 17,
                    line_items: []
                }
            },
            getPendingLineItems: {
                loading: 'idle',
                response: {
                    next: '',
                    rowcount: 342,
                    line_items: []
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
            group: 'nudeproject',
            ecommerceList: ['nudeproject']
        }
    }

    afterEach(cleanup)
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    let store

    it('should display a search field', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemsByStatus />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByLabelText('Search')
    })

    it('should display 2 columns with titles and amount of line items', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemsByStatus />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByText('Pending to Receive', { exact: false })
        screen.getByText('Completed', { exact: false })
        screen.getByText('342', { exact: false })
        screen.getByText('17', { exact: false })
    })

    it('should render the divs that contains lineItem Cards', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemsByStatus />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('PendingLineItems')
        screen.getByTestId('CompletedLineItems')
    })
})
