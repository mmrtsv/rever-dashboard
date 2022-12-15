import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { getLineItem, resetLineItemsApiCalls } from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchLineItem(reverID: string) {
    const dispatch = useAppDispatch()

    const lineItemsApiLineItem = useAppSelector(
        (store) => store.lineItemsApi.getLineItem
    )
    const [LineItem, setLineItem] = useState<
        ModelsPublicReturnLineItem | undefined
    >()

    useEffect(() => {
        dispatch(
            getLineItem({
                id: reverID
            })
        )
    }, [reverID])

    useEffect(() => {
        if (lineItemsApiLineItem.loading === 'succeeded') {
            setLineItem(lineItemsApiLineItem.response.Process)
            dispatch(resetLineItemsApiCalls())
        } else if (lineItemsApiLineItem.loading === 'failed') {
            dispatch(resetLineItemsApiCalls())
        }
    }, [lineItemsApiLineItem.response, lineItemsApiLineItem.loading])

    return { LineItem }
}

export default useSearchLineItem
