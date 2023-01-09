import { useEffect } from 'react'
import { getGroupCommmerces, resetGroupsApiCalls } from '../redux/api/groupsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {
    setEcommerceList,
    setGroup
} from '../redux/features/generalData/generalDataSlice'

export function useSearchGroupCommerces() {
    const dispatch = useAppDispatch()

    const groupsApiCommerces = useAppSelector(
        (store) => store.groupsApi.getGroupCommerces
    )

    const callGroupCommerces = () => {
        dispatch(getGroupCommmerces())
    }

    useEffect(() => {
        if (groupsApiCommerces.loading === 'succeeded') {
            dispatch(setGroup(groupsApiCommerces.response.group))
            dispatch(setEcommerceList(groupsApiCommerces.response.ecommerces))
            dispatch(resetGroupsApiCalls())
        } else if (groupsApiCommerces.loading === 'failed') {
            dispatch(resetGroupsApiCalls())
        }
    }, [groupsApiCommerces.response, groupsApiCommerces.loading])

    return { callGroupCommerces }
}

export default useSearchGroupCommerces
