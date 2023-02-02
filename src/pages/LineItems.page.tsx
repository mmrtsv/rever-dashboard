import React from 'react'
import PageComponent from '../components/PageComponent'
import { useState } from 'react'
import styled from 'styled-components'
import FilterComponent from '../components/SearchComponent'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'
import { TopBarLI } from '@/components/LineItems'
import LineItemsTable from '@/components/LineItems/LineItemsTable/LineItemsTable'
import { useAppSelector } from '@/redux/hooks'

function Orders() {
    const { t } = useTranslation()
    const theme = useTheme()

    const [currentTab, setCurrentTab] = useState(0)
    const [ActualPage, setActualPage] = useState<number>(0)
    const [FreeText, setFreeText] = useState<string>('')

    const totalLineItems = useAppSelector(
        (store) => store.lineItemsApi.getLineItems.response.rowcount
    )

    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            setActualPage(0)
        }
        setFreeText(freeText)
    }

    return (
        <PageComponent>
            <div className="flex h-full flex-col">
                <TopBarLI
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    setActualPage={setActualPage}
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
                                    {totalLineItems
                                        ? t('orders_table.results') +
                                          totalLineItems
                                        : t('orders_table.results') + '0'}
                                </span>
                            </>
                        )}
                    </div>

                    <LineItemsTable
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
