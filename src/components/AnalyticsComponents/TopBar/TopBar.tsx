import React from 'react'
import styled from '@emotion/styled'
import { Tabs, Tab } from '@mui/material'
import { useTheme } from '@itsrever/design-system'
import PeriodSelector from '../PeriodSelector/PeriodSelector'

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
                <h3 className="text-primary-dark mb-4 text-5xl">
                    <b>Analytics dashboard</b>
                </h3>
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

const TopDiv = styled.div`
    /* display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem; */
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
