import React from 'react'
import styled from '@emotion/styled'
import { Tabs, Tab } from '@mui/material'
import { useTheme } from '@itsrever/design-system'

interface TopBarProps {
    currentTab: number
    setCurrentTab: (index: number) => void
}

const TopBar: React.FC<TopBarProps> = ({ currentTab, setCurrentTab }) => {
    const theme = useTheme()
    return (
        <TopDiv>
            <div className="flex flex-col items-center">
                <h2>Analytics Dashboard</h2>
                <h6>Monitor metrics - Check reports</h6>
            </div>
            <div className="flex justify-center">
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
            </div>
        </TopDiv>
    )
}

export default TopBar

const TopDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    align-items: center;
    width: 100%;
`
