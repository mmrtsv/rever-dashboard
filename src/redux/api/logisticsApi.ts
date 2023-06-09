import {
    LogisticsApi,
    LogisticsApiGetPresignedURLLabelRequest
} from '@itsrever/rever-api'
import { axiosInstance } from './apiConfiguration'
import { AxiosError } from 'axios'

const logisticsApi = new LogisticsApi(undefined, undefined, axiosInstance)

export async function getPresignedURLLabel(
    args: LogisticsApiGetPresignedURLLabelRequest
) {
    const { processId } = args
    try {
        const getPresignedLabelURLResponse =
            await logisticsApi.getPresignedURLLabel({ processId })
        return getPresignedLabelURLResponse.data
    } catch (error) {
        const err = error as AxiosError
        console.error(err)
        return err.response?.status
    }
}
