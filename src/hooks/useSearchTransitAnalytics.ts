import { useEffect } from 'react'
import { getTransitAnalytics } from '@/redux/api/reportsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchTransitAnalytics() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )

    const ecommerceId = selectedEcommerce
        ? selectedEcommerce
        : ecommercesList
        ? ecommercesList[0]
        : ''

    useEffect(() => {
        if (token && ecommerceId) dispatch(getTransitAnalytics({ ecommerceId }))
    }, [ecommerceId, token])
}

export default useSearchTransitAnalytics
