import { useEffect } from 'react'
import { getLineItem } from '../redux/api/lineItemsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchLineItem(reverID: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    useEffect(() => {
        if (token)
            dispatch(
                getLineItem({
                    lineItemsId: reverID
                })
            )
    }, [reverID, token])
}

export default useSearchLineItem
