import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import {
    getCompletedLineItems,
    resetLineItemsApiCalls
} from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchCompletedLineItems(
    pageNum: number,
    freeText: string,
    selectedEcommerce?: string
) {
    const dispatch = useAppDispatch()

    const lineItemsApiCompletedLineItems = useAppSelector(
        (store) => store.lineItemsApi.getCompletedLineItems
    )
    const [completedLineItems, setCompletedLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const totalCompleted = lineItemsApiCompletedLineItems.response.rowcount

    useEffect(() => {
        if (freeText.length > 2) {
            dispatch(
                getCompletedLineItems({
                    ecommerceId: selectedEcommerce,
                    freetext: freeText,
                    offset: pageNum * 10,
                    limit: 10
                })
            )
        } else if (freeText.length === 0) {
            dispatch(
                getCompletedLineItems({
                    ecommerceId: selectedEcommerce,
                    offset: pageNum * 10,
                    limit: 10
                })
            )
        }
    }, [pageNum, freeText, selectedEcommerce])

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
