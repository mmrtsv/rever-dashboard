import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import TopBar from '../components/AnalyticsComponents/TopBar/TopBar'
import ReturnsMetrics from '../components/AnalyticsComponents/ReturnsMetrics/ReturnsMetrics'

function Home() {
    const [currentPeriod, setCurrentPeriod] = useState(2)

    return (
        <PageComponent>
            <GeneralDiv>
                <MainDiv>
                    <TopBar
                        currentPeriod={currentPeriod}
                        setCurrentPeriod={setCurrentPeriod}
                    />
                    <AnalyticsDiv>
                        <ReturnsMetrics currentPeriod={currentPeriod} />
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
    height: 100%;
    overflow-y: scroll;
    width: 100%;
`

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-left: 7%;
    padding-right: 7%;
`

const AnalyticsDiv = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    width: 100%;
`
