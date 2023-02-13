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
import useSearchReturnsByCountry from '@/hooks/useSearchReturnsByCountry'
import countries from '../../../utils/countries.json'
import { useTranslation } from 'react-i18next'
import device from '@/utils/device'
import NotFoundReports from '@/assets/Lottie/ComingSoon/NotFoundReports'

interface ReturnsMetricsProps {
    currentPeriod: number
}
const ReturnsMetrics: React.FC<ReturnsMetricsProps> = ({ currentPeriod }) => {
    const i18n = useTranslation()
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
    const { returnsByCountry } = useSearchReturnsByCountry(dateFrom, dateTo)

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
    const colorsCountries1 = ['#1B75EB']
    const colorsCountries2 = ['#1B75EB', '#85B8FF']
    const colorsCountries3 = ['#1B75EB', '#85B8FF', '#AEDCFF']
    const colorsCountries4 = ['#1B75EB', '#85B8FF', '#AEDCFF', '#003096']
    const colorsCountries5 = [
        '#1B75EB',
        '#85B8FF',
        '#AEDCFF',
        '#003096',
        '#467bed'
    ]

    function getColorsCountries(countries: any) {
        switch (countries !== undefined && countries.length) {
            case 1:
                return colorsCountries1
            case 2:
                return colorsCountries2
            case 3:
                return colorsCountries3
            case 4:
                return colorsCountries4
            case 5:
                return colorsCountries5
            default:
                return colorsCountries5
        }
    }

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
                    c.country &&
                    translateCountryName(c.country, i18n.i18n.language),
                percentage: c.percentage
            }
        })

    const seriesCountries = returnsByCountry?.map((item: any) => {
        return Math.round(item.percentage)
    })

    const labelsCountries = translatedCountries?.map((item: any) => {
        return item.country
    })
    const chartOptionsCountries: ApexOptions = {
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
        colors: seriesCountries && getColorsCountries(seriesCountries),
        labels: labelsCountries && labelsCountries,
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
    return (
        <>
            {seriesCountries ? (
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
                                        <b>{rdvPercentage}%</b>
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
                            <DonutInside>
                                <p className="truncate text-lg font-medium leading-6">
                                    Countries
                                </p>
                                {seriesCountries && (
                                    <Chart
                                        options={chartOptionsCountries}
                                        series={seriesCountries}
                                        type="donut"
                                        width="300"
                                    />
                                )}
                                <div>
                                    {seriesCountries &&
                                        seriesCountries.map((dataset, i) => (
                                            <>
                                                <div
                                                    className="mx-4 grid grid-cols-2 py-1"
                                                    key={i}
                                                >
                                                    <div className="flex items-center">
                                                        <LegendDot
                                                            className="h-4 w-4 rounded-full"
                                                            backgroundColor={
                                                                seriesCountries &&
                                                                getColorsCountries(
                                                                    seriesCountries
                                                                )[i]
                                                            }
                                                        />
                                                        <p className="ml-4 truncate">
                                                            {labelsCountries &&
                                                                labelsCountries[
                                                                    i
                                                                ]}
                                                        </p>
                                                    </div>

                                                    <p
                                                        className="text-right"
                                                        color="text.secondary"
                                                    >
                                                        {dataset}%
                                                    </p>
                                                </div>
                                                {i ===
                                                seriesCountries.length -
                                                    1 ? null : (
                                                    <hr />
                                                )}
                                            </>
                                        ))}
                                </div>
                            </DonutInside>
                            <DonutInside>
                                <p className="truncate text-lg font-medium leading-6">
                                    Compensation methods
                                </p>
                                <Chart
                                    options={chartOptions}
                                    series={series}
                                    type="donut"
                                    width="300"
                                />
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
                                                        backgroundColor={
                                                            colors[i]
                                                        }
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
                                            {i === series.length - 1 ? null : (
                                                <hr />
                                            )}
                                        </>
                                    ))}
                                </div>
                            </DonutInside>
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
const LegendDot = styled.div<BoxProps>`
    background-color: ${(p) => p.backgroundColor};
    border-color: ${(p) => p.borderColor};
`
const DonutInside = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`
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
