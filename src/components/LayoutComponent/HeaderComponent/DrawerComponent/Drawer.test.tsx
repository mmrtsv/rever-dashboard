import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import { drawerList1, drawerList2 } from './Drawer'
import DrawerComponent from './Drawer'

describe('Drawer Component', () => {
    afterEach(cleanup)

    it('should render the correct pages and the BurgerMenu when side bar is open', () => {
        const state = reduxState(true)
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
        screen.getByTestId('MenuIcon')
        Object.values(drawerList1).forEach((entry) => screen.getByTestId(entry))

        // Analytics turned off for now
        // Object.values(drawerList2).forEach((entry) => screen.getByTestId(entry))
    })

    it('should dispatch when BurgerMenu is clicked', () => {
        const state = reduxState(false)
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
})

function reduxState(open: boolean) {
    return {
        appState: {
            isSideBarOpen: open
        }
    }
}
