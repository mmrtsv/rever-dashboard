import React, { useState } from 'react'
import styled from 'styled-components'
import { useTheme } from '@itsrever/design-system'
import { Tabs, Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { ProductsTab, SummaryTab } from '.'
import NumbersIcon from '@mui/icons-material/Numbers'
import { getDate } from '@/utils'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'

interface TabsProps {
    process: ModelsPublicReturnProcess
}

const ProcessIsland: React.FC<TabsProps> = ({ process }) => {
    const { t, i18n } = useTranslation()
    const theme = useTheme()
    const [currentTab, setCurrentTab] = useState(0)

    const returnDate =
        process?.started_at?.seconds &&
        getDate(process?.started_at?.seconds, i18n.language)

    return (
        <div className="col-span-2">
            <MainDiv>
                <div className="flex items-center pt-6 pl-6">
                    <NumbersIcon
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <p className="text-grey-1 ml-2 text-lg">
                        {t('summary.order')}
                    </p>
                </div>

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
                                }`
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
                            label={t('process_details_tabs.summary')}
                        />
                    </Tabs>
                </TabsDiv>
            </MainDiv>
            <InfoDiv>
                {currentTab === 0 ? (
                    <ProductsTab process={process} />
                ) : (
                    <SummaryTab process={process} />
                )}
            </InfoDiv>
        </div>
    )
}

export default ProcessIsland

const MainDiv = styled.div`
    background-color: #eee;
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    display: flex;
`

const TabsDiv = styled.div`
    width: fit-content;
    border-bottom: solid 1px #ccc;
    margin-left: auto;
    height: fit-content;
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
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
`

const Title = styled.h6`
    display: flex;
    align-items: center;
`
