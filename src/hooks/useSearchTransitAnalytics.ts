import { useEffect } from 'react'
import { getTransitAnalytics } from '@/redux/api/reportsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import useCountries from './useCountries'

export function useSearchTransitAnalytics() {
    useCountries()
    const countries = useAppSelector((s) => s.locationsApi.countries.response)

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
        if (token && ecommerceId && countries && countries.length > 0)
            dispatch(getTransitAnalytics({ ecommerceId }))
    }, [ecommerceId, token, countries, dispatch])
}

export default useSearchTransitAnalytics
