import { useEffect } from 'react'
import { getLineItem, resetLineItemsApiCalls } from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchLineItem(reverID: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const lineItemsApiLineItem = useAppSelector(
        (store) => store.lineItemsApi.getLineItem
    )

    useEffect(() => {
        if (token)
            dispatch(
                getLineItem({
                    lineItemsId: reverID
                })
            )
    }, [reverID, token])

    useEffect(() => {
        dispatch(resetLineItemsApiCalls())
    }, [lineItemsApiLineItem.response, lineItemsApiLineItem.loading])
}

export default useSearchLineItem
