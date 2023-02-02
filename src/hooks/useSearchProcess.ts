import { useState, useEffect } from 'react'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { getProcess, resetProcessesApiCalls } from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchOrder(processID: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const processesApiGetProcess = useAppSelector(
        (store) => store.processesApi.getProcess
    )
    const [Order, setOrder] = useState<ModelsPublicReturnProcess | undefined>()

    useEffect(() => {
        if (token)
            dispatch(
                getProcess({
                    processId: processID
                })
            )
    }, [processID, token])

    useEffect(() => {
        if (processesApiGetProcess.loading === 'succeeded') {
            setOrder(
                processesApiGetProcess.response.processes &&
                    processesApiGetProcess.response.processes[0]
            )
            dispatch(resetProcessesApiCalls())
        } else if (processesApiGetProcess.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesApiGetProcess.response, processesApiGetProcess.loading])

    return { Order }
}

export default useSearchOrder
