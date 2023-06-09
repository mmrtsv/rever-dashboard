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
            if (typeof data !== 'number' && data) {
                return data.url
            }
            if (data === 404) {
                toast({
                    text: t('toast_errors.presigned_url_404'),
                    variant: 'error'
                })
                return
            }
            toast({
                text: t('toast_errors.presigned_url_500'),
                variant: 'error'
            })
        }
    }

    return { findPresignedURLLabel }
}
