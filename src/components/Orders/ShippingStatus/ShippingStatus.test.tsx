import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import ShippingStatus, { ShippingStatuses } from './ShippingStatus'

describe('ShippingStatus test', () => {
    afterEach(cleanup)

    it('should render the correct shipping status depending on the input', () => {
        render(
            <Router>
                {ShippingStatuses.map((_, i) => (
                    <ShippingStatus key={i} status={i} />
                ))}
            </Router>
        )
        screen.getByText('No status')
        screen.getByText('Created')
        screen.getByText('Collected')
        screen.getByText('In warehouse')
        screen.getByText('Error')
        screen.getByText('Cancelled')
    })
})
