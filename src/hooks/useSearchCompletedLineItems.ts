import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import {
    getCompletedLineItems,
    resetLineItemsApiCalls
} from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchCompletedLineItems(
    pageNum: number,
    limit: number,
    freeText: string,
    selectedEcommerce?: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const lineItemsApiCompletedLineItems = useAppSelector(
        (store) => store.lineItemsApi.getCompletedLineItems
    )
    const [completedLineItems, setCompletedLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const totalCompleted = lineItemsApiCompletedLineItems.response.rowcount

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getCompletedLineItems({
                        ecommerceId: selectedEcommerce,
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getCompletedLineItems({
                        ecommerceId: selectedEcommerce,
                        offset: pageNum * limit,
                        limit: limit
                    })
                )
            }
    }, [pageNum, freeText, selectedEcommerce, token, limit])

    useEffect(() => {
        if (lineItemsApiCompletedLineItems.loading === 'succeeded') {
            if (
                completedLineItems &&
                lineItemsApiCompletedLineItems.response.line_items &&
                pageNum > 0
            ) {
                setCompletedLineItems(
                    completedLineItems.concat(
                        lineItemsApiCompletedLineItems.response.line_items
                    )
                )
            } else
                setCompletedLineItems(
                    lineItemsApiCompletedLineItems.response.line_items
                )
            dispatch(resetLineItemsApiCalls())
        } else if (lineItemsApiCompletedLineItems.loading === 'failed') {
            dispatch(resetLineItemsApiCalls())
        }
    }, [
        lineItemsApiCompletedLineItems.response,
        lineItemsApiCompletedLineItems.loading
    ])

    return { completedLineItems, totalCompleted }
}

export default useSearchCompletedLineItems
