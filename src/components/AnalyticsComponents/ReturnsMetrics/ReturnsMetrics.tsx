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
import { moreThan } from '@/utils'
import DonutComponent from '../DonutComponent/DonutComponent'
import useSearchReturnsByCountry from '@/hooks/useSearchReturnsByCountry'
import { useTranslation } from 'react-i18next'
import LineChartComponent from '../LineChartComponent/LineChartComponent'
import { useAppSelector } from '@/redux/hooks'

interface ReturnsMetricsProps {
    currentPeriod: number
}

const ReturnsMetrics: React.FC<ReturnsMetricsProps> = ({ currentPeriod }) => {
    const { t } = useTranslation()
    const theme = useTheme()

    // Set up date ranges for the page
    const dateTo = moment().format('YYYY-MM-DD')
    const dateFrom =
        currentPeriod === 2
            ? moment().subtract(1, 'M').format('YYYY-MM-DD')
            : moment().subtract(7, 'd').format('YYYY-MM-DD')

    // Metrics shown && Compensation methods
    const returnMetrics = useAppSelector(
        (store) => store.reportsApi.getReturnsMetrics.response
    )
    useSearchReturnMetrics(dateFrom, dateTo)

    const moneyFormat = returnMetrics && returnMetrics?.money_format
    const totalRdv =
        returnMetrics?.rdv &&
        moneyFormat &&
        formatPrice(returnMetrics.rdv, moneyFormat)
    const returns = returnMetrics && returnMetrics.Returns

    const labelsCompensations = [
        t('returns_analytics.refunds'),
        t('returns_analytics.exchanges'),
        t('returns_analytics.opm'),
        t('returns_analytics.store_credit')
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
    const returnTypesByDay = useAppSelector(
        (store) => store.reportsApi.getReturnTypesByDay.response
    )
    useSearchReturnTypesByDay(dateFrom, dateTo)

    let itemsReturnedByDay: number[] = []
    let datesOfReturns: string[] = []
    if (returnTypesByDay.length > 0) {
        itemsReturnedByDay = returnTypesByDay.map(
            (data) => data.item_count ?? 0
        )
        datesOfReturns = returnTypesByDay.map((data) =>
            moment(data.date, 'YYYY-MM-DD').format('DD MMM')
        )
    }

    // Countries info
    const countries = useAppSelector((s) => s.locationsApi.countries.response)
    useSearchReturnsByCountry(dateFrom, dateTo)
    const returnsByCountry = useAppSelector(
        (store) => store.reportsApi.getReturnsByCountry.response
    )
    let valuesCountries: number[] = []
    let labelsCountries: string[] = []
    if (returnsByCountry && returnsByCountry.length > 0) {
        valuesCountries = returnsByCountry.map((value) => {
            return Math.round(value.percentage ?? 0)
        })
        if (countries) {
            labelsCountries = returnsByCountry.map((info) => {
                const country = countries.find((c) => c.iso === info.country)
                return info.country === 'OTHER'
                    ? t('returns_analytics.others')
                    : country?.nicename ?? info.country ?? ''
            })
        }
    }

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
                                    <Title color={theme.colors.primary.dark}>
                                        <b>{returns}</b>
                                    </Title>
                                    <Subtitle>
                                        {t('returns_analytics.title_returns')}
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
                                    <Title color={theme.colors.primary.dark}>
                                        <b>{RDVPercentage}%</b>
                                    </Title>
                                    <Subtitle>
                                        {t('returns_analytics.title_rdv')}
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
                                        >
                                            <b>{totalRdv}</b>
                                        </Title>
                                    </div>

                                    <Subtitle>
                                        {t('returns_analytics.title_sales')}
                                    </Subtitle>
                                </div>
                            </div>
                        </ReverSuccessBox>
                    </TopInfo>
                    <LineChartComponent
                        title={t('returns_analytics.title_returned_items')}
                        values={itemsReturnedByDay ?? []}
                        days={datesOfReturns ?? []}
                    />
                    <CompensationsDiv>
                        <DonutBox borderColor={theme.colors.grey[3]}>
                            {returnsByCountry && labelsCountries.length > 0 && (
                                <DonutComponent
                                    title={t(
                                        'returns_analytics.title_countries'
                                    )}
                                    labels={labelsCountries}
                                    values={valuesCountries}
                                />
                            )}
                            {returnMetrics?.refunds_types && (
                                <DonutComponent
                                    title={t(
                                        'returns_analytics.title_compensations'
                                    )}
                                    labels={labelsCompensations}
                                    values={valuesCompensations}
                                />
                            )}
                        </DonutBox>
                    </CompensationsDiv>
                </ReturnsDiv>
            ) : (
                <div>
                    <Title color={theme.colors.primary.dark} className="mt-20">
                        No returns in the period
                    </Title>
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
    @media ${moreThan.md} {
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

    @media ${moreThan.md} {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }
`

interface IconProps {
    color: string
}

const Subtitle = styled.p`
    text-align: center;
`
const Title = styled.h3<IconProps>`
    color: ${(p) => p.color};
    text-align: center;
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
    @media ${moreThan.md} {
        padding: 0.55rem;
        margin-bottom: 0rem;
    }
    @media ${moreThan.lg} {
        padding: 0.85rem;
        margin-bottom: 0rem;
    }
    @media ${moreThan.xl} {
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
