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
import { useSearchReturnTypes } from '../../../hooks/useSearchReturnTypes'
import { formatPrice } from '../../../utils'
import moment from 'moment'
import useSearchReturnTypesByDay from '@/hooks/useSearchReturnTypesByDay'

interface ReturnsMetricsProps {
    currentPeriod: number
}
const ReturnsMetrics: React.FC<ReturnsMetricsProps> = ({ currentPeriod }) => {
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
    const { returnTypes } = useSearchReturnTypes(dateFrom, dateTo)
    const { returnTypesByDay } = useSearchReturnTypesByDay(dateFrom, dateTo)

    const exchangePercentage: number = returnTypes?.exchanges
        ? Math.round(returnTypes?.exchanges)
        : 0
    const refundPercentage = returnTypes?.refunds
        ? Math.round(returnTypes?.refunds)
        : 0
    const storeCreditPercentage = returnTypes?.store_credit
        ? Math.round(returnTypes?.store_credit)
        : 0

    const moneyFormat = returnMetrics && returnMetrics?.money_format
    const totalRdv =
        returnMetrics &&
        returnMetrics.rdv &&
        moneyFormat &&
        formatPrice(returnMetrics.rdv, moneyFormat)
    const returns = returnMetrics && returnMetrics.Returns
    const rdvPercentage =
        returnMetrics &&
        returnMetrics.rdv_percentage?.toString().substring(0, 5)

    function getReturns(data: any) {
        return data.map((item: any) => item.returns)
    }
    const returnsByDay = returnTypesByDay && getReturns(returnTypesByDay)
    function getLast7Days(): string[] {
        const today = moment().subtract(1, 'days')
        const last7Days = []

        for (let i = 0; i < 7; i++) {
            last7Days.push(today.subtract(i, 'days').format('DD MMM'))
        }

        return last7Days.reverse()
    }
    const last7Days = getLast7Days()
    const chartOptions: ApexOptions = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'donut',
            sparkline: {
                enabled: true
            }
        },
        // colors: ['#1B75EB', '#85B8FF', '#AEDCFF', '#003096'],
        colors: ['#1B75EB', '#85B8FF', '#003096'],
        labels: [
            'Exchanges',
            'Refunds',
            'Store Credit'
            // 'Original Payment Method',
        ],
        plotOptions: {
            pie: {
                customScale: 0.9,
                expandOnClick: false,
                donut: {
                    size: '70%'
                }
            }
        },
        // stroke: {
        //     colors: [theme.palette.background.paper]
        // },
        series: [exchangePercentage, refundPercentage, storeCreditPercentage],
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark',
            custom: ({ seriesIndex, w }) =>
                `<div class="flex items-center h-16 min-h-16 max-h-16 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>`
        }
    }
    // const colors = ['#1B75EB', '#85B8FF', '#AEDCFF', '#003096']
    const colors = ['#1B75EB', '#85B8FF', '#003096']
    const labels = ['Exchanges', 'Refunds', 'Store Credit']
    const series = [exchangePercentage, refundPercentage, storeCreditPercentage]

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
            width: 2
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories: last7Days
        }
    }
    const series2 = [{ name: 'Returns', data: returnsByDay }]

    return (
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
                                className="text-center text-5xl"
                            >
                                <b>{returns}</b>
                            </Title>
                            <h6 className="text-center">total returns</h6>
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
                                className="text-center text-5xl"
                            >
                                <b>{rdvPercentage}%</b>
                            </Title>
                            <h6 className="text-center">
                                of retained dollar value (RDV)
                            </h6>
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
                                    className="text-center text-5xl"
                                >
                                    <b>{totalRdv}</b>
                                </Title>
                            </div>

                            <h6 className="text-center">
                                of new sales generated
                            </h6>
                        </div>
                    </div>
                </ReverSuccessBox>
            </TopInfo>
            <CompensationsDiv>
                {/* <ReverBox borderColor={theme.colors.grey[3]}> */}
                <LineChart>
                    <LineChartTitle>Returns last 7 days</LineChartTitle>
                    <Chart
                        options={options2}
                        series={series2}
                        type="area"
                        height="420"
                        width="100%"
                    />
                </LineChart>
                {/* </ReverBox> */}
                <DonutBox borderColor={theme.colors.grey[3]}>
                    <p className="truncate text-lg font-medium leading-6">
                        Compensations
                    </p>
                    <Chart
                        options={chartOptions}
                        series={series}
                        type="donut"
                        width="400"
                    />
                    <div className="m-2">
                        <div>
                            {series.map((dataset, i) => (
                                <>
                                    <div
                                        className="mx-4 grid grid-cols-2 py-1"
                                        key={i}
                                    >
                                        <div className="flex items-center">
                                            <LegendDot
                                                className="h-4 w-4 rounded-full"
                                                backgroundColor={colors[i]}
                                            />
                                            <p className="ml-4 truncate">
                                                {labels[i]}
                                            </p>
                                        </div>

                                        <p
                                            className="text-right"
                                            color="text.secondary"
                                        >
                                            {dataset}%
                                        </p>
                                    </div>
                                    {i === series.length - 1 ? null : <hr />}
                                </>
                            ))}
                        </div>
                    </div>
                </DonutBox>
            </CompensationsDiv>
        </ReturnsDiv>
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
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    width: 100%;
    height: 100%;
    /* padding: 1rem; */
    border-radius: 0.5rem;
    background-color: rgb(30, 41, 59);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
interface BoxProps {
    borderColor?: string
    backgroundColor?: string
}
const LegendDot = styled.div<BoxProps>`
    background-color: ${(p) => p.backgroundColor};
    border-color: ${(p) => p.borderColor};
`
const DonutBox = styled.div<BoxProps>`
    margin-left: 1rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const ReturnsDiv = styled.div`
    /* background-color: red; */
`

const TopInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    width: 100%;
`

interface IconProps {
    color: string
}

const Title = styled.h3<IconProps>`
    color: ${(p) => p.color};
`

const IconDiv = styled.div<IconProps>`
    display: flex;
    align-items: center;
    color: ${(p) => p.color};
`

const ReverBox = styled.div<BoxProps>`
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

interface BoxSuccessProps {
    borderColor: string
    bordBottomColor: string
}

const ReverSuccessBox = styled.div<BoxSuccessProps>`
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    border-bottom-width: 8px;
    border-bottom-color: ${(p) => p.bordBottomColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const CompensationsDiv = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
`
