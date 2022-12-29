import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import FinancialMetrics from '../components/AnalyticsComponents/FinancialMetrics/FinancialMetrics'

function Home() {
    return (
        <PageComponent>
            <GeneralDiv>
                <MainDiv>
                    <Title>Financial Status</Title>
                    <AnalyticsDiv>
                        <FinancialMetrics />
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

const Title = styled.h1`
    text-align: center;
`

const AnalyticsDiv = styled.div`
    display: flex;
    justify-content: center;
`
