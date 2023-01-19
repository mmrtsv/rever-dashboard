import { useEffect } from 'react'
import { getMe, resetAuthApiCalls } from '../redux/api/userApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchMe() {
    const dispatch = useAppDispatch()

    const authApiMe = useAppSelector((store) => store.userApi.getMe)
    const callMe = () => {
        dispatch(getMe())
    }

    useEffect(() => {
        dispatch(resetAuthApiCalls())
    }, [authApiMe.response, authApiMe.loading])

    return { callMe }
}

export default useSearchMe
