import { getPresignedURLLabel } from '@/redux/api/logisticsApi'
import { useAppSelector } from '@/redux/hooks'
import { toast } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'

export function usePresignedURLLabel() {
    const { t } = useTranslation()
    const token = useAppSelector((state) => state.userApi.token)

    async function findPresignedURLLabel(processId: string) {
        if (token) {
            const data = await getPresignedURLLabel({ processId })
            if (data) {
                return data.url
            }
            toast({
                text: t('toast_errors.presigned_url'),
                variant: 'error'
            })
        }
    }

    return { findPresignedURLLabel }
}
