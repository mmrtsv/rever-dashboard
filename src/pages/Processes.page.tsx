import React, { useEffect } from 'react'
import PageComponent from '@/components/PageComponent'
import { useState } from 'react'
import styled from 'styled-components'
import FilterComponent from '../components/SearchComponent'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'
import TopBar from '../components/Processes/TopBarP/TopBarProcesses'
import ProcessesTable from '@/components/Processes/ProcessesTable/ProcessesTable'
import { useAppSelector } from '@/redux/hooks'
import axios from 'axios'

function Orders() {
    const { t } = useTranslation()
    const theme = useTheme()

    const [currentTab, setCurrentTab] = useState(0)
    const [ActualPage, setActualPage] = useState<number>(0)
    const [FreeText, setFreeText] = useState<string>('')
    const totalOrders = useAppSelector(
        (store) => store.processesApi.getProcesses.response.rowcount
    )

    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            setActualPage(0)
        }
        setFreeText(freeText)
    }
    //Logic for current timings of the process
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

    return (
        <PageComponent>
            <div className="flex h-full flex-col">
                <TopBar
                    setActualPage={setActualPage}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    refundTiming={refundTiming}
                />
                <Main className="flex flex-col overflow-x-auto">
                    <div className="w-fit pt-4 pl-8">
                        <FilterComponent
                            freeText={FreeText}
                            setFreeText={handleChangeFreeText}
                        />
                        {FreeText.length > 2 && (
                            <>
                                <hr
                                    className="mt-2"
                                    style={{
                                        border: `0.5px solid ${theme.colors.grey[2]}`
                                    }}
                                />
                                <span className="text-xs">
                                    {totalOrders
                                        ? t('orders_table.results') +
                                          totalOrders
                                        : t('orders_table.results') + '0'}
                                </span>
                            </>
                        )}
                    </div>
                    <ProcessesTable
                        refundTiming={refundTiming}
                        currentTab={currentTab}
                        freeText={FreeText}
                        actualPage={ActualPage}
                        setActualPage={setActualPage}
                    />
                </Main>
            </div>
        </PageComponent>
    )
}

export default Orders

const Main = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
    background-color: #eee;
`
