import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import RejectReasonModal from './RejectReasonModal'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'

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

    // it('should render the title, text and button', () => {
    //     render(
    //         <Router>
    //             <ThemeProvider>
    //                 <I18nextProvider i18n={i18n}>
    //                     <RejectReasonModal
    //                         index={0}
    //                         isOpen={true}
    //                         setIsOpen={() => null}
    //                         reviews={[]}
    //                         setReviews={() => null}
    //                         lineItemId="ID"
    //                     />
    //                 </I18nextProvider>
    //             </ThemeProvider>
    //         </Router>
    //     )
    //     screen.getByText('Reason for rejection')
    //     screen.getByRole('textbox')
    //     screen.getByText('Submit Review')
    // })
})
