import React from 'react'
import styled from 'styled-components'
import { useTheme } from '@itsrever/design-system'
import { Tabs, Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface TabProps {
    currentTab: number
    setCurrentTab: (tab: number) => void
}

const ProcessDetailTabs: React.FC<TabProps> = ({
    currentTab,
    setCurrentTab
}) => {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
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
                    label={t('order_details.products')}
                />
                <Tab
                    style={{
                        color: `${
                            currentTab === 1
                                ? theme.colors.primary.dark
                                : theme.colors.grey[1]
                        }`
                    }}
                    label={t('order_details.order_details')}
                />
                <Tab
                    style={{
                        color: `${
                            currentTab === 2
                                ? theme.colors.primary.dark
                                : theme.colors.grey[1]
                        }`
                    }}
                    label={t('order_details.summary')}
                />
            </Tabs>
        </TabsDiv>
    )
}

export default ProcessDetailTabs

const TabsDiv = styled.div`
    border-bottom: solid 1px #ccc;
    background-color: #eee;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
`
