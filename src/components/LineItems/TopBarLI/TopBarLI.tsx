import React from 'react'
import { Tabs, Tab } from '@mui/material'
import styled from 'styled-components'
import { useTheme } from '@itsrever/design-system'
import { useAppSelector } from '@/redux/hooks'
import device from '@/utils/device'
import { useTranslation } from 'react-i18next'
interface TopBarProps {
    currentTab: number
    setCurrentTab: (tab: number) => void
}

const TopBarLI: React.FC<TopBarProps> = ({ currentTab, setCurrentTab }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const totalLineItems = useAppSelector(
        (store) => store.lineItemsApi.getLineItems.response.rowcount
    )
    const totalPending = useAppSelector(
        (store) => store.lineItemsApi.getPendingLineItems.response.rowcount
    )
    const totalCompleted = useAppSelector(
        (store) => store.lineItemsApi.getCompletedLineItems.response.rowcount
    )

    return (
        <HigherDiv data-testid="TopBar">
            <TabsDiv>
                <h3 className="text-primary-dark  mb-4 mr-2 text-3xl md:text-4xl lg:text-5xl">
                    <b>{t('topbar_items.returned_items')}</b>
                </h3>
                <Tabs
                    orientation={'horizontal'}
                    value={currentTab}
                    onChange={(_, i) => setCurrentTab(i)}
                    TabIndicatorProps={{
                        sx: {
                            background: theme.colors.primary.dark
                        }
                    }}
                >
                    <Tab
                        style={{
                            color: `${
                                currentTab === 0
                                    ? theme.colors.primary.dark
                                    : theme.colors.grey[1]
                            }`
                        }}
                        label={t('topbar_items.all')}
                        iconPosition="end"
                        icon={
                            <SmallTotalDiv
                                style={{
                                    backgroundColor: `${
                                        currentTab === 0
                                            ? 'aliceblue'
                                            : theme.colors.grey[5]
                                    }`
                                }}
                            >
                                <p
                                    className="text-xs"
                                    style={{
                                        color: `${
                                            currentTab === 0
                                                ? theme.colors.primary.light
                                                : theme.colors.grey[0]
                                        }`
                                    }}
                                >
                                    {totalLineItems &&
                                        '(' + totalLineItems + ')'}
                                </p>
                            </SmallTotalDiv>
                        }
                    />
                    <Tab
                        style={{
                            color: `${
                                currentTab === 1
                                    ? theme.colors.primary.dark
                                    : theme.colors.grey[1]
                            }`
                        }}
                        iconPosition="end"
                        icon={
                            <SmallTotalDiv
                                style={{
                                    backgroundColor: `${
                                        currentTab === 1
                                            ? 'aliceblue'
                                            : theme.colors.grey[5]
                                    }`
                                }}
                            >
                                <p
                                    className="text-xs"
                                    style={{
                                        color: `${
                                            currentTab === 1
                                                ? theme.colors.primary.light
                                                : theme.colors.grey[0]
                                        }`
                                    }}
                                >
                                    {totalPending && '(' + totalPending + ')'}
                                </p>
                            </SmallTotalDiv>
                        }
                        label={t('topbar_items.pending')}
                    />
                    <Tab
                        style={{
                            color: `${
                                currentTab === 2
                                    ? theme.colors.primary.dark
                                    : theme.colors.grey[1]
                            }`
                        }}
                        iconPosition="end"
                        icon={
                            <SmallTotalDiv
                                style={{
                                    backgroundColor: `${
                                        currentTab === 2
                                            ? 'aliceblue'
                                            : theme.colors.grey[5]
                                    }`
                                }}
                            >
                                <p
                                    className="text-xs"
                                    style={{
                                        color: `${
                                            currentTab === 2
                                                ? theme.colors.primary.light
                                                : theme.colors.grey[0]
                                        }`
                                    }}
                                >
                                    {totalCompleted &&
                                        '(' + totalCompleted + ')'}
                                </p>
                            </SmallTotalDiv>
                        }
                        label={t('topbar_items.received')}
                    />
                </Tabs>
            </TabsDiv>
        </HigherDiv>
    )
}

export default TopBarLI

const TabsDiv = styled.div``

const HigherDiv = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #ccc;
    padding: 0rem 0rem 0rem 1rem;
    background-color: #fff;
    @media ${device.md} {
        padding: 2rem 1rem 0rem 1rem;
    }

    @media ${device.lg} {
        padding: 3rem 1rem 0rem 1rem;
    }
`

const SmallTotalDiv = styled.div`
    @media (max-width: 599px) {
        display: none;
    }
    border-radius: 0.5rem;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem;
`
