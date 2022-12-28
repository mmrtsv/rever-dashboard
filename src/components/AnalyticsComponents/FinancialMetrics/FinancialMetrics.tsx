import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'

const FinancialMetrics = () => {
    const theme = useTheme()
    return (
        <FinancialDiv>
            <LeftDiv borderColor={theme.colors.grey[3]}>
                <div className="mr-8 flex flex-col">
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
                <div className="mr-8 flex flex-col">
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
                <div>
                    <h4>
                        <b>Description</b>
                    </h4>
                    <CustomP color={theme.colors.grey[1]}>
                        Gross sales excluding REVER exchanges
                    </CustomP>
                    <CustomP color={theme.colors.grey[1]}>
                        Sales that come through REVER exchanges
                    </CustomP>
                    <hr className="my-2" />
                    <CustomP color={theme.colors.grey[1]}>
                        Total gross sales (matches Shopify)
                    </CustomP>
                    <CustomP color={theme.colors.grey[1]}>
                        Discounts used (including Store Credit from REVER)
                    </CustomP>
                    <CustomP color={theme.colors.grey[1]}>
                        All the discounts manually processed in Shopify
                    </CustomP>
                    <CustomP color={theme.colors.grey[1]}>
                        All the returns made through REVER
                    </CustomP>
                    <hr className="my-2" />
                    <CustomP color={theme.colors.grey[1]}>Net sales</CustomP>
                    <CustomP color={theme.colors.grey[1]}>
                        Total shipping costs
                    </CustomP>
                    <CustomP color={theme.colors.grey[1]}>Total taxes</CustomP>
                    <hr className="my-2" />
                    <CustomP color={theme.colors.grey[1]}>Total sales</CustomP>
                </div>
            </LeftDiv>
        </FinancialDiv>
    )
}

export default FinancialMetrics

const FinancialDiv = styled.div`
    display: flex;
    justify-content: center;
`

interface BoxProps {
    borderColor: string
}

const LeftDiv = styled.div<BoxProps>`
    display: flex;
    justify-content: stretch;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

interface PProps {
    color: string
}

const CustomP = styled.p<PProps>`
    color: ${(p) => p.color};
`
