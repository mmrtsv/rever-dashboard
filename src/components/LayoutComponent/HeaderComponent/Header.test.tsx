import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18nForTests'

import Header from './Header'
import drawerList1 from './Header'
import drawerList2 from './Header'

describe('Header Component', () => {
    const mockStore = configureStore()
    let store

    afterEach(cleanup)

    it('should render the components: DrawerLogo - ReverLogo - LanguageSwitcher - UserMenu', () => {
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
                isSidebarOpen: false
            }
        }
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Header />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        expect(screen.getByTestId('DrawerOutLogo')).toBeDefined()
        expect(screen.getByTestId('ReverLogo')).toBeDefined()
        expect(screen.getByTestId('LanguageSwitcher')).toBeDefined()
        expect(screen.getByTestId('UserMenu')).toBeDefined()
    })

    it('should have the correct pages', () => {
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
                isSidebarOpen: false
            }
        }
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Header />
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        Object.values(drawerList1).forEach((entry) => {
            expect(screen.getByText(entry)).toBeDefined()
        })
        Object.values(drawerList2).forEach((entry) => {
            expect(screen.getByText(entry)).toBeDefined()
        })
    })

    it('should no longer display DrawerLogo when open', () => {
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
            }
        }
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Header />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        expect(screen.queryByTestId('DrawerOutLogo')).toBeNull()
    })
})
