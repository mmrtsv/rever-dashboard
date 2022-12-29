import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import TopBar from '../components/AnalyticsComponents/TopBar/TopBar'
import ReturnsMetrics from '../components/AnalyticsComponents/ReturnsMetrics/ReturnsMetrics'

function Home() {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <PageComponent>
            <GeneralDiv>
                <MainDiv>
                    <TopBar
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                    <AnalyticsDiv>
                        {currentTab === 0 ? <ReturnsMetrics /> : <></>}
                    </AnalyticsDiv>
                </MainDiv>
            </GeneralDiv>
        </PageComponent>
    )
}

export default Home

const GeneralDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
`

const AnalyticsDiv = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`
