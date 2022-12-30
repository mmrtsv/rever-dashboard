import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import FinancialMetrics from '../components/AnalyticsComponents/FinancialMetrics/FinancialMetrics'
import PeriodSelector from '../components/AnalyticsComponents/PeriodSelector/PeriodSelector'

function Financials() {
    const [currentPeriod, setCurrentPeriod] = useState(2)

    return (
        <PageComponent>
            <GeneralDiv>
                <MainDiv>
                    <TopDiv>
                        <h1 className="text-2xl">FINANCIAL STATUS</h1>
                        <PeriodSelector
                            currentPeriod={currentPeriod}
                            setCurrentPeriod={setCurrentPeriod}
                        />
                    </TopDiv>
                    <AnalyticsDiv>
                        <FinancialMetrics />
                    </AnalyticsDiv>
                </MainDiv>
            </GeneralDiv>
        </PageComponent>
    )
}

export default Financials

const GeneralDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const AnalyticsDiv = styled.div`
    display: flex;
    justify-content: center;
`
