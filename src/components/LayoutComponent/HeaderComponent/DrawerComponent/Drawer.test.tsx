import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import { drawerList1, drawerList2 } from './Drawer'
import DrawerComponent from './Drawer'

// TBD: Test navigation

// OPEN / Close behavior is not tested since it comes from MUI components

describe('Drawer Component tests', () => {
    afterEach(cleanup)

    it('should render the ReverLogo and MenuIcon in the Header', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <DrawerComponent />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByAltText('ReverLogo')
        screen.getByTestId('MenuIcon')
    })

    it('should render correct pages', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <DrawerComponent />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        Object.values(drawerList1).forEach((entry) => screen.getByTestId(entry))

        // Analytics turned off for now
        // Object.values(drawerList2).forEach((entry) => screen.getByTestId(entry))
    })

    it('should dispatch when MenuIcon is clicked', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <DrawerComponent />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        fireEvent.click(screen.getByTestId('MenuIcon'))
        const actions = store.getActions()
        expect(actions.length).toBe(1)
    })

    it('should show AccountIcon, UserName and LogoutIcon at the bottom', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <DrawerComponent />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('AccountCircleIcon')
        screen.getByTestId('UserName')
        screen.getByTestId('LogoutIcon')
    })

    it('should dispatch when LogoutIcon is clicked', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <DrawerComponent />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        fireEvent.click(screen.getByTestId('LogoutIcon'))
        const actions = store.getActions()
        expect(actions.length).toBe(1)
    })
})

function reduxState() {
    return {
        appState: {
            isSideBarOpen: true
        }
    }
}
