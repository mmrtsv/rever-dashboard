import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import TopBar from './TopBarProcesses'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ThemeProvider } from '@itsrever/design-system'

describe('TopBar Processes tests', () => {
    afterEach(cleanup)

    it('should render the title, the tabs and not the selector when ecommerceList.length < 2', () => {
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

        screen.getByText('Returns')
        screen.getByText('All')
        screen.getByText('In progress')
        screen.getByText('Action required')
        screen.getByText('Completed')
        expect(screen.queryByTestId('Selector')).toBeNull()
    })

    it('should not render the Action required tab when no processes with review required', () => {
        const state = reduxState([], 0)
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

        expect(screen.queryByText('Action required')).toBeNull()
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
        screen.getByText('(35)')
    })

    it('should run the function setCurrentTab and setActualPage when a tab is clicked', () => {
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
        fireEvent.click(screen.getByText('In progress'))

        expect(spyOnChangeTab).toHaveBeenCalled()
    })

    it('should render the selector component when ecommerceList.length > 1', () => {
        const state = reduxState(['nudeproject', 'artesta'])
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
        screen.getByTestId('Selector')
    })
})

function reduxState(ecommerces: string[], amountRequired?: number) {
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
        processesApi: {
            getProcesses: {
                loading: 'idle',
                response: { rowcount: 100 }
            },
            getPendingProcesses: {
                loading: 'idle',
                response: { rowcount: 45 }
            },
            getReviewRequiredProcesses: {
                loading: 'idle',
                response: { rowcount: amountRequired ?? 35 }
            },
            getCompletedProcesses: {
                loading: '',
                response: { rowcount: 55 }
            }
        },
        generalData: {
            selectedECommerce: undefined
        }
    }
}
