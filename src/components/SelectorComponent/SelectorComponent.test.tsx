import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18nForTests'
import SelectorComponent from './SelectorComponent'

describe('SelectorComponentTest', () => {
    afterEach(cleanup)
    it('should not render if there is a single ecommerce in the group', () => {
        // Given
        const state = loggedInStateWithEcommerces([])
        const mockStore = configureStore()
        // Given
        const store = mockStore(state)

        // When
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <SelectorComponent></SelectorComponent>
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        // Then
        const children = screen.queryByTestId('filter')
        expect(children).toBeNull()
    })
    it('should not render if there is one ecommerce in the group list', () => {
        // Given
        const state = loggedInStateWithEcommerces(['nude'])
        const mockStore = configureStore()
        // Given
        const store = mockStore(state)

        // When
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <SelectorComponent></SelectorComponent>
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        // Then
        const children = screen.queryByTestId('filter')
        expect(children).toBeNull()
    })
    it('should render the selector if there is more than one ecommerce', () => {
        // Given
        const state = loggedInStateWithEcommerces(['nude', 'artesta'])
        const mockStore = configureStore()
        // Given
        const store = mockStore(state)

        // When
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <SelectorComponent></SelectorComponent>
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        // Then
        screen.getByTestId('filter')
    })
    it('should render the ecommerces list and the all option', () => {
        const state = loggedInStateWithEcommerces(['nude', 'artesta'])
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <SelectorComponent />
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        const filter = screen.getByRole('button')
        fireEvent.mouseDown(filter)
        screen.getByText('All')
        screen.getByText('nude')
        screen.getByText('artesta')
    })
    it('should dispatch when an option is clicked', () => {
        const state = loggedInStateWithEcommerces(['nude', 'artesta'])
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <SelectorComponent />
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        const filter = screen.getByRole('button')
        fireEvent.mouseDown(filter)
        fireEvent.click(screen.getByText('nude'))
        const actions = store.getActions()
        expect(actions[0].payload).toBe('nude')
    })
})

function loggedInStateWithEcommerces(ecommerces: string[]) {
    return {
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
        groupsApi: {
            getGroupCommerces: {
                response: {
                    group: 'Jeanifacio',
                    ecommerces: ecommerces
                },
                loading: 'idle'
            }
        },
        generalData: {
            selectedECommerce: undefined
        }
    }
}