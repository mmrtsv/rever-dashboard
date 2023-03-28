import { useEffect } from 'react'
import { getReturnMetrics } from '../redux/api/reportsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchReturnMetrics(from: string, to: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const ecommerceId = selectedEcommerce
        ? selectedEcommerce
        : ecommercesList
        ? ecommercesList[0]
        : ''

    useEffect(() => {
        if (token && ecommerceId && from && to)
            dispatch(
                getReturnMetrics({
                    ecommerceId: ecommerceId,
                    from: from,
                    to: to
                })
            )
    }, [to, from, ecommerceId, token, dispatch])
}

export default useSearchReturnMetrics
