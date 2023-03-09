import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import TopBar from './TopBarLI'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ThemeProvider } from '@itsrever/design-system'

describe('TopBar LI tests', () => {
    afterEach(cleanup)

    it('should render the title, the tabs', () => {
        const state = reduxState([])
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <ThemeProvider>
                    <Provider store={store}>
                        <I18nextProvider i18n={i18n}>
                            <TopBar currentTab={0} setCurrentTab={() => null} />
                        </I18nextProvider>
                    </Provider>
                </ThemeProvider>
            </Router>
        )

        screen.getByText('Returned items')
        screen.getByText('All')
        screen.getByText('Pending to receive')
        screen.getByText('Received')
    })

    it('should render the amount of items on each tab', () => {
        const state = reduxState([])
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <ThemeProvider>
                    <Provider store={store}>
                        <I18nextProvider i18n={i18n}>
                            <TopBar currentTab={0} setCurrentTab={() => null} />
                        </I18nextProvider>
                    </Provider>
                </ThemeProvider>
            </Router>
        )

        screen.getByText('(100)')
        screen.getByText('(45)')
        screen.getByText('(55)')
    })

    it('should run the function setCurrentTab when a tab is clicked', () => {
        const state = reduxState([])
        const mockStore = configureStore()
        const store = mockStore(state)

        const spyOnChangeTab = vi.fn()

        render(
            <Router>
                <ThemeProvider>
                    <Provider store={store}>
                        <I18nextProvider i18n={i18n}>
                            <TopBar
                                currentTab={0}
                                setCurrentTab={spyOnChangeTab}
                            />
                        </I18nextProvider>
                    </Provider>
                </ThemeProvider>
            </Router>
        )
        fireEvent.click(screen.getByText('Pending to receive'))

        expect(spyOnChangeTab).toHaveBeenCalled()
    })
})

function reduxState(ecommerces: string[]) {
    return {
        userApi: {
            getMe: {
                response: {
                    user: {
                        ecommerces: ecommerces
                    }
                },
                loading: 'idle'
            }
        },
        lineItemsApi: {
            getCompletedLineItems: {
                loading: 'idle',
                response: { rowcount: 55 }
            },
            getPendingLineItems: {
                loading: 'idle',
                response: { rowcount: 45 }
            },
            getLineItems: {
                loading: '',
                response: { rowcount: 100 }
            }
        },
        generalData: {
            selectedECommerce: undefined
        }
    }
}
