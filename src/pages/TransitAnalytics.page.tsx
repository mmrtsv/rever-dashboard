import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import device from '@/utils/device'
import BarChart from '@/components/AnalyticsComponents/BarChartComponent/BarChart'
import DonutComponent from '@/components/AnalyticsComponents/DonutComponent/DonutComponent'
import { useSearchTransitAnalytics } from '@/hooks'
import { useAppSelector } from '@/redux/hooks'
import { formatPrice } from '@/utils'
import { useTranslation } from 'react-i18next'

function TransitAnalytics() {
    const { t } = useTranslation()

    const transitAnalytics = useAppSelector(
        (store) => store.reportsApi.getTransitAnalytics.response
    )
    const totalItemsReturned =
        transitAnalytics.summary?.total_number_of_items ?? 0
    const valueInTransit = formatPrice(
        transitAnalytics.summary?.aggregated_total_amount ?? 0,
        transitAnalytics.summary?.money_format ?? {}
    )

    const labelsStatus = transitAnalytics.status_stats?.map((stat) => {
        return t(`transit_analytics.${stat.return_status}`)
    })
    const valuesStatus = transitAnalytics.status_stats?.map((stat) => {
        return stat.total_number_of_items ?? 0
    })
    const valuesStatusPercent =
        valuesStatus?.map((v) => {
            if (totalItemsReturned)
                return Math.round((v / totalItemsReturned) * 100)
            else return 0
        }) ?? []

    const labelsCountry =
        transitAnalytics.country_stats?.map((stat) => {
            return stat.name ?? ''
        }) ?? []
    const valuesCountry =
        transitAnalytics.country_stats?.map((stat) => {
            return stat.total_number_of_items ?? 0
        }) ?? []

    const labelsDuration = transitAnalytics.interval_stats?.map((stat) => {
        return t(`transit_analytics.${stat.interval}`)
    })
    const valuesDuration =
        transitAnalytics.interval_stats?.map((stat) => {
            return stat.total_number_of_items ?? 0
        }) ?? []

    useSearchTransitAnalytics()

    return (
        <PageComponent>
            <MainDiv>
                <Container>
                    <TopDiv>
                        <Card>
                            <Title>
                                <b>{totalItemsReturned}</b>
                            </Title>
                            <Subtitle>
                                {t('transit_analytics.items_transit')}
                            </Subtitle>
                        </Card>
                        <Card className="row-span-2">
                            <DonutComponent
                                title="Statuses"
                                labels={labelsStatus}
                                values={valuesStatusPercent}
                            />
                        </Card>

                        <Card>
                            <Title>
                                <b>{valueInTransit}</b>
                            </Title>
                            <Subtitle>value in transit</Subtitle>
                        </Card>
                    </TopDiv>
                    <ChartsDiv>
                        <Card>
                            <BarChart
                                title={t('transit_analytics.title_by_country')}
                                labels={labelsCountry}
                                values={valuesCountry}
                            />
                        </Card>
                        <Card>
                            <BarChart
                                title={t('transit_analytics.title_by_time')}
                                labels={labelsDuration}
                                values={valuesDuration}
                            />
                        </Card>
                    </ChartsDiv>
                </Container>
            </MainDiv>
        </PageComponent>
    )
}

export default TransitAnalytics

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem 2rem 1rem;
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const Container = styled.div`
    flex-grow: 1;
    width: 100%;
    @media ${device.xl} {
        max-width: 80%;
    }
`

const ChartsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`

const TopDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
`

const Subtitle = styled.h6`
    color: #66768e;
    font-size: 12px;
    @media ${device.lg} {
        font-size: 14px;
    }
    @media ${device.xl} {
        font-size: 16px;
    }
`

const Title = styled.h3`
    color: ${(p) => p.color};
    font-size: 24px;
    @media ${device.lg} {
        font-size: 36px;
    }
`

const Card = styled.div`
    /* border: 1px solid;
    border-color: rgb(204, 204, 204); */
    border-radius: 0.5rem;
    text-align: center;
    background-color: #fff;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
