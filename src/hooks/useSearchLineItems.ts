import { useEffect } from 'react'
import { getLineItems } from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchLineItems(pageNum: number, freeText: string) {
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
}

export default useSearchLineItems
