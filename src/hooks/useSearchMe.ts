import { useEffect } from 'react'
import { getMe, resetAuthApiCalls } from '../redux/api/userApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {
    setEcommerceList,
    setGroup
} from '../redux/features/generalData/generalDataSlice'

export function useSearchMe() {
    const dispatch = useAppDispatch()

    const authApiMe = useAppSelector((store) => store.userApi.getMe)
    const callMe = () => {
        dispatch(getMe())
    }

    useEffect(() => {
        if (authApiMe.loading === 'succeeded') {
            dispatch(setGroup(authApiMe.response.user?.group))
            dispatch(setEcommerceList(authApiMe.response.user?.ecommerces))
            dispatch(resetAuthApiCalls())
        } else if (authApiMe.loading === 'failed') {
            dispatch(resetAuthApiCalls())
        }
    }, [authApiMe.response, authApiMe.loading])

    return { callMe }
}

export default useSearchMe
