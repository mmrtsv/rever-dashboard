import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { toast } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'
import { createReview, resetReviewsApiCalls } from '@/redux/api/reviewsApi'
import { OpsapiModelsLineItemReview } from '@itsrever/dashboard-api'

export function useCreateReviews(manualReview: boolean, onlyDeclined: boolean) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const createReviewCall = useAppSelector(
        (state) => state.reviewsApi.createReview
    )

    const createNewReview = (
        processId: string,
        reviews: OpsapiModelsLineItemReview[]
    ) => {
        dispatch(
            createReview({
                createLineItemReviewsInput: {
                    process_id: processId,
                    reviews
                }
            })
        )
    }

    useEffect(() => {
        if (createReviewCall.loading === 'succeeded') {
            if (manualReview) {
                if (onlyDeclined) {
                    toast({
                        variant: 'info',
                        text: t('review_toast.success1')
                    })
                    toast({
                        variant: 'info',
                        text: t('review_toast.only_declined')
                    })
                } else {
                    toast({
                        variant: 'success',
                        text: t('review_toast.success1')
                    })
                    toast({
                        variant: 'success',
                        text: t('review_toast.success2')
                    })
                }
            } else {
                toast({
                    variant: 'info',
                    text: t('review_toast.success1')
                })
            }
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } else if (createReviewCall.loading === 'failed') {
            toast({
                variant: 'error',
                text: t('review_toast.error')
            })
        }
        dispatch(resetReviewsApiCalls())
    }, [createReviewCall.loading, createReviewCall.response])

    return { createNewReview }
}

export default useCreateReviews
