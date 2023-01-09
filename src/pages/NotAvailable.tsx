import React from 'react'
import { useTheme } from '@itsrever/design-system'
import ComingSoonAnimation from '../assets/Lottie/ComingSoon/ComingSoon'
import styled from 'styled-components'

function NotAvailable() {
    const theme = useTheme()

    const screenWidth = window.screen.availWidth

    return (
        <AnimationDiv bgColor={theme.colors.grey[4]}>
            <SingleInfo>
                {screenWidth < 768
                    ? 'Mobile version not available yet'
                    : 'Coming soon!'}
            </SingleInfo>

            <ComingSoonAnimation />
        </AnimationDiv>
    )
}

export default NotAvailable

interface AnimationProps {
    bgColor: string
}

const AnimationDiv = styled.div<AnimationProps>`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    background-color: ${(p) => p.bgColor};
    height: 100%;
`

const SingleInfo = styled.div`
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 1rem;
    text-align: center;
    margin-top: 2rem;
`
