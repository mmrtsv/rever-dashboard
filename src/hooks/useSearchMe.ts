import { useEffect } from 'react'
import { getMe, resetAuthApiCalls } from '../redux/api/userApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchMe() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const authApiMe = useAppSelector((store) => store.userApi.getMe)
    const callMe = () => {
        if (token) dispatch(getMe())
    }

    useEffect(() => {
        dispatch(resetAuthApiCalls())
    }, [authApiMe.response, authApiMe.loading])

    return { callMe }
}

export default useSearchMe
