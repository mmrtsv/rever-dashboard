import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'
import useSearchFinancialReport from '../../../hooks/useSearchFinancialReport'
import moment from 'moment'
import { formatPrice } from '../../../utils'

interface FinancialMetricsProps {
    currentPeriod: number
}
const FinancialMetrics: React.FC<FinancialMetricsProps> = ({
    currentPeriod
}) => {
    const theme = useTheme()
    const dateTo = moment().format('YYYY-MM-DD')
    const dateFrom30d = moment().subtract(1, 'M').format('YYYY-MM-DD')
    const dateFrom7d = moment().subtract(7, 'd').format('YYYY-MM-DD')
    const [dateFrom, setDateFrom] = useState(dateFrom30d)
    useEffect(() => {
        if (currentPeriod === 2) {
            setDateFrom(dateFrom30d)
        } else {
            setDateFrom(dateFrom7d)
        }
    }, [currentPeriod])
    const { report } = useSearchFinancialReport()

    const moneyFormat = report?.money_format
    const grossSales =
        moneyFormat && formatPrice(report?.gross_sales || 0, moneyFormat)
    const discounts =
        moneyFormat && formatPrice(report?.discounts || 0, moneyFormat)
    const returns =
        moneyFormat && formatPrice(report?.returns || 0, moneyFormat)
    const shipping =
        moneyFormat && formatPrice(report?.shipping || 0, moneyFormat)
    const taxes = moneyFormat && formatPrice(report?.taxes || 0, moneyFormat)
    // const reverItems =
    //     moneyFormat && formatPrice(report?. || 0, moneyFormat)
    // const reverTransactions =
    //     moneyFormat && formatPrice(report?.rever_transactions || 0, moneyFormat)

    return (
        <FinancialDiv>
            <LeftDiv borderColor={theme.colors.grey[3]}>
                <div className="mr-8 flex flex-col">
                    <h4>
                        <b>Concept</b>
                    </h4>
                    <p>Gross sales</p>
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
                    <span className="text-end">{grossSales}</span>
                    {/* <span className="text-end">{reverTransactions}</span> */}
                    <hr className="my-2" />
                    <span className="text-end">
                        <b>2,674,819.85 €</b>
                    </span>
                    <span className="text-end">{discounts}</span>
                    <span className="text-end">{returns}</span>
                    <span className="text-end">- 45,993.80 €</span>
                    <hr className="my-2" />
                    <span className="text-end">
                        <b>{shipping}</b>
                    </span>
                    <span className="text-end">{taxes}</span>
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
