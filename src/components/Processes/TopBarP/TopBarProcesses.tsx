import React, { useEffect, useState } from 'react'
import SelectorComponent from '../../SelectorComponent/SelectorComponent'
import { Tabs, Tab } from '@mui/material'
import styled from 'styled-components'
import { useTheme } from '@itsrever/design-system'
import { useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

interface TopBarProps {
    setActualPage: (page: number) => void
    currentTab: number
    setCurrentTab: (tab: number) => void
}

const TopBar: React.FC<TopBarProps> = ({
    setActualPage,
    currentTab,
    setCurrentTab
}) => {
    // Logic for tab texts
    const ecommerces = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const [refundTiming, setRefundTiming] = useState(0)
    function getSettings() {
        const options = {
            method: 'Get',
            url: 'https://api.byrever.com/v1/returns/settings',
            params: {
                slug: `${
                    ecommerces && ecommerces.length > 0 ? ecommerces[0] : ''
                }`
            }
        }
        axios
            .request(options)
            .then(function (response: any) {
                setRefundTiming(response.data.refund.timing)
            })
            .catch(function (error: any) {
                console.error(error)
            })
    }
    useEffect(() => {
        if (ecommerces && ecommerces.length > 0) {
            getSettings()
        }
    }, [ecommerces])

    const { t } = useTranslation()
    const theme = useTheme()

    const handleChangeSelectedEcommerce = () => {
        setActualPage(0)
    }

    const totalProcesses = useAppSelector(
        (store) => store.processesApi.getProcesses.response.rowcount
    )
    const totalPendingProcesses = useAppSelector(
        (store) => store.processesApi.getPendingProcesses.response.rowcount
    )
    const totalCompletedProcesses = useAppSelector(
        (store) => store.processesApi.getCompletedProcesses.response.rowcount
    )

    const handleChangeTab = (event: any, i: number) => {
        setCurrentTab(i)
        setActualPage(0)
    }

    return (
        <HigherDiv data-testid="TopBarProcesses">
            <div>
                <h3 className="text-primary-dark mb-4 text-5xl">
                    <b>{t('topbar_components.returns')}</b>
                </h3>
                <Tabs
                    value={currentTab}
                    onChange={handleChangeTab}
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
                        label={t('topbar_components.all')}
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
                                    {totalProcesses &&
                                        '(' + totalProcesses + ')'}
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
                        label={
                            refundTiming === 3
                                ? t('topbar_components.action_needed')
                                : t('topbar_components.in_progress')
                        }
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
                                    {totalPendingProcesses &&
                                        '(' + totalPendingProcesses + ')'}
                                </p>
                            </SmallTotalDiv>
                        }
                    />
                    <Tab
                        style={{
                            color: `${
                                currentTab === 2
                                    ? theme.colors.primary.dark
                                    : theme.colors.grey[1]
                            }`
                        }}
                        label={
                            refundTiming === 3
                                ? t('topbar_components.reviewed')
                                : t('topbar_components.completed')
                        }
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
                                    {totalCompletedProcesses &&
                                        '(' + totalCompletedProcesses + ')'}
                                </p>
                            </SmallTotalDiv>
                        }
                    />
                </Tabs>
            </div>
            <div>
                <SelectorComponent
                    handleChangeSelectedEcommerce={
                        handleChangeSelectedEcommerce
                    }
                />
            </div>
        </HigherDiv>
    )
}

export default TopBar

const HigherDiv = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #ccc;
    padding: 3rem 1rem 0rem 1rem;
    background-color: #fff;
`

const SmallTotalDiv = styled.div`
    @media (max-width: 899px) {
        display: none;
    }
    border-radius: 0.5rem;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem;
`
