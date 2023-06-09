import {
    LogisticsApi,
    LogisticsApiGetPresignedURLLabelRequest
} from '@itsrever/rever-api'
import { axiosInstance } from './apiConfiguration'

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
        console.error(error)
    }
}
