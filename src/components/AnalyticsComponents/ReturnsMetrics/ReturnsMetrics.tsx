import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import RDVIcon from '@mui/icons-material/AccountBalance'
import SalesIcon from '@mui/icons-material/Paid'
import ArrowUpIcon from '@mui/icons-material/TrendingUp'
import { useSearchReturnMetrics } from '../../../hooks/useSearchReturnMetrics'
import { formatPrice } from '../../../utils'
import moment from 'moment'
import useSearchReturnTypesByDay from '@/hooks/useSearchReturnTypesByDay'
import device from '@/utils/device'
import DonutComponent from '../DonutComponent/DonutComponent'
import countries from '../../../utils/countries.json'
import useSearchReturnsByCountry from '@/hooks/useSearchReturnsByCountry'
import { useTranslation } from 'react-i18next'
import NotFoundReports from '@/assets/Lottie/ComingSoon/NotFoundReports'
import LineChartComponent from '../LineChartComponent/LineChartComponent'

interface ReturnsMetricsProps {
    currentPeriod: number
}

const ReturnsMetrics: React.FC<ReturnsMetricsProps> = ({ currentPeriod }) => {
    const { i18n } = useTranslation()
    const theme = useTheme()

    // Set up date ranges for the page
    const dateTo = moment().format('YYYY-MM-DD')
    const dateFrom =
        currentPeriod === 2
            ? moment().subtract(1, 'M').format('YYYY-MM-DD')
            : moment().subtract(7, 'd').format('YYYY-MM-DD')

    // Metrics shown && Compensation methods
    const { returnMetrics } = useSearchReturnMetrics(dateFrom, dateTo)

    const moneyFormat = returnMetrics && returnMetrics?.money_format
    const totalRdv =
        returnMetrics?.rdv &&
        moneyFormat &&
        formatPrice(returnMetrics.rdv, moneyFormat)
    const returns = returnMetrics && returnMetrics.Returns

    const labelsCompensations = [
        'Refunds',
        'Exchanges',
        'Original Payment Method',
        'Store Credit'
    ]

    let totalCompensation = 0
    const values =
        returnMetrics?.refunds_types &&
        Object.entries(returnMetrics.refunds_types).map(
            (refAmount: [string, number]) => {
                totalCompensation += refAmount[1]
                return refAmount[1] * 100
            }
        )
    const valuesCompensations = values?.map((v) =>
        Math.round(v / totalCompensation)
    )
    const RDVPercentage = valuesCompensations
        ? valuesCompensations[1] + valuesCompensations[3]
        : 0

    // Line Chart - Returns by day info
    const { returnTypesByDay } = useSearchReturnTypesByDay(dateFrom, dateTo)

    const itemsReturnedByDay =
        returnTypesByDay && returnTypesByDay.map((data) => data.item_count ?? 0)
    const datesOfReturns =
        returnTypesByDay &&
        returnTypesByDay.map((data) =>
            moment(data.date, 'YYYY-MM-DD').format('DD MMM')
        )

    // Countries info
    const { returnsByCountry } = useSearchReturnsByCountry(dateFrom, dateTo)
    const valuesCountries = returnsByCountry?.map((value) => {
        return Math.round(value.percentage ?? 0)
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
    const labelsCountries = translatedCountries?.map((data) => {
        return data.country ?? ''
    })

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
                    <LineChartComponent
                        title="Returned items"
                        values={itemsReturnedByDay ?? []}
                        days={datesOfReturns ?? []}
                    />
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

interface BoxProps {
    borderColor?: string
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
