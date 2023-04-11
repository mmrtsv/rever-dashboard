import React from 'react'
import styled from '@emotion/styled'
import PeriodSelector from '../PeriodSelector/PeriodSelector'
import device from '@/utils/device'

interface TopBarProps {
    currentPeriod: number
    setCurrentPeriod: (index: number) => void
}

const TopBar: React.FC<TopBarProps> = ({ currentPeriod, setCurrentPeriod }) => {
    return (
        <TopDiv>
            <div />
            <PeriodSelector
                currentPeriod={currentPeriod}
                setCurrentPeriod={setCurrentPeriod}
            />
        </TopDiv>
    )
}

export default TopBar

const TopDiv = styled.div`
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media ${device.lg} {
        padding-top: 3rem;
    }
`
