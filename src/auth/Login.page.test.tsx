import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'

import LoginPage from './Login.page'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'

// const mockedNavigator = vi.fn()

// vi.mock('react-router-dom', () => ({
//     ...(vi.importActual('react-router-dom') as any),

//     useNavigate: () => mockedNavigator
// }))
describe('Login Page', () => {
    const initialState = { authApi: { login: { loading: 'idle' } } }
    const loggedInState = {
        authApi: {
            login: { loading: 'idle', response: { user: { name: 'Test' } } }
        }
    }
    const mockStore = configureStore()
    let store

    afterEach(cleanup)

    it('should render', () => {
        store = mockStore(initialState)
        render(
            <Router>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>
        )
        screen.getAllByText('Sign in')
    })
    // it('should login', () => {
    //     store = mockStore(loggedInState)
    //     render(
    //         <Router>
    //             <Provider store={store}>
    //                 <LoginPage />
    //             </Provider>
    //         </Router>
    //     )
    //     // expect(mockedNavigator).toHaveBeenCalledWith('/')
    // })
})
