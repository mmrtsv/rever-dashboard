import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import Home from '../../pages/Home.page'

describe('Home Page', () => {
    afterEach(cleanup)

    it('should render', () => {
        render(<Home />)
        screen.getByTestId('home-page')
    })
})
