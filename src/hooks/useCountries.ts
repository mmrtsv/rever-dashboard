import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import { getCountries, resetLocationsApiCalls } from '@/redux/api/locationsApi'
import { toast } from '@itsrever/design-system'

function useCountries() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const locationsApi = useAppSelector((store) => store.locationsApi)
    const [loadedC, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    useEffect(() => {
        if (locationsApi.countries.loading === 'succeeded') {
            dispatch(resetLocationsApiCalls())
            setLoaded(true)
        } else if (locationsApi.countries.loading === 'failed') {
            dispatch(resetLocationsApiCalls())
            const error = locationsApi.countries.error
            console.warn(error)
            toast({
                text: t('toast_errors.country_500'),
                variant: 'error'
            })
        }
    }, [locationsApi.countries.response, locationsApi.countries.loading])

    return { loadedC }
}

export default useCountries
