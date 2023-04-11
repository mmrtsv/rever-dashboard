import React, { useRef } from 'react'
import { TextField } from '@mui/material'
import { Modal, Button, toast } from '@itsrever/design-system'
import { useTheme } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { addOrUpdateReview } from '../ProductsTab'
import { OpsapiModelsLineItemReview } from '@itsrever/dashboard-api'

interface ModalProps {
    index: number
    isOpen: boolean
    setIsOpen: (open: number) => void
    reviews: OpsapiModelsLineItemReview[]
    setReviews: (reviews: OpsapiModelsLineItemReview[]) => void
    setReviewOpen: (open: number) => void
    lineItemId: string
}

const RejectReasonModal: React.FC<ModalProps> = ({
    index,
    isOpen,
    setIsOpen,
    reviews,
    setReviews,
    setReviewOpen,
    lineItemId
}) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const rejectReason = useRef<HTMLInputElement>(null)

    const handleCloseModal = () => {
        addOrUpdateReview(
            reviews,
            setReviews,
            setReviewOpen,
            index,
            lineItemId,
            ''
        )
        setIsOpen(-1)
        toast({
            variant: 'error',
            text: 'You must provide a reason to decline'
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (rejectReason.current?.value) {
            addOrUpdateReview(
                reviews,
                setReviews,
                setReviewOpen,
                index,
                lineItemId,
                'DECLINED',
                rejectReason.current.value
            )
        } else {
            toast({
                variant: 'error',
                text: 'You must provide a reason to decline'
            })
        }
        setIsOpen(-1)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            closeButton={true}
        >
            <StyledForm onSubmit={handleSubmit}>
                <h6 className="mb-4 text-xl">{t('reject_modal.title')}</h6>
                <TextField
                    inputRef={rejectReason}
                    fullWidth
                    InputProps={{
                        sx: {
                            height: 200
                        }
                    }}
                    sx={{
                        marginBottom: '1rem',
                        '& label.Mui-focused': {
                            color: theme.colors.common.black
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: theme.colors.primary.dark
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: theme.colors.primary.dark,
                                backgroundColor: 'transparent'
                            },
                            '&:hover fieldset': {
                                borderColor: theme.colors.primary.dark
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.colors.primary.dark,
                                backgroundColor: 'transparent'
                            }
                        }
                    }}
                />
                <Button type="submit">{t('reject_modal.submit')}</Button>
            </StyledForm>
        </Modal>
    )
}

export default RejectReasonModal

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0rem 1rem 0rem 1rem;
    width: 300px;
`
