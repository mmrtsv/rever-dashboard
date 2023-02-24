import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import RDVIcon from '@mui/icons-material/AccountBalance'
import SalesIcon from '@mui/icons-material/Paid'
import ArrowUpIcon from '@mui/icons-material/TrendingUp'
import { useSearchReturnMetrics } from '../../../hooks/useSearchReturnMetrics'
import { formatPrice } from '../../../utils'
import moment from 'moment'
import useSearchReturnTypesByDay from '@/hooks/useSearchReturnTypesByDay'
import device from '@/utils/device'
import DonutComponent from './DonutComponent/DonutComponent'
import countries from '../../../utils/countries.json'
import useSearchReturnsByCountry from '@/hooks/useSearchReturnsByCountry'
import { useTranslation } from 'react-i18next'
import NotFoundReports from '@/assets/Lottie/ComingSoon/NotFoundReports'

interface ReturnsMetricsProps {
    currentPeriod: number
}
const ReturnsMetrics: React.FC<ReturnsMetricsProps> = ({ currentPeriod }) => {
    const { i18n } = useTranslation()
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

    const { returnMetrics } = useSearchReturnMetrics(dateFrom, dateTo)
    const { returnTypesByDay } = useSearchReturnTypesByDay(dateFrom, dateTo)

    const moneyFormat = returnMetrics && returnMetrics?.money_format
    const totalRdv =
        returnMetrics?.rdv &&
        moneyFormat &&
        formatPrice(returnMetrics.rdv, moneyFormat)
    const returns = returnMetrics && returnMetrics.Returns

    function getReturns(data: any) {
        return data.map((item: any) => item.item_count).reverse()
    }
    function getReturnsByDayDays(data: any) {
        return data
            .map((item: any) =>
                moment(item.date, 'YYYY-MM-DD').format('DD MMM')
            )
            .reverse()
    }
    const returnsByDay = returnTypesByDay && getReturns(returnTypesByDay)
    const returnsByDayDays =
        returnTypesByDay && getReturnsByDayDays(returnTypesByDay)

    const options2: ApexOptions = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: '#AEDCFF',
            width: '100%',
            height: '100%',
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#AEDCFF'],
        dataLabels: {
            enabled: false
        },
        fill: {
            colors: ['#003096']
        },
        grid: {
            show: false,
            borderColor: '#85B8FF'
        },
        stroke: {
            width: 3
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories: returnsByDayDays,
            labels: {
                show: true
            }
        }
    }
    const series2 = [{ name: 'Returned items', data: returnsByDay }]

    // Countries info
    const { returnsByCountry } = useSearchReturnsByCountry(dateFrom, dateTo)
    const valuesCountries = returnsByCountry?.map((item: any) => {
        return Math.round(item.percentage)
    })
    function translateCountryName(countryCode: string, i18nLanguage: string) {
        const country = countries.countries.find((c) => c.code === countryCode)
        if (!country) {
            return ''
        }
        return i18nLanguage === 'es' ? country.name_es : country.name_en
    }
    const translatedCountries =
        returnsByCountry &&
        returnsByCountry.map((c) => {
            return {
                count: c.count,
                country:
                    c.country && translateCountryName(c.country, i18n.language),
                percentage: c.percentage
            }
        })
    const labelsCountries = translatedCountries?.map((item: any) => {
        return item.country
    })

    // Compensations info
    const labelsCompensations = [
        'Refunds',
        'Exchanges',
        'Original Payment Method',
        'Store Credit'
    ]

    let totalCompensation = 0
    const values =
        returnMetrics?.refunds_types &&
        Object.entries(returnMetrics.refunds_types).map((refAmount: [string, number]) => {
            totalCompensation += refAmount[1]
            return refAmount[1] * 100
        })
    const valuesCompensations = values?.map((v) =>
        Math.round(v / totalCompensation)
    )
    const RDVPercentage = valuesCompensations
        ? valuesCompensations[1] + valuesCompensations[3]
        : 0
    return (
        <>
            {returnTypesByDay ? (
                <ReturnsDiv>
                    <TopInfo>
                        <ReverSuccessBox
                            bordBottomColor={theme.colors.primary.dark}
                            borderColor={theme.colors.grey[3]}
                        >
                            <div className="flex w-full">
                                <IconDiv color={theme.colors.primary.dark}>
                                    <ReturnsIcon />
                                </IconDiv>
                                <div className="flex w-full flex-col">
                                    <Title
                                        color={theme.colors.primary.dark}
                                        className="text-center"
                                    >
                                        <b>{returns}</b>
                                    </Title>
                                    <Subtitle className="text-center">
                                        total returns
                                    </Subtitle>
                                </div>
                            </div>
                        </ReverSuccessBox>
                        <ReverSuccessBox
                            bordBottomColor={theme.colors.primary.dark}
                            borderColor={theme.colors.grey[3]}
                        >
                            <div className="flex w-full">
                                <IconDiv color={theme.colors.primary.dark}>
                                    <RDVIcon />
                                </IconDiv>
                                <div className="flex w-full flex-col">
                                    <Title
                                        color={theme.colors.primary.dark}
                                        className="text-center"
                                    >
                                        <b>{RDVPercentage}%</b>
                                    </Title>
                                    <Subtitle className="text-center">
                                        of retained dollar value (RDV)
                                    </Subtitle>
                                </div>
                            </div>
                        </ReverSuccessBox>
                        <ReverSuccessBox
                            bordBottomColor={theme.colors.success.main}
                            borderColor={theme.colors.grey[3]}
                        >
                            <div className="flex w-full">
                                <IconDiv color={theme.colors.success.main}>
                                    <SalesIcon />
                                </IconDiv>

                                <div className="ml-2 flex w-full flex-col">
                                    <div className="flex items-center justify-center">
                                        <IconDiv
                                            className="mr-2"
                                            color={theme.colors.success.main}
                                        >
                                            <ArrowUpIcon />
                                        </IconDiv>
                                        <Title
                                            color={theme.colors.success.main}
                                            className="text-center"
                                        >
                                            <b>{totalRdv}</b>
                                        </Title>
                                    </div>

                                    <Subtitle className="text-center">
                                        of new sales generated
                                    </Subtitle>
                                </div>
                            </div>
                        </ReverSuccessBox>
                    </TopInfo>
                    <LineChart>
                        <LineChartTitle>Returned items</LineChartTitle>
                        <Chart
                            options={options2}
                            series={series2}
                            type="area"
                            height="250"
                            // width="100%"
                        />
                    </LineChart>
                    <CompensationsDiv>
                        <DonutBox borderColor={theme.colors.grey[3]}>
                            {returnsByCountry && (
                                <DonutComponent
                                    title="Countries"
                                    labels={labelsCountries}
                                    values={valuesCountries}
                                />
                            )}
                            {returnMetrics?.refunds_types && (
                                <DonutComponent
                                    title="Compensation methods"
                                    labels={labelsCompensations}
                                    values={valuesCompensations}
                                />
                            )}
                        </DonutBox>
                    </CompensationsDiv>
                </ReturnsDiv>
            ) : (
                <div>
                    <Title
                        color={theme.colors.primary.dark}
                        className="mt-20 text-center"
                    >
                        No returns in the period
                    </Title>
                    <NotFoundReports />
                </div>
            )}
        </>
    )
}

export default ReturnsMetrics

const LineChartTitle = styled.h6`
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.0075em;
    color: #aedcff;
    margin-top: 1rem;
    margin-bottom: 0.5rem;

    text-align: center;
`

const LineChart = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    width: 100%;
    height: fit-content;
    /* padding: 1rem; */
    border-radius: 0.5rem;
    background-color: rgb(30, 41, 59);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

interface BoxProps {
    borderColor?: string
    backgroundColor?: string
}

const DonutBox = styled.div<BoxProps>`
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-around;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    @media ${device.md} {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
`

const ReturnsDiv = styled.div`
    height: 100%;
    width: 100%;
`

const TopInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media ${device.md} {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }
`

interface IconProps {
    color: string
}

const Subtitle = styled.h6`
    font-size: 12px;
    @media ${device.lg} {
        font-size: 14px;
    }
    @media ${device.xl} {
        font-size: 16px;
    }
`
const Title = styled.h3<IconProps>`
    color: ${(p) => p.color};
    font-size: 24px;
    @media ${device.lg} {
        font-size: 36px;
    }
    @media ${device.xl} {
        font-size: 48px;
    }
`

const IconDiv = styled.div<IconProps>`
    display: flex;
    align-items: center;
    color: ${(p) => p.color};
`

interface BoxSuccessProps {
    borderColor: string
    bordBottomColor: string
}

const ReverSuccessBox = styled.div<BoxSuccessProps>`
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    border-bottom-width: 8px;
    border-bottom-color: ${(p) => p.bordBottomColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0.35rem;
    margin-bottom: 1rem;
    @media ${device.md} {
        padding: 0.55rem;
        margin-bottom: 0rem;
    }
    @media ${device.lg} {
        padding: 0.85rem;
        margin-bottom: 0rem;
    }
    @media ${device.xl} {
        padding: 1rem;
        margin-bottom: 0rem;
    }
`

const CompensationsDiv = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    padding-bottom: 4rem;
`
