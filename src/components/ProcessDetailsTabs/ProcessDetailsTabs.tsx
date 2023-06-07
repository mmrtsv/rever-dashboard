import React, { useState } from 'react'
import styled from 'styled-components'
import { useTheme } from '@itsrever/design-system'
import { Tabs, Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { DetailsTab, ProductsTab, SummaryTab } from '../ProcessDetailsTabs'

interface TabsProps {
    process: ModelsPublicReturnProcess
    reviewMode: boolean
}

const ProcessDetailTabs: React.FC<TabsProps> = ({ process, reviewMode }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <>
            <MainDiv>
                <TabsDiv>
                    <Tabs
                        value={currentTab}
                        onChange={(e, i) => setCurrentTab(i)}
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
                                }`,
                                borderTopLeftRadius: '2rem'
                            }}
                            label={t('process_details_tabs.products')}
                        />
                        <Tab
                            style={{
                                color: `${
                                    currentTab === 1
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[1]
                                }`
                            }}
                            label={t('process_details_tabs.order_details')}
                        />
                        <Tab
                            style={{
                                color: `${
                                    currentTab === 2
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[1]
                                }`
                            }}
                            label={t('process_details_tabs.summary')}
                        />
                    </Tabs>
                </TabsDiv>
            </MainDiv>
            <InfoDiv>
                {currentTab === 0 ? (
                    <ProductsTab process={process} reviewMode={reviewMode} />
                ) : currentTab === 1 ? (
                    <DetailsTab process={process} />
                ) : (
                    <SummaryTab process={process} />
                )}
            </InfoDiv>
        </>
    )
}

export default ProcessDetailTabs

const MainDiv = styled.div`
    background-color: #eee;
    width: 100%;
`

const TabsDiv = styled.div`
    background-color: #fff;
    border-bottom: solid 1px #ccc;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
`

const InfoDiv = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
    background-color: #fff;
`
