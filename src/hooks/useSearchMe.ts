import { useEffect } from 'react'
import { getMe, resetAuthApiCalls } from '../redux/api/userApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchMe() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)
    const authApiMe = useAppSelector((store) => store.userApi.getMe)

    useEffect(() => {
        if (token) dispatch(getMe())
    }, [token])

    useEffect(() => {
        dispatch(resetAuthApiCalls())
    }, [authApiMe.response, authApiMe.loading])
}

export default useSearchMe
