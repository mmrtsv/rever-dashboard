import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from './Header'
import drawerList1 from './Header'
import drawerList2 from './Header'

describe('Header Component', () => {
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

    it('should render the elements: DrawerLogo - ReverLogo - LanguageSwitcher - UserMenu', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <Header />
                </Provider>
            </Router>
        )
        screen.getByTestId('DrawerOutLogo')
        screen.getByTestId('ReverLogo')
        screen.getByTestId('LanguageSwitcher')
        screen.getByTestId('UserMenu')
    })

    // TO BE FINISHED
    it('should display correct pages when DrawerLogo is clicked', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <Header />
                </Provider>
            </Router>
        )

        const DrawerOutLogo = screen.getByTestId('DrawerOutLogo')
        fireEvent.click(DrawerOutLogo)

        //Object.entries(drawerList1).forEach((item) => {})
    })
})
