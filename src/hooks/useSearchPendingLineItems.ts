import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import {
    getPendingLineItems,
    resetLineItemsApiCalls
} from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchPendingLineItems(
    pageNum: number,
    limit: number,
    freeText: string,
    selectedEcommerce?: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const lineItemsApiPendingLineItems = useAppSelector(
        (store) => store.lineItemsApi.getPendingLineItems
    )
    const [pendingLineItems, setPendingLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const totalPending = lineItemsApiPendingLineItems.response.rowcount

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getPendingLineItems({
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getPendingLineItems({
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            }
    }, [pageNum, freeText, selectedEcommerce, token, limit])

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
