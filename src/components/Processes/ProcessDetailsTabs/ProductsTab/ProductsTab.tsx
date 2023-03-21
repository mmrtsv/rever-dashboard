import React, { useState } from 'react'
import styled from 'styled-components'
import {
    ModelsReturnLineItem,
    OpsapiModelsLineItemReview
} from '@itsrever/dashboard-api'
import LostIcon from '@mui/icons-material/SearchOff'
import ReturnedIcon from '@mui/icons-material/Cached'
import TitlesSplitLineItem from '@/components/LineItems/ProcessSplitLineItem/TitlesSplitLineItem/TitlesSplitLineItem'
import { SelectMenu, SelectItem, Button } from '@itsrever/design-system'
import { ProcessSplitLineItem } from '@/components/LineItems'
import { useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import { useCreateReviews } from '@/hooks'
import { useTheme } from '@itsrever/design-system'
import RejectReasonModal from './RejectReasonModal/RejectReasonModal'
import { RefundTimings } from '@/redux/features/generalData/generalDataSlice'

export interface Review extends OpsapiModelsLineItemReview {
    index: number
}

export function addOrUpdateReview(
    reviews: Review[],
    setReviews: (reviews: Review[]) => void,
    index: number,
    lineItemId: string,
    value: string,
    rejectReason?: string
) {
    const alreadyReviewed = reviews.some((r) => r.index === index)
    let newReview: Review = {
        line_item_id: lineItemId,
        status: value,
        index
    }
    if (rejectReason) newReview = { ...newReview, reject_reason: rejectReason }
    if (alreadyReviewed) {
        const updatedReviews = reviews.map((r) => {
            if (r.index === index) {
                return newReview
            }
            return r
        })
        setReviews(updatedReviews)
    } else {
        setReviews([
            ...reviews.slice(0, index),
            newReview,
            ...reviews.slice(index)
        ])
    }
}

interface ProductsProps {
    reviewMode: boolean
}

const ProductsTab: React.FC<ProductsProps> = ({ reviewMode }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const responseProcess = useAppSelector(
        (store) => store.processesApi.getProcess.response.processes
    )
    const process =
        responseProcess && responseProcess?.length > 0
            ? responseProcess[0]
            : undefined

    const products =
        process && process.line_items?.filter((item) => item.type === 'product')

    // Returned products
    const returnedProducts =
        products &&
        products.flatMap((lineItem) => {
            const items: Array<ModelsReturnLineItem> = []
            if (lineItem.quantity && lineItem.reviews) {
                for (let i = 0; i < lineItem.quantity; i++) {
                    if (lineItem.product_return_reason !== 'NOT_RECEIVED')
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

    // Not received products
    const notReceivedProducts =
        products &&
        products.flatMap((lineItem) => {
            const items: Array<ModelsReturnLineItem> = []
            if (lineItem.quantity && lineItem.reviews) {
                for (let i = 0; i < lineItem.quantity; i++) {
                    if (lineItem.product_return_reason === 'NOT_RECEIVED')
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

    const [reviews, setReviews] = useState<Array<Review>>([])
    const [rejectModalOpen, setRejectModalOpen] = useState(-1)

    const manualReview = process?.ReviewFlow === 'MANUAL'
    const onlyDeclined =
        notReceivedProducts?.length === 0 &&
        !reviews.some((r) => r.status === 'APPROVED')

    const handleChange = (
        lineItemId: string | undefined | null,
        value: string,
        index: number
    ) => {
        if (value.includes('DECLINED')) {
            setRejectModalOpen(index)
        } else {
            addOrUpdateReview(
                reviews,
                setReviews,
                index,
                lineItemId ?? '',
                value
            )
        }
    }

    const { createNewReview } = useCreateReviews(manualReview, onlyDeclined)

    const handleSubmitReview = () => {
        const reviewsApiFormat = reviews.map((item) => {
            const { index, ...rest } = item
            return rest
        })
        const notReceivedItemsReviews: OpsapiModelsLineItemReview[] =
            notReceivedProducts?.map((litem) => {
                return {
                    line_item_id: litem.rever_id,
                    status: 'APPROVED'
                }
            }) ?? []
        createNewReview(
            process?.process_id ?? '',
            reviewsApiFormat.concat(notReceivedItemsReviews)
        )
    }

    return (
        <ProductsBox>
            <div className="p-8">
                {returnedProducts && returnedProducts.length > 0 && (
                    <>
                        <TitlesSplitLineItem
                            title={'Returned items'}
                            icon={
                                <ReturnedIcon
                                    style={{
                                        color: `${theme.colors.grey[0]}`
                                    }}
                                />
                            }
                        />
                        {returnedProducts.map((lineItem, i) => {
                            return (
                                <ItemsDiv key={i}>
                                    <div className="w-full md:max-w-[70%]">
                                        <ProcessSplitLineItem
                                            lineItem={lineItem}
                                            moneyFormat={
                                                process.currency_money_format ??
                                                {}
                                            }
                                            returnStatus={process.return_status}
                                            lastKnownShippingStatus={
                                                process.last_known_shipping_status
                                            }
                                        />
                                    </div>
                                    {reviewMode && (
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
                                                            i
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
                                            <RejectReasonModal
                                                index={i}
                                                isOpen={rejectModalOpen === i}
                                                setIsOpen={setRejectModalOpen}
                                                reviews={reviews}
                                                setReviews={setReviews}
                                                lineItemId={
                                                    lineItem.rever_id ?? ''
                                                }
                                            />
                                        </>
                                    )}
                                </ItemsDiv>
                            )
                        })}
                    </>
                )}
                {reviewMode && (
                    <div className="mt-4 flex w-full justify-center md:mt-8">
                        <Button
                            disabled={
                                reviews.length !== returnedProducts?.length
                            }
                            onClick={handleSubmitReview}
                        >
                            {t('order_details.submit')}
                        </Button>
                    </div>
                )}
                {notReceivedProducts && notReceivedProducts.length > 0 && (
                    <div className="mt-6">
                        <TitlesSplitLineItem
                            title={'Items not received'}
                            icon={
                                <LostIcon
                                    style={{
                                        color: `${theme.colors.grey[0]}`
                                    }}
                                />
                            }
                        />
                        {notReceivedProducts.map((lineItem, i) => {
                            return (
                                <ItemsDiv key={i}>
                                    <div className="w-full md:max-w-[70%]">
                                        <ProcessSplitLineItem
                                            lineItem={lineItem}
                                            moneyFormat={
                                                process.currency_money_format ??
                                                {}
                                            }
                                            returnStatus={process.return_status}
                                            lastKnownShippingStatus={
                                                process.last_known_shipping_status
                                            }
                                        />
                                    </div>
                                </ItemsDiv>
                            )
                        })}
                    </div>
                )}
            </div>
        </ProductsBox>
    )
}

export default ProductsTab

const ProductsBox = styled.div`
    height: 100%;
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
