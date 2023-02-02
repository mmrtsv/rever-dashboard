import { useEffect } from 'react'
import { getLineItems, resetLineItemsApiCalls } from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchLineItems(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    const lineItemsApiLineItems = useAppSelector(
        (store) => store.lineItemsApi.getLineItems
    )

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getLineItems({
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getLineItems({
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            }
    }, [pageNum, limit, freeText, selectedEcommerce, token])

    useEffect(() => {
        dispatch(resetLineItemsApiCalls())
    }, [lineItemsApiLineItems.response, lineItemsApiLineItems.loading])
}

export default useSearchLineItems
