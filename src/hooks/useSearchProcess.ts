import { useEffect } from 'react'
import { getProcess, resetProcessesApiCalls } from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchProcess(processID: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const processesApiGetProcess = useAppSelector(
        (store) => store.processesApi.getProcess
    )

    useEffect(() => {
        if (token)
            dispatch(
                getProcess({
                    processId: processID
                })
            )
    }, [processID, token])

    useEffect(() => {
        dispatch(resetProcessesApiCalls())
    }, [processesApiGetProcess.response, processesApiGetProcess.loading])
}

export default useSearchProcess
