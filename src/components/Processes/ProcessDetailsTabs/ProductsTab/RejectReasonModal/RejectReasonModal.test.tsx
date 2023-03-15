import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'
import RejectReasonModal from './RejectReasonModal'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'
import { Review } from '../ProductsTab'

describe('Products Tab test', () => {
    afterEach(cleanup)

    it('should render the title, text and button', () => {
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <RejectReasonModal
                            index={0}
                            isOpen={true}
                            setIsOpen={() => null}
                            reviews={[]}
                            setReviews={() => null}
                            lineItemId="ID"
                        />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        screen.getByText('Reason for rejection')
        screen.getByRole('textbox')
        screen.getByText('Submit Review')
    })

    it('should call setIsOpen on close and submit', () => {
        const setIsOpen = vi.fn()
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <RejectReasonModal
                            index={0}
                            isOpen={true}
                            setIsOpen={setIsOpen}
                            reviews={[]}
                            setReviews={() => null}
                            lineItemId="ID"
                        />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        // Close
        const close = screen.getByTestId('close-button')
        fireEvent.click(close)
        expect(setIsOpen).toHaveBeenCalledTimes(1)

        // Submit
        const submit = screen.getByText('Submit Review')
        fireEvent.click(submit)
        expect(setIsOpen).toBeCalledTimes(2)
    })

    it('should call setReviews if closed and item was already reviewed', () => {
        const setReviews = vi.fn()

        const tmp: Review = {
            line_item_id: 'ID',
            index: 0
        }
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <RejectReasonModal
                            index={0}
                            isOpen={true}
                            setIsOpen={() => null}
                            reviews={[tmp]}
                            setReviews={setReviews}
                            lineItemId="ID"
                        />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        // Close
        const close = screen.getByTestId('close-button')
        fireEvent.click(close)
        expect(setReviews).toHaveBeenCalledTimes(1)
    })
})
