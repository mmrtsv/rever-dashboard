import React, { useEffect } from 'react'
import PageComponent from '../components/PageComponent'
import { useState } from 'react'
import styled from 'styled-components'
import FilterComponent from '../components/SearchComponent'
import { TitlesGridLI, TopBarLI } from '@/components/LineItems'
import LineItemsTable from '@/components/LineItems/LineItemsTable/LineItemsTable'
import { useAppSelector } from '@/redux/hooks'
import {
    useSearchLineItems,
    useSearchPendingLineItems,
    useSearchCompletedLineItems,
    useSearchReviewRequiredLineItems
} from '@/hooks'

function LineItems() {
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
        setActualPageRevReq(0)
        setActualPageCompl(0)
    }

    const [currentTab, setCurrentTab] = useState(0)
    const [FreeText, setFreeText] = useState<string>('')

    // All items
    const [actualPage, setActualPage] = useState<number>(0)
    const LineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getLineItems.response
    )
    useSearchLineItems(actualPage, FreeText)

    // Pending to receive LI
    const [actualPagePending, setActualPagePending] = useState<number>(0)
    const PendingLineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getPendingLineItems.response
    )
    useSearchPendingLineItems(actualPagePending, FreeText)

    // Review required LI
    const [actualPageRevReq, setActualPageRevReq] = useState<number>(0)
    const RevReLineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getReviewRequiredLineItems.response
    )
    useSearchReviewRequiredLineItems(actualPageRevReq, FreeText)

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
                    <div className="w-fit pt-4">
                        <FilterComponent
                            freeText={FreeText}
                            setFreeText={handleChangeFreeText}
                            rowCount={LineItemsCall.rowcount}
                        />
                    </div>
                    <div data-testid="LineItemsTable">
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
                                actualPage={actualPageRevReq}
                                setActualPage={setActualPageRevReq}
                                lineItems={RevReLineItemsCall.line_items}
                                totalLineItems={RevReLineItemsCall.rowcount}
                            />
                        ) : currentTab === 3 ? (
                            <LineItemsTable
                                actualPage={actualPageCompl}
                                setActualPage={setActualPageCompl}
                                lineItems={CompletedLineItemsCall.line_items}
                                totalLineItems={CompletedLineItemsCall.rowcount}
                            />
                        ) : null}
                    </div>
                </Main>
            </div>
        </PageComponent>
    )
}

export default LineItems

const Main = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
    background-color: #eee;
    padding: 0rem 2rem 1rem 2rem;
`
