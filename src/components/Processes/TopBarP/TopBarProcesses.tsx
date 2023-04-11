import React from 'react'
import { Tabs, Tab } from '@mui/material'
import styled from 'styled-components'
import { useTheme } from '@itsrever/design-system'
import { useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'

interface TopBarProps {
    currentTab: number
    setCurrentTab: (tab: number) => void
}

const TopBar: React.FC<TopBarProps> = ({ currentTab, setCurrentTab }) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const totalProcesses = useAppSelector(
        (store) => store.processesApi.getProcesses.response.rowcount
    )
    const totalPendingProcesses = useAppSelector(
        (store) => store.processesApi.getPendingProcesses.response.rowcount
    )
    const totalCompletedProcesses = useAppSelector(
        (store) => store.processesApi.getCompletedProcesses.response.rowcount
    )
    const totalActionRequiredProcesses = useAppSelector(
        (store) =>
            store.processesApi.getReviewRequiredProcesses.response.rowcount
    )

    return (
        <HigherDiv data-testid="TopBarProcesses">
            <div>
                <Tabs
                    value={currentTab}
                    onChange={(_, i) => {
                        setCurrentTab(i)
                    }}
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
                        label={t('topbar_processes.all')}
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
                    {totalPendingProcesses && totalPendingProcesses > 0 ? (
                        <Tab
                            style={{
                                color: `${
                                    currentTab === 1
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[1]
                                }`
                            }}
                            label={t('topbar_processes.in_progress')}
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
                                        {'(' + totalPendingProcesses + ')'}
                                    </p>
                                </SmallTotalDiv>
                            }
                        />
                    ) : (
                        <div />
                    )}
                    {totalActionRequiredProcesses &&
                    totalActionRequiredProcesses > 0 ? (
                        <Tab
                            style={{
                                color: `${
                                    currentTab === 2
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[1]
                                }`
                            }}
                            label={t('topbar_processes.action_needed')}
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
                                        {'(' +
                                            totalActionRequiredProcesses +
                                            ')'}
                                    </p>
                                </SmallTotalDiv>
                            }
                        />
                    ) : (
                        <div />
                    )}
                    {totalCompletedProcesses && totalCompletedProcesses > 0 ? (
                        <Tab
                            style={{
                                color: `${
                                    currentTab === 3
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[1]
                                }`
                            }}
                            label={t('topbar_processes.completed')}
                            iconPosition="end"
                            icon={
                                <SmallTotalDiv
                                    style={{
                                        backgroundColor: `${
                                            currentTab === 3
                                                ? 'aliceblue'
                                                : theme.colors.grey[5]
                                        }`
                                    }}
                                >
                                    <p
                                        className="text-xs"
                                        style={{
                                            color: `${
                                                currentTab === 3
                                                    ? theme.colors.primary.light
                                                    : theme.colors.grey[0]
                                            }`
                                        }}
                                    >
                                        {'(' + totalCompletedProcesses + ')'}
                                    </p>
                                </SmallTotalDiv>
                            }
                        />
                    ) : (
                        <div />
                    )}
                </Tabs>
            </div>
        </HigherDiv>
    )
}

export default TopBar

const HigherDiv = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #ccc;
    padding-left: 1rem;
    background-color: #fff;
`

const SmallTotalDiv = styled.div`
    border-radius: 0.5rem;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem;
`
