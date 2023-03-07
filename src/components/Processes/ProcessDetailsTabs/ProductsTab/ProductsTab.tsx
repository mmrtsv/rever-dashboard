import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
    ModelsPublicReturnProcess,
    ModelsReturnLineItem,
    ModelsLineItemReview,
    OpsapiModelsLineItemReview
} from '@itsrever/dashboard-api'
import device from '@/utils/device'
import {
    SelectMenu,
    SelectItem,
    Modal,
    Button,
    toast
} from '@itsrever/design-system'
import SuccessAnimation from '@/assets/Lottie/ComingSoon/Success'
import { ProcessSplitLineItem } from '@/components/LineItems'
import { createReview, resetReviewsApiCalls } from '@/redux/api/reviewsApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    ShippingStatuses,
    RefundTimings,
    ReturnStatus
} from '@/redux/features/generalData/generalDataSlice'
import { FormControl, Input, InputLabel, TextField } from '@mui/material'
import { useTheme } from '@itsrever/design-system'

interface Review extends OpsapiModelsLineItemReview {
    index: number
}

interface ProductsProps {
    process?: ModelsPublicReturnProcess
}

const ProductsTab: React.FC<ProductsProps> = ({ process }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const createReviewStatus = useAppSelector(
        (state) => state.reviewsApi.createReview
    )
    const customer = process?.customer

    const [ModalOpen, setModalOpen] = useState(false)

    const products =
        process && process.line_items?.filter((item) => item.type === 'product')

    const mappedProducts =
        products &&
        products.flatMap((lineItem) => {
            const items: Array<ModelsReturnLineItem> = []
            if (lineItem.quantity && lineItem.reviews) {
                for (let i = 0; i < lineItem.quantity; i++) {
                    items.push({
                        ...lineItem,
                        reviews: lineItem.reviews[i]
                            ? [lineItem.reviews[i]]
                            : []
                    })
                }
            }
            return items
        })
    const originalPM = mappedProducts?.some(
        (p) => p.refund_payment_method === 2
    )
    const needsReview =
        process?.last_known_shipping_status === ShippingStatuses.InWarehouse &&
        process?.ReviewFlow === 'MANUAL' &&
        process.status === ReturnStatus.Running &&
        originalPM

    //This logic is not correct. It should be:
    // const needsReview = process?.review_available === true
    const [reviews, setReviews] = useState<Array<Review>>([])

    function addOrUpdateReview(
        reviews: Review[],
        line_item_id: string,
        status: string,
        index: number,
        reject_reason?: string
    ) {
        let reviewExists = false
        const updatedReviews = reviews.map((review) => {
            if (review.index === index) {
                reviewExists = true
                if (reject_reason) {
                    return { ...review, status, reject_reason }
                } else {
                    return { ...review, status }
                }
            }
            return review
        })
        if (!reviewExists) {
            if (reject_reason) {
                updatedReviews.push({
                    line_item_id,
                    status,
                    index,
                    reject_reason
                })
            } else {
                updatedReviews.push({
                    line_item_id,
                    status,
                    index
                })
            }
        }
        setReviews(updatedReviews)
    }

    const [rejectModal, setRejectModal] = useState(false)
    const [rejectReview, setRejectReview] = useState<Review | undefined>()
    const [rejectReason, setRejectReason] = useState('')
    const handleSubmitReject = () => {
        rejectReview &&
            handleChange(
                rejectReview?.line_item_id,
                'DECLINED',
                rejectReview?.index,
                rejectReason
            )
        setRejectModal(false)
        setRejectReason('')
        setRejectReview(undefined)
    }

    const handleChange = (
        id: string | undefined | null,
        value: string,
        index: number,
        reject_reason?: string
    ) => {
        if (value === 'DECLINED' && !reject_reason) {
            setRejectModal(true)
            setRejectReview({
                line_item_id: id,
                status: value,
                index,
                reject_reason: ''
            })
        } else if (value === 'DECLINED' && reject_reason) {
            id && addOrUpdateReview(reviews, id, value, index, reject_reason)
        } else {
            id && addOrUpdateReview(reviews, id, value, index)
        }
    }
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        if (createReviewStatus.loading === 'succeeded') {
            toast({
                variant: 'success',
                text: t('review_toast.success')
            })
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate('/')
            }, 2000)
            dispatch(resetReviewsApiCalls())
        } else if (createReviewStatus.loading === 'failed') {
            toast({
                variant: 'error',
                text: t('review_toast.error')
            })
            dispatch(resetReviewsApiCalls())
        }
    }, [createReviewStatus.loading, createReviewStatus.response])

    const handleSubmitReview = () => {
        const newReviews = reviews.map((item) => {
            const { index, ...rest } = item
            return rest
        })
        dispatch(
            createReview({
                createLineItemReviewsInput: {
                    process_id: process?.process_id,
                    reviews: newReviews
                }
            })
        )
    }

    useEffect(() => {
        needsReview &&
            mappedProducts &&
            mappedProducts.map((item, index) => {
                item.product_return_reason === 'NOT_RECEIVED' &&
                    handleChange(item.rever_id, 'APPROVED', index)
            })
    }, [needsReview])

    return (
        <ProductsBox data-testid="LineItems" className=" p-8">
            {!needsReview && (
                <div className="grid w-full grid-cols-3 p-4 md:grid-cols-4 lg:grid-cols-6">
                    <h6 className="text-grey-1 text-center">
                        <b>{t('order_details.order_id')}</b>
                    </h6>
                    <h6 className="text-grey-1 text-center">
                        <b> {t('order_details.image')}</b>
                    </h6>

                    <DissapearingH6L className="text-grey-1 col-span-2">
                        <b> {t('order_details.product_name')}</b>
                    </DissapearingH6L>
                    <DissapearingH6M className="text-grey-1">
                        <b> {t('order_details.customer')}</b>
                    </DissapearingH6M>
                    <h6 className="text-grey-1 text-center">
                        <b> {t('order_details.status')}</b>
                    </h6>
                </div>
            )}
            {mappedProducts &&
                mappedProducts.map((lineItem, i) => {
                    return (
                        <ItemsDiv key={i}>
                            <ProcessSplitLineItem
                                lineItem={lineItem}
                                orderStatus={process.status}
                                reviewFlow={process.ReviewFlow}
                                lastKnownShippingStatus={
                                    process.last_known_shipping_status
                                }
                                printedOrderId={
                                    process.customer_printed_order_id
                                }
                                customerName={
                                    customer?.first_name +
                                    ' ' +
                                    customer?.last_name
                                }
                                first={i === 0}
                                last={i === mappedProducts.length - 1}
                            />
                            {needsReview &&
                            lineItem.product_return_reason ===
                                'NOT_RECEIVED' ? (
                                <></>
                            ) : needsReview &&
                              lineItem.product_return_reason !==
                                  'NOT_RECEIVED' ? (
                                <>
                                    <MenuDiv>
                                        <SelectMenu
                                            menuName="review"
                                            label={t('order_details.review')}
                                            color="black"
                                            defaultValue="Review"
                                            onChange={(e) => {
                                                handleChange(
                                                    lineItem.rever_id,
                                                    e.currentTarget.value,
                                                    i,
                                                    e.currentTarget.value ===
                                                        'DECLINED'
                                                        ? ''
                                                        : undefined
                                                )
                                            }}
                                            style={{ zIndex: 1000 }}
                                        >
                                            <SelectItem
                                                style={{ zIndex: 1000 }}
                                                value="APPROVED"
                                            >
                                                {t('order_details.approve')}
                                            </SelectItem>
                                            <SelectItem
                                                style={{ zIndex: 1000 }}
                                                value="DECLINED"
                                            >
                                                {t('order_details.decline')}
                                            </SelectItem>
                                            <SelectItem
                                                style={{ zIndex: 1000 }}
                                                value="MISSING"
                                            >
                                                {t('order_details.missing')}
                                            </SelectItem>
                                        </SelectMenu>
                                    </MenuDiv>
                                    <ModalDiv>
                                        <ReviewDiv
                                            onClick={() => setModalOpen(true)}
                                        >
                                            {t('order_details.review')}
                                        </ReviewDiv>
                                        <Modal
                                            isOpen={ModalOpen}
                                            onRequestClose={() =>
                                                setModalOpen(false)
                                            }
                                        >
                                            <OptionDiv
                                                onClick={() => {
                                                    handleChange(
                                                        lineItem.rever_id,
                                                        'APPROVED',
                                                        i
                                                    )
                                                }}
                                            >
                                                <p>
                                                    {t('order_details.approve')}
                                                </p>
                                            </OptionDiv>
                                            <OptionDiv
                                                onClick={() => {
                                                    handleChange(
                                                        lineItem.rever_id,
                                                        'DECLINED',
                                                        i
                                                    )
                                                }}
                                            >
                                                <p>
                                                    {t('order_details.decline')}
                                                </p>
                                            </OptionDiv>
                                            <OptionDiv
                                                onClick={() => {
                                                    handleChange(
                                                        lineItem.rever_id,
                                                        'MISSING',
                                                        i
                                                    )
                                                }}
                                            >
                                                <p>
                                                    {t('order_details.missing')}
                                                </p>
                                            </OptionDiv>
                                        </Modal>
                                    </ModalDiv>
                                    <div>
                                        <Modal
                                            isOpen={rejectModal}
                                            onRequestClose={() =>
                                                setRejectModal(false)
                                            }
                                        >
                                            {' '}
                                            <FormControl
                                                data-testid="reject"
                                                sx={{ width: 550 }}
                                            >
                                                <TextField
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        sx: { height: 130 }
                                                    }}
                                                    sx={{
                                                        marginBottom: '1rem',
                                                        '& label.Mui-focused': {
                                                            color: theme.colors
                                                                .common.black
                                                        },
                                                        '& .MuiInput-underline:after':
                                                            {
                                                                borderBottomColor:
                                                                    theme.colors
                                                                        .primary
                                                                        .dark
                                                            },
                                                        '& .MuiOutlinedInput-root':
                                                            {
                                                                '& fieldset': {
                                                                    borderColor:
                                                                        theme
                                                                            .colors
                                                                            .primary
                                                                            .dark,
                                                                    backgroundColor:
                                                                        'transparent'
                                                                },
                                                                '&:hover fieldset':
                                                                    {
                                                                        borderColor:
                                                                            theme
                                                                                .colors
                                                                                .primary
                                                                                .dark
                                                                    },
                                                                '&.Mui-focused fieldset':
                                                                    {
                                                                        borderColor:
                                                                            theme
                                                                                .colors
                                                                                .primary
                                                                                .dark,
                                                                        backgroundColor:
                                                                            'transparent'
                                                                    }
                                                            }
                                                    }}
                                                    label={t(
                                                        'order_details.decline_reason'
                                                    )}
                                                    value={rejectReason}
                                                    onChange={(e) =>
                                                        setRejectReason(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Button
                                                    disabled={
                                                        rejectReason === ''
                                                    }
                                                    onClick={() =>
                                                        handleSubmitReject()
                                                    }
                                                >
                                                    {t('order_details.submit')}
                                                </Button>
                                            </FormControl>
                                        </Modal>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </ItemsDiv>
                    )
                })}
            {success && <SuccessAnimation />}
            {needsReview && (
                <div className="mt-4 flex w-full justify-center md:mt-8">
                    <Button
                        disabled={reviews.length !== mappedProducts?.length}
                        onClick={() => handleSubmitReview()}
                    >
                        {t('order_details.submit')}
                    </Button>
                </div>
            )}
        </ProductsBox>
    )
}

export default ProductsTab

const ProductsBox = styled.div`
    background-color: #eee;
    height: 100%;
`

const DissapearingH6L = styled.h6`
    text-align: center;
    @media (max-width: 899px) {
        display: none;
    }
`

const DissapearingH6M = styled.h6`
    text-align: center;
    @media (max-width: 599px) {
        display: none;
    }
`

const OptionDiv = styled.div`
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const ReviewDiv = styled.div`
    height: fit-content;
    width: fit-content;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0.5rem;
    @media ${device.md} {
        padding: 1rem;
    }
`

const ModalDiv = styled.div`
    display: flex;
    justify-content: center;
    @media ${device.lg} {
        display: none;
    }
`

const MenuDiv = styled.div`
    @media (max-width: 899px) {
        display: none;
    }
    @media ${device.lg} {
        height: fit-content;
        width: fit-content;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        background-color: #fff;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);
        margin-left: 1rem;
    }
`

const ItemsDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`
