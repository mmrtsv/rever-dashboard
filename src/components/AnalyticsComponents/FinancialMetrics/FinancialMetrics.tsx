import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'

const FinancialMetrics = () => {
    const theme = useTheme()
    return (
        <FinancialDiv>
            <LeftDiv borderColor={theme.colors.grey[3]}>
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
            </LeftDiv>
            <RightDiv borderColor={theme.colors.grey[3]}>
                <h4>
                    <b>Concept</b>
                </h4>
                <p>Gross sales excluding REVER exchanges</p>
                <p>Sales that come through REVER exchanges</p>
                <hr className="my-2" />
                <p>Total gross sales (matches Shopify)</p>
                <p>Discounts used (including Store Credit from REVER)</p>
                <p>All the discounts manually processed in Shopify</p>
                <p>All the returns made through REVER</p>
                <hr className="my-2" />
                <p>Net sales</p>
                <p>Total shipping costs</p>
                <p>Total taxes</p>
                <hr className="my-2" />
                <p>Total sales</p>
            </RightDiv>
        </FinancialDiv>
    )
}

export default FinancialMetrics

const FinancialDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
`

interface BoxProps {
    borderColor: string
}

const LeftDiv = styled.div<BoxProps>`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const RightDiv = styled.div<BoxProps>`
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
