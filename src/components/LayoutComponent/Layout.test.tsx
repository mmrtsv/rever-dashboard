import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Layout from './Layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'

describe('Layout Component', () => {
    afterEach(cleanup)

    it('should render the header and the loading component when there are calls to the api', () => {
        const state = reduxStateWithLoading('pending')
        const middlewares = [thunk]
        const mockStore = configureStore(middlewares)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <Layout />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('Header')
        screen.getByTestId('modal')
        screen.getByTestId('spinner')
    })

    it('should render the header but not the modal when no calls to the api are pending', () => {
        const state = reduxStateWithLoading('idle')
        const middlewares = [thunk]
        const mockStore = configureStore(middlewares)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <Layout />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('Header')
        expect(screen.queryByTestId('modal')).toBeNull()
        expect(screen.queryByTestId('spinner')).toBeNull()
    })
})

function reduxStateWithLoading(loading: string) {
    return {
        appState: {
            isSidebarOpen: false
        },
        userApi: {
            getMe: {
                response: {},
                loading: 'idle'
            }
        },
        tokenData: {
            token: 'XXX'
        },
        processesApi: {
            getProcess: {
                response: {},
                loading: loading
            },
            getProcesses: {
                response: {},
                loading: loading
            }
        },
        lineItemsApi: {
            getCompletedLineItems: {
                loading: 'idle',
                response: {}
            },
            getPendingLineItems: {
                loading: 'idle',
                response: {}
            },
            getLineItems: {
                loading: '',
                response: {}
            },
            getLineItem: {
                loading: '',
                response: {}
            }
        }
    }
}
