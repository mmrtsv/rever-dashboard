import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { getLineItems, resetLineItemsApiCalls } from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchLineItems(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()

    const lineItemsApiLineItems = useAppSelector(
        (store) => store.lineItemsApi.getLineItems
    )
    const [LineItems, setLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const totalLineItems = lineItemsApiLineItems.response.rowcount

    useEffect(() => {
        if (freeText.length > 2) {
            dispatch(
                getLineItems({
                    freetext: freeText,
                    offset: pageNum * limit,
                    limit: limit
                })
            )
        } else if (freeText.length === 0) {
            dispatch(
                getLineItems({
                    offset: pageNum * limit,
                    limit: limit
                })
            )
        }
    }, [pageNum, limit, freeText])

    useEffect(() => {
        if (lineItemsApiLineItems.loading === 'succeeded') {
            setLineItems(lineItemsApiLineItems.response.line_items)
            dispatch(resetLineItemsApiCalls())
        } else if (lineItemsApiLineItems.loading === 'failed') {
            dispatch(resetLineItemsApiCalls())
        }
    }, [lineItemsApiLineItems.response, lineItemsApiLineItems.loading])

    return { LineItems, totalLineItems }
}

export default useSearchLineItems
