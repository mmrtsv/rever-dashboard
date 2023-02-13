import React from 'react'
import styled from '@emotion/styled'
import { Tabs, Tab } from '@mui/material'
import { useTheme } from '@itsrever/design-system'
import PeriodSelector from '../PeriodSelector/PeriodSelector'
import device from '@/utils/device'

interface TopBarProps {
    currentTab: number
    setCurrentTab: (index: number) => void
    currentPeriod: number
    setCurrentPeriod: (index: number) => void
}

const TopBar: React.FC<TopBarProps> = ({
    currentTab,
    setCurrentTab,
    currentPeriod,
    setCurrentPeriod
}) => {
    const theme = useTheme()
    return (
        <TopDiv>
            <div className="flex flex-col">
                <Title className="text-primary-dark">
                    <b>Analytics dashboard</b>
                </Title>
                <h6>Monitor metrics - Check reports</h6>
            </div>
            <div className="mt-8">
                {/* <div className="mb-4 flex justify-center">
                    <Tabs
                        value={currentTab}
                        onChange={(e, i) => setCurrentTab(i)}
                        TabIndicatorProps={{
                            sx: {
                                background: theme.colors.primary.dark
                            }
                        }}
                    >
                        <Tab
                            style={{
                                color: `${
                                    currentTab === 0
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[1]
                                }`
                            }}
                            label="Returns"
                        />
                        <Tab
                            style={{
                                color: `${
                                    currentTab === 1
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[1]
                                }`
                            }}
                            label="Others"
                        />
                    </Tabs>
                </div> */}
                <PeriodSelector
                    currentPeriod={currentPeriod}
                    setCurrentPeriod={setCurrentPeriod}
                />
            </div>
        </TopDiv>
    )
}

export default TopBar
const Title = styled.h3`
    margin-bottom: 1rem;
    font-size: 38px;
    @media ${device.sm} {
        font-size: 42px;
    }
    @media ${device.md} {
        font-size: 48px;
    }
`
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
