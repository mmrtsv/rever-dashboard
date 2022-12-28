import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import TopBar from '../components/HomeComponents/TopBar/TopBar'
import { useTheme } from '@itsrever/design-system'

function Home() {
    const theme = useTheme()
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <PageComponent>
            <MainDiv>
                <TopBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <AnalyticsDiv>
                    <FinancialDiv>
                        <InfoDiv borderColor={theme.colors.grey[3]}>
                            <div className="flex flex-col">
                                <h4>
                                    <b>Concept</b>
                                </h4>
                                <p>Gross sales Nude Project</p>
                                <p>New sales by REVER</p>
                                <hr className="my-2" />
                                <p>
                                    <b>Gross sales</b>
                                </p>
                                <p>Discounts</p>
                                <p>Returns (Shopify)</p>
                                <p>Returns (Rever)</p>
                                <hr className="my-2" />
                                <p>
                                    <b>Net sales</b>
                                </p>
                                <p>Shipping</p>
                                <p>Taxes</p>
                                <hr className="my-2" />
                                <p>
                                    <b>Total sales</b>
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-center">
                                    <b>Value</b>
                                </h4>
                                <span className="text-end">2,634,948.39 €</span>
                                <span className="text-end">39,871.46 €</span>
                                <hr className="my-2" />
                                <span className="text-end">
                                    <b>2,674,819.85 €</b>
                                </span>
                                <span className="text-end">- 75,722.00 €</span>
                                <span className="text-end">- 69,296.83 €</span>
                                <span className="text-end">- 45,993.80 €</span>
                                <hr className="my-2" />
                                <span className="text-end">
                                    <b>2,483,807.22 €</b>
                                </span>
                                <span className="text-end">130,511.81 €</span>
                                <span className="text-end">510,400.70 €</span>
                                <hr className="my-2" />
                                <span className="text-end">
                                    <b>3,124,719.73 €</b>
                                </span>
                            </div>
                        </InfoDiv>
                        <div>Hello</div>
                    </FinancialDiv>
                </AnalyticsDiv>
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

const AnalyticsDiv = styled.div`
    margin-top: 2rem;
`

interface BoxProps {
    borderColor: string
}

const FinancialDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    justify-items: center;
    gap: 0.5rem;
`

const InfoDiv = styled.div<BoxProps>`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    width: fit-content;
`
