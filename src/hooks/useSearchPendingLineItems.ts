import { useEffect } from 'react'
import {
    getPendingLineItems,
    resetLineItemsApiCalls
} from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchPendingLineItems(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    const lineItemsApiPendingLineItems = useAppSelector(
        (store) => store.lineItemsApi.getPendingLineItems
    )

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
        dispatch(resetLineItemsApiCalls())
    }, [
        lineItemsApiPendingLineItems.response,
        lineItemsApiPendingLineItems.loading
    ])
}

export default useSearchPendingLineItems
