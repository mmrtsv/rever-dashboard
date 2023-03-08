import React from 'react'
import { LineItem } from '@/components/LineItems'
import Pagination from '@/components/PaginationComponent/Pagination'
import { useAppSelector } from '@/redux/hooks'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'

interface TableProps {
    actualPage: number
    setActualPage: (page: number) => void
    lineItems?: ModelsPublicReturnLineItem[]
    totalLineItems?: number
}

const LineItemsTable: React.FC<TableProps> = ({
    actualPage,
    setActualPage,
    lineItems,
    totalLineItems
}) => {
    const Limit = useAppSelector((store) => store.generalData.limitPagination)
    const MaxPage = totalLineItems && Math.ceil(totalLineItems / Limit)

    return (
        <>
            {lineItems &&
                lineItems.map((lineItem, i) => {
                    return (
                        <LineItem
                            lineItem={lineItem}
                            key={i}
                            first={i === 0}
                            last={i === lineItems.length - 1}
                        />
                    )
                })}
            <Pagination
                actualPage={actualPage}
                setActualPage={setActualPage}
                maxPage={MaxPage ?? 0}
            />
        </>
    )
}

export default LineItemsTable
