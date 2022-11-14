import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import OrderListItem from './OrderListItem'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Order List Item test', () => {
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

    afterEach(cleanup)

    const mockStore = configureStore()
    let store

    it('should render', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <OrderListItem />
                </Provider>
            </Router>
        )
        screen.getByText('OrderListItem')
    })
})
