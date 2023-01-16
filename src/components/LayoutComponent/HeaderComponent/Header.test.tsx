import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import Header from './Header'

describe('Header Component', () => {
    afterEach(cleanup)

    it('should render the components: BurgerMenu - ReverLogo - LanguageSwitcher - UserMenu', () => {
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
        screen.getByTestId('BurgerMenuOutsideIcon')
        screen.getByAltText('logo')
        screen.getByTestId('LanguageSwitcher')
        screen.getByTestId('UserMenu')
    })

    it('should not display the Buger Menu when the drawer is open', () => {
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
        expect(screen.queryByTestId('BurgerMenuOutsideIcon')).toBeNull()
        screen.getByAltText('logo')
        screen.getByTestId('LanguageSwitcher')
        screen.getByTestId('UserMenu')
    })

    it('should dispatch when clicking the Burger Menu', () => {
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
        fireEvent.click(screen.getByTestId('BurgerMenuOutsideIcon'))
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
