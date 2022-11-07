import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import Home from '../../pages/Home.page'

describe('Home Page', () => {
    afterEach(cleanup)

    it('should render', () => {
        render(<Home />)
        screen.getByText('HOME!')
    })
})
