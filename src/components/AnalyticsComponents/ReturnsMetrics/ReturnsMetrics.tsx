import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import RDVIcon from '@mui/icons-material/AccountBalance'
import SalesIcon from '@mui/icons-material/Paid'
import ArrowUpIcon from '@mui/icons-material/TrendingUp'

const ReturnsMetrics = () => {
    const theme = useTheme()

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
        colors: ['#1B75EB', '#85B8FF', '#AEDCFF', '#003096'],
        labels: [
            'Store Credit',
            'Original Payment Method',
            'Bank Transfer',
            'Exchanges'
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
        series: [44, 55, 41, 17],
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
    const colors = ['#1B75EB', '#85B8FF', '#AEDCFF', '#003096']
    const labels = [
        'Store Credit',
        'Original Payment Method',
        'Bank Transfer',
        'Exchanges'
    ]
    const series = [15, 12, 43, 30]

    const options2: ApexOptions = {
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    }
    const series2 = [
        {
            data: [30, 40, 25, 50, 49, 21, 70, 51]
        }
    ]

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
                                <b>2482</b>
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
                                <b>45%</b>
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
                                    <b>39,871.39 €</b>
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
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <Chart
                        options={options2}
                        series={series2}
                        type="line"
                        width="600"
                    />
                </ReverBox>
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

const ReturnsDiv = styled.div``

const TopInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
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
    display: flex;
`
