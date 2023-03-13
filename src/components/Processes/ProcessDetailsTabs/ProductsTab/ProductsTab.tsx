import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
    ModelsReturnLineItem,
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
import { ProcessSplitLineItem } from '@/components/LineItems'
import { createReview, resetReviewsApiCalls } from '@/redux/api/reviewsApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FormControl, TextField } from '@mui/material'
import { useTheme } from '@itsrever/design-system'

interface Review extends OpsapiModelsLineItemReview {
    index: number
}

interface ProductsProps {
    reviewMode: boolean
}

const ProductsTab: React.FC<ProductsProps> = ({ reviewMode }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const theme = useTheme()

    const responseProcess = useAppSelector(
        (store) => store.processesApi.getProcess.response.processes
    )
    const process =
        responseProcess && responseProcess?.length > 0
            ? responseProcess[0]
            : undefined

    // Map line items to print real items
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

    const createReviewStatus = useAppSelector(
        (state) => state.reviewsApi.createReview
    )

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
    useEffect(() => {
        if (createReviewStatus.loading === 'succeeded') {
            toast({
                variant: 'success',
                text: t('review_toast.success')
            })
            setTimeout(() => {
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
        reviewMode &&
            mappedProducts &&
            mappedProducts.map((item, index) => {
                item.product_return_reason === 'NOT_RECEIVED' &&
                    handleChange(item.rever_id, 'APPROVED', index)
            })
    }, [reviewMode])

    return (
        <ProductsBox data-testid="LineItems">
            <div className="p-8">
                <TitlesDiv>
                    <h6 className="text-grey-1 text-center">
                        <b>{t('order_details.image')}</b>
                    </h6>
                    <DissapearingH6L className="text-grey-1 col-span-2">
                        <b>{t('order_details.product_name')}</b>
                    </DissapearingH6L>
                    <h6 className="text-grey-1 text-center">
                        <b>{t('order_details.price')}</b>
                    </h6>
                    <h6 className="text-grey-1 text-center">
                        <b>{t('order_details.status')}</b>
                    </h6>
                </TitlesDiv>
                {mappedProducts &&
                    mappedProducts.map((lineItem, i) => {
                        return (
                            <ItemsDiv key={i}>
                                <div className="w-full md:max-w-[70%]">
                                    <ProcessSplitLineItem
                                        lineItem={lineItem}
                                        moneyFormat={
                                            process.currency_money_format ?? {}
                                        }
                                        returnStatus={process.return_status}
                                        lastKnownShippingStatus={
                                            process.last_known_shipping_status
                                        }
                                    />
                                </div>
                                {reviewMode &&
                                    lineItem.product_return_reason !=
                                        'NOT_RECEIVED' && (
                                        <>
                                            <MenuDiv>
                                                <SelectMenu
                                                    menuName="review"
                                                    label={t(
                                                        'order_details.review'
                                                    )}
                                                    defaultValue="Review"
                                                    onChange={(e) => {
                                                        handleChange(
                                                            lineItem.rever_id,
                                                            e.currentTarget
                                                                .value,
                                                            i,
                                                            e.currentTarget
                                                                .value ===
                                                                'DECLINED'
                                                                ? ''
                                                                : undefined
                                                        )
                                                    }}
                                                >
                                                    <SelectItem value="APPROVED">
                                                        {t(
                                                            'order_details.approve'
                                                        )}
                                                    </SelectItem>
                                                    <SelectItem value="DECLINED">
                                                        {t(
                                                            'order_details.decline'
                                                        )}
                                                    </SelectItem>
                                                    <SelectItem value="MISSING">
                                                        {t(
                                                            'order_details.missing'
                                                        )}
                                                    </SelectItem>
                                                </SelectMenu>
                                            </MenuDiv>
                                            <Modal
                                                isOpen={rejectModal}
                                                onRequestClose={() =>
                                                    setRejectModal(false)
                                                }
                                            >
                                                <FormControl
                                                    data-testid="reject"
                                                    sx={{ width: 550 }}
                                                >
                                                    <TextField
                                                        InputProps={{
                                                            disableUnderline:
                                                                true,
                                                            sx: {
                                                                height: 130
                                                            }
                                                        }}
                                                        sx={{
                                                            marginBottom:
                                                                '1rem',
                                                            '& label.Mui-focused':
                                                                {
                                                                    color: theme
                                                                        .colors
                                                                        .common
                                                                        .black
                                                                },
                                                            '& .MuiInput-underline:after':
                                                                {
                                                                    borderBottomColor:
                                                                        theme
                                                                            .colors
                                                                            .primary
                                                                            .dark
                                                                },
                                                            '& .MuiOutlinedInput-root':
                                                                {
                                                                    '& fieldset':
                                                                        {
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
                                                        {t(
                                                            'order_details.submit'
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </Modal>
                                        </>
                                    )}
                            </ItemsDiv>
                        )
                    })}
                {reviewMode && (
                    <div className="mt-4 flex w-full justify-center md:mt-8">
                        <Button
                            disabled={reviews.length !== mappedProducts?.length}
                            onClick={() => handleSubmitReview()}
                        >
                            {t('order_details.submit')}
                        </Button>
                    </div>
                )}
            </div>
        </ProductsBox>
    )
}

export default ProductsTab

const TitlesDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    padding: 1rem;
    @media ${device.md} {
        max-width: 70%;
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
`

const ProductsBox = styled.div`
    height: 100%;
`

const DissapearingH6L = styled.h6`
    @media (max-width: 899px) {
        display: none;
    }
`

const MenuDiv = styled.div`
    height: fit-content;
    width: fit-content;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    margin-left: 2rem;
`

const ItemsDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
