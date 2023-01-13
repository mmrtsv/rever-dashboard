import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import { UserMenu, userOptions } from './UserMenu'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../i18nForTests'

describe('UserMenu testing', () => {
    afterEach(cleanup)

    it('should render user name and account icon when availWidth >= 600', () => {
        vi.spyOn(window.screen, 'availWidth', 'get').mockReturnValue(600)

        const mockStore = configureStore()
        const store = mockStore()

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <UserMenu />
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        screen.getByTestId('UserName')
        screen.getByTestId('AccountCircleIcon')
    })

    it('should only render account icon when availWidth < 600', () => {
        vi.spyOn(window.screen, 'availWidth', 'get').mockReturnValue(599)

        const mockStore = configureStore()
        const store = mockStore()

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <UserMenu />
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        expect(screen.queryByTestId('UserName')).toBeNull()
        screen.getByTestId('AccountCircleIcon')
    })

    it('should display the correct menu options', () => {
        const mockStore = configureStore()
        const store = mockStore()

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <UserMenu />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        userOptions.forEach((option) => {
            screen.getByText(option.en)
        })
    })
})
