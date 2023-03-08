import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import i18n from '../../i18nForTests'
import Pagination from './Pagination'

describe('Pagination Component Test', () => {
    afterEach(cleanup)

    it('should render the correct amount of pages when there are less than 5', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        const pages = [1, 2, 3, 4]

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        {pages.map((page) => (
                            <Pagination
                                key={page}
                                actualPage={1}
                                setActualPage={() => null}
                                maxPage={page}
                            />
                        ))}
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        const ones = screen.getAllByText('1')
        screen.getByText('1 total pages')
        expect(ones.length).toBe(4)

        const twos = screen.getAllByText('2')
        screen.getByText('2 total pages')
        expect(twos.length).toBe(3)

        const thress = screen.getAllByText('3')
        screen.getByText('3 total pages')
        expect(thress.length).toBe(2)

        const fours = screen.getAllByText('4')
        screen.getByText('4 total pages')
        expect(fours.length).toBe(1)
    })

    it('should display 10 - 25 - 50 options when clicking on the limitter', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Pagination
                            actualPage={1}
                            setActualPage={() => null}
                            maxPage={5}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        const limitter = screen.getAllByRole('button')[0]
        fireEvent.mouseDown(limitter)

        const options = screen.getAllByRole('option')
        const optionValues = options.map((li) => li.getAttribute('data-value'))
        expect(optionValues).toEqual(['10', '25', '50'])
    })

    it('should dispatch the limit when an option of the limitter is clicked', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Pagination
                            actualPage={1}
                            setActualPage={() => null}
                            maxPage={5}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )

        // Open the dropdown
        const limitter = screen.getAllByRole('button')[0]
        fireEvent.mouseDown(limitter)

        // Get the options and click
        const options = screen.getAllByRole('option')
        fireEvent.click(options[1])

        // Check that it has dispatched
        const actions = store.getActions()
        expect(actions.length).toBe(1)
    })

    it('should change the actual page when a number or arrow is clicked', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        const spyOnChange = vi.fn()

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Pagination
                            actualPage={1}
                            setActualPage={spyOnChange}
                            maxPage={5}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // Click on page number
        fireEvent.click(screen.getByText('3'))
        fireEvent.click(screen.getByTestId('arrow-left'))
        fireEvent.click(screen.getByTestId('arrow-right'))

        // Check onChange
        expect(spyOnChange).toHaveBeenCalledTimes(3)
    })

    it('should not change the actual page when arrows are clicked on limits', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        const spyOnChange = vi.fn()

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Pagination
                            actualPage={0}
                            setActualPage={spyOnChange}
                            maxPage={1}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // Click on page number
        fireEvent.click(screen.getByTestId('arrow-left'))
        fireEvent.click(screen.getByTestId('arrow-right'))

        // Check onChange
        expect(spyOnChange).toHaveBeenCalledTimes(0)
    })

    it('should not render the limitter when availWidth < 600', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 599
        })

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Pagination
                            actualPage={0}
                            setActualPage={() => null}
                            maxPage={1}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // limitter still in DOM
        const limitter = screen.getAllByRole('button')[0]
        expect(limitter.offsetHeight).toBe(0)
        expect(limitter.offsetWidth).toBe(0)
    })
})

function reduxState() {
    return {
        generalData: {
            limitPagination: 10
        }
    }
}
