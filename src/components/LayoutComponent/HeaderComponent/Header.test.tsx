import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import Header from './Header'

describe('Header Component test', () => {
    afterEach(cleanup)

    it('should render MenuIcon and LanguageSwitcher when SiderBar closed', () => {
        const state = reduxState(false)
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <Header />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // Two Logos
        expect(screen.getAllByTestId('MenuIcon').length).toBe(2)
        screen.getByTestId('LanguageSwitcher')
    })

    it('should not render the MenuIcon when SideBar is open', () => {
        const state = reduxState(true)
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <Header />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // 1 Logo
        expect(screen.getAllByTestId('MenuIcon').length).toBe(1)
    })

    it('should dispatch when clicking the MenuIcon', () => {
        const state = reduxState(false)
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <Header />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        const Icons = screen.getAllByTestId('MenuIcon')
        fireEvent.click(Icons[0])
        const actions = store.getActions()
        expect(actions.length).toBe(1)
    })
})

function reduxState(open: boolean) {
    return {
        appState: {
            isSidebarOpen: open
        }
    }
}
