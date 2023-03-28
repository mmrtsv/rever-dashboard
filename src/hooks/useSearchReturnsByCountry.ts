import { useEffect } from 'react'
import { getReturnsByCountry } from '../redux/api/reportsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import useCountries from './useCountries'

export function useSearchReturnsByCountry(from: string, to: string) {
    // Countries
    useCountries()
    const countries = useAppSelector((s) => s.locationsApi.countries.response)

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
        if (
            token &&
            ecommerceId &&
            from &&
            to &&
            countries &&
            countries.length > 0
        )
            dispatch(
                getReturnsByCountry({
                    ecommerceId: ecommerceId,
                    from: from,
                    to: to
                })
            )
    }, [to, from, ecommerceId, token, dispatch, countries])
}

export default useSearchReturnsByCountry
