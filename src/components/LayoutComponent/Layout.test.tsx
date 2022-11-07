import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Layout from './Layout'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Layout Component', () => {
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
        }
    }
    const mockStore = configureStore()
    let store

    afterEach(cleanup)

    it('should render', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <Layout />
                </Provider>
            </Router>
        )
        screen.getByTestId('Header')
    })
})
