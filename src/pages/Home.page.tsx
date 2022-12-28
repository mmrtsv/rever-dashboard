import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import { Tabs, Tab } from '@mui/material'
import { useTheme } from '@itsrever/design-system'

function Home() {
    const theme = useTheme()

    const [currentTab, setCurrentTab] = useState(0)

    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <div>
                        <h1>Analytics Dashboard</h1>
                        <h6>Monitor metrics - Check reports</h6>
                    </div>
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
                            style={{ color: theme.colors.primary.dark }}
                            label="Financials"
                        />
                        <Tab label="Returns" />
                    </Tabs>
                </TopDiv>
            </MainDiv>
        </PageComponent>
    )
}

export default Home

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    height: 100%;
`

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`
