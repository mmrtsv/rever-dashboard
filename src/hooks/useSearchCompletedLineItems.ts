import { useEffect } from 'react'
import {
    getCompletedLineItems,
    resetLineItemsApiCalls
} from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchCompletedLineItems(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    const lineItemsApiCompletedLineItems = useAppSelector(
        (store) => store.lineItemsApi.getCompletedLineItems
    )

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
        dispatch(resetLineItemsApiCalls())
    }, [
        lineItemsApiCompletedLineItems.response,
        lineItemsApiCompletedLineItems.loading
    ])
}

export default useSearchCompletedLineItems
