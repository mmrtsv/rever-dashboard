import React, { useEffect } from 'react'
import PageComponent from '../components/PageComponent'
import { useState } from 'react'
import styled from 'styled-components'
import FilterComponent from '../components/SearchComponent'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'
import { TitlesGridLI, TopBarLI } from '@/components/LineItems'
import LineItemsTable from '@/components/LineItems/LineItemsTable/LineItemsTable'
import { useAppSelector } from '@/redux/hooks'
import {
    useSearchLineItems,
    useSearchPendingLineItems,
    useSearchCompletedLineItems
} from '@/hooks'

function Orders() {
    const { t } = useTranslation()
    const theme = useTheme()

    const Limit = useAppSelector((store) => store.generalData.limitPagination)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    useEffect(() => {
        resetPages()
    }, [selectedEcommerce])
    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            resetPages()
        }
        setFreeText(freeText)
    }

    function resetPages() {
        setActualPage(0)
        setActualPagePending(0)
        setActualPageCompl(0)
    }

    const [currentTab, setCurrentTab] = useState(0)
    const [FreeText, setFreeText] = useState<string>('')

    // All items
    const [actualPage, setActualPage] = useState<number>(0)
    const LineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getLineItems.response
    )
    useSearchLineItems(actualPage, Limit, FreeText)

    // Pending to receive LI
    const [actualPagePending, setActualPagePending] = useState<number>(0)
    const PendingLineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getPendingLineItems.response
    )
    useSearchPendingLineItems(actualPagePending, Limit, FreeText)

    // Received Line Items
    const [actualPageCompl, setActualPageCompl] = useState<number>(0)
    const CompletedLineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getCompletedLineItems.response
    )
    useSearchCompletedLineItems(actualPageCompl, FreeText)

    return (
        <PageComponent>
            <div className="flex h-full flex-col">
                <TopBarLI
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
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
                                    {LineItemsCall.rowcount
                                        ? t('orders_table.results') +
                                          LineItemsCall.rowcount
                                        : t('orders_table.results') + '0'}
                                </span>
                            </>
                        )}
                    </div>
                    <TableDiv data-testid="LineItemsTable">
                        <TitlesGridLI />
                        {currentTab === 0 ? (
                            <LineItemsTable
                                actualPage={actualPage}
                                setActualPage={setActualPage}
                                lineItems={LineItemsCall.line_items}
                                totalLineItems={LineItemsCall.rowcount}
                            />
                        ) : currentTab === 1 ? (
                            <LineItemsTable
                                actualPage={actualPagePending}
                                setActualPage={setActualPagePending}
                                lineItems={PendingLineItemsCall.line_items}
                                totalLineItems={PendingLineItemsCall.rowcount}
                            />
                        ) : currentTab === 2 ? (
                            <LineItemsTable
                                actualPage={actualPageCompl}
                                setActualPage={setActualPageCompl}
                                lineItems={CompletedLineItemsCall.line_items}
                                totalLineItems={CompletedLineItemsCall.rowcount}
                            />
                        ) : null}
                    </TableDiv>
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

const TableDiv = styled.div`
    margin: 0rem 2rem 2rem 2rem;
    border-radius: 0.5rem;
    border: 1px solid #eee;
`
