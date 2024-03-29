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
        const state = reduxStateWithEcommerces([])
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
        expect(screen.queryByTestId('Selector')).toBeNull()
    })

    it('should not render if there is one ecommerce in the group list', () => {
        const state = reduxStateWithEcommerces(['nude'])
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
        expect(screen.queryByTestId('Selector')).toBeNull()
    })

    it('should render the selector if there is more than one ecommerce', () => {
        const state = reduxStateWithEcommerces(['nude', 'artesta'])
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
        screen.getByTestId('Selector')
    })

    it('should render the ecommerces list and the all option', () => {
        const state = reduxStateWithEcommerces(['nude', 'artesta'])
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
        const filter = screen.getByText('Filter store')
        fireEvent.click(filter)
        screen.getByText('All')
        screen.getByText('nude')
        screen.getByText('artesta')
    })

    it('should dispatch when an option is clicked', () => {
        const state = reduxStateWithEcommerces(['nude', 'artesta'])
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
        fireEvent.click(filter)
        fireEvent.click(screen.getByText('nude'))
        const actions = store.getActions()
        expect(actions[0].payload).toBe('nude')
    })
})

function reduxStateWithEcommerces(ecommerces: string[]) {
    return {
        userApi: {
            getMe: {
                response: {
                    id: '1',
                    user: {
                        name: 'amigo.jeje@itsrever.com',
                        role: '',
                        group: 'artesta',
                        ecommerces: ecommerces
                    }
                },
                loading: 'idle'
            }
        },
        generalData: {
            selectedECommerce: undefined
        }
    }
}
