import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import TopBar from '../components/AnalyticsComponents/TopBar/TopBar'
import ReturnsMetrics from '../components/AnalyticsComponents/ReturnsMetrics/ReturnsMetrics'
import { useTheme } from '@itsrever/design-system'
import NoAvailable from '../assets/images/noAvailable.png'
import PeriodSelector from '../components/AnalyticsComponents/PeriodSelector/PeriodSelector'

function Home() {
    const theme = useTheme()
    const [currentTab, setCurrentTab] = useState(0)
    const [currentPeriod, setCurrentPeriod] = useState(2)

    const imgsrc = NoAvailable

    return (
        <PageComponent>
            <GeneralDiv>
                <MainDiv>
                    <TopBar
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        currentPeriod={currentPeriod}
                        setCurrentPeriod={setCurrentPeriod}
                    />

                    <AnalyticsDiv>
                        {currentTab === 0 ? (
                            <ReturnsMetrics currentPeriod={currentPeriod} />
                        ) : (
                            <div>
                                <h1>Other returns information</h1>
                                <div>
                                    <h3>Top returned products</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ReverBox
                                            borderColor={theme.colors.grey[3]}
                                        >
                                            <div className="flex justify-center">
                                                <img
                                                    className="h-fit w-16"
                                                    src={imgsrc}
                                                    alt="ProductImage"
                                                />
                                            </div>
                                            <p className="mt-6">
                                                Clean Hoodie XL
                                            </p>
                                        </ReverBox>
                                        <ReverBox
                                            borderColor={theme.colors.grey[3]}
                                        >
                                            <div className="flex justify-center">
                                                <img
                                                    className="h-fit w-16"
                                                    src={imgsrc}
                                                    alt="ProductImage"
                                                />
                                            </div>
                                            <p className="mt-6">
                                                Clean Hoodie XL
                                            </p>
                                        </ReverBox>
                                        <ReverBox
                                            borderColor={theme.colors.grey[3]}
                                        >
                                            <div className="flex justify-center">
                                                <img
                                                    className="h-fit w-16"
                                                    src={imgsrc}
                                                    alt="ProductImage"
                                                />
                                            </div>
                                            <p className="mt-6">
                                                Clean Hoodie XL
                                            </p>
                                        </ReverBox>
                                    </div>
                                </div>
                            </div>
                        )}
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

interface BoxProps {
    borderColor: string
}

const ReverBox = styled.div<BoxProps>`
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
