import { useState, useEffect } from 'react'
import { getGroupCommmerces, resetGroupsApiCalls } from '../redux/api/groupsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchGroupCommerces() {
    const dispatch = useAppDispatch()

    const groupsApiCommerces = useAppSelector(
        (store) => store.groupsApi.getGroupCommerces
    )

    const [Group, setGroup] = useState<string>()
    const [Ecommerces, setEcommerces] = useState<string[]>()

    useEffect(() => {
        dispatch(getGroupCommmerces())
    }, [])

    useEffect(() => {
        if (groupsApiCommerces.loading === 'succeeded') {
            setGroup(groupsApiCommerces.response.group)
            setEcommerces(groupsApiCommerces.response.ecommerces)
            dispatch(resetGroupsApiCalls())
        } else if (groupsApiCommerces.loading === 'failed') {
            dispatch(resetGroupsApiCalls())
        }
    }, [groupsApiCommerces.response, groupsApiCommerces.loading])

    return { Group, Ecommerces }
}

export default useSearchGroupCommerces
