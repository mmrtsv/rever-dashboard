import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getCountries, resetLocationsApiCalls } from '@/redux/api/locationsApi'

function useCountries() {
    const dispatch = useAppDispatch()

    const locationsApi = useAppSelector((store) => store.locationsApi)

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    useEffect(() => {
        if (locationsApi.countries.loading === 'succeeded') {
            dispatch(resetLocationsApiCalls())
        } else if (locationsApi.countries.loading === 'failed') {
            dispatch(resetLocationsApiCalls())
            const error = locationsApi.countries.error
            console.warn(error)
        }
    }, [locationsApi.countries.response, locationsApi.countries.loading])
}

export default useCountries
