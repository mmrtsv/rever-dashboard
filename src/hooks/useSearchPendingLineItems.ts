import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import {
    getPendingLineItems,
    resetLineItemsApiCalls
} from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchPendingLineItems(pageNum: number, freeText: string) {
    const dispatch = useAppDispatch()

    const lineItemsApiPendingLineItems = useAppSelector(
        (store) => store.lineItemsApi.getPendingLineItems
    )
    const [pendingLineItems, setPendingLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const totalPending = lineItemsApiPendingLineItems.response.rowcount

    useEffect(() => {
        if (freeText.length > 2) {
            dispatch(
                getPendingLineItems({
                    freetext: freeText,
                    offset: pageNum * 10,
                    limit: 10
                })
            )
        } else if (freeText.length === 0) {
            dispatch(
                getPendingLineItems({
                    offset: pageNum * 10,
                    limit: 10
                })
            )
        }
    }, [pageNum, freeText])

    useEffect(() => {
        if (lineItemsApiPendingLineItems.loading === 'succeeded') {
            if (
                pendingLineItems &&
                lineItemsApiPendingLineItems.response.line_items &&
                pageNum > 0
            ) {
                setPendingLineItems(
                    pendingLineItems.concat(
                        lineItemsApiPendingLineItems.response.line_items
                    )
                )
            } else
                setPendingLineItems(
                    lineItemsApiPendingLineItems.response.line_items
                )
            dispatch(resetLineItemsApiCalls())
        } else if (lineItemsApiPendingLineItems.loading === 'failed') {
            dispatch(resetLineItemsApiCalls())
        }
    }, [
        lineItemsApiPendingLineItems.response,
        lineItemsApiPendingLineItems.loading
    ])

    return { pendingLineItems, totalPending }
}

export default useSearchPendingLineItems
