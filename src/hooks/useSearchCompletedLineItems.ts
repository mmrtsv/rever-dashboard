import { useEffect } from 'react'
import { getCompletedLineItems } from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchCompletedLineItems(pageNum: number, freeText: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)
    const limit = useAppSelector((store) => store.generalData.limitPagination)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
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
}

export default useSearchCompletedLineItems
