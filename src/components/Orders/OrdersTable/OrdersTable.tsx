import React, { useState } from 'react'
import styled from 'styled-components'
import OrderListItem from '../OrderListItem'
import FilterComponent from '../../FilterComponent/FilterComponent'
import useSearchLineItems from '../../../hooks/useSearchLineItems'
import { useTranslation } from 'react-i18next'
import Pagination from '../PaginationComponent/Pagination'

const OrdersTable = () => {
    const { t } = useTranslation()

    const [ActualPage, setActualPage] = useState<number>(0)
    const [Limit, setLimit] = useState<number>(25)
    const [FreeText, setFreeText] = useState<string>('')
    const { LineItems, totalLineItems } = useSearchLineItems(
        ActualPage,
        Limit,
        FreeText
    )
    const MaxPage = totalLineItems && Math.ceil(totalLineItems / Limit)

    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            setActualPage(0)
        }
        setFreeText(freeText)
    }

    return (
        <Main
            data-testid="OrdersTable"
            className="flex min-h-full w-full grow flex-col overflow-x-auto"
        >
            <FilterComponent
                freeText={FreeText}
                setFreeText={handleChangeFreeText}
            />
            {FreeText.length > 2 && (
                <span className="text-xs">
                    {totalLineItems
                        ? t('orders_table.results') + totalLineItems
                        : t('orders_table.results') + '0'}
                </span>
            )}
            {LineItems && LineItems.length > 0 && (
                <div className="mt-8">
                    {LineItems.map((lineItem) => {
                        return (
                            <OrderListItem
                                lineItem={lineItem}
                                key={lineItem.rever_id}
                            />
                        )
                    })}
                </div>
            )}
            <Pagination
                actualPage={ActualPage}
                setActualPage={setActualPage}
                limit={Limit}
                setLimit={setLimit}
                maxPage={MaxPage ?? 0}
            />
        </Main>
    )
}

const Main = styled.div`
    width: 100%;
    max-height: 0vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    display: inline-block;
    padding: 1rem;
`

export default OrdersTable
