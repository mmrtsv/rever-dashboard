import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    ModelsReturnLineItem,
    OpsapiModelsLineItemReview
} from '@itsrever/dashboard-api'
import LostIcon from '@mui/icons-material/SearchOff'
import ReturnedIcon from '@mui/icons-material/Cached'
import TitlesSplitLineItem from '@/components/LineItems/ProcessSplitLineItem/TitlesSplitLineItem/TitlesSplitLineItem'
import { Button } from '@itsrever/design-system'
import { LineItemStatus, ProcessSplitLineItem } from '@/components/LineItems'
import { useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import { useCreateReviews } from '@/hooks'
import { useTheme } from '@itsrever/design-system'
import RejectReasonModal from './RejectReasonModal/RejectReasonModal'
import LineItemInfo from './ItemDetails/ItemDetails'

export interface SelectedItem {
    list?: 'returned' | 'not-received'
    index: number
}

export function addOrUpdateReview(
    reviews: OpsapiModelsLineItemReview[],
    setReviews: (reviews: OpsapiModelsLineItemReview[]) => void,
    setReviewOpen: (open: number) => void,
    index: number,
    lineItemId: string,
    value: string,
    rejectReason?: string
) {
    let newReview: OpsapiModelsLineItemReview = {
        line_item_id: lineItemId,
        status: value
    }
    if (rejectReason) newReview = { ...newReview, reject_reason: rejectReason }

    const newReviews = [...reviews]
    newReviews[index] = newReview
    setReviews(newReviews)
    setReviewOpen(-1)
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

    const allProducts =
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

    // Returned products
    const returnedProducts = allProducts?.filter(
        (p) => p.product_return_reason !== 'NOT_RECEIVED'
    )

    // Not received products
    const notReceivedProducts = allProducts?.filter(
        (p) => p.product_return_reason === 'NOT_RECEIVED'
    )

    const emptyReview: OpsapiModelsLineItemReview = {
        line_item_id: '',
        status: ''
    }
    const [reviews, setReviews] = useState<Array<OpsapiModelsLineItemReview>>(
        []
    )

    useEffect(() => {
        const revs = Array(returnedProducts?.length).fill(emptyReview)
        setReviews(revs)
    }, [returnedProducts?.length])

    const [reviewOpen, setReviewOpen] = useState(-1)
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
                setReviewOpen,
                index,
                lineItemId ?? '',
                value
            )
        }
    }

    const { createNewReview } = useCreateReviews(manualReview, onlyDeclined)

    const handleSubmitReview = () => {
        const notReceivedItemsReviews: OpsapiModelsLineItemReview[] =
            notReceivedProducts?.map((litem) => {
                return {
                    line_item_id: litem.rever_id,
                    status: 'APPROVED'
                }
            }) ?? []
        createNewReview(
            process?.process_id ?? '',
            reviews.concat(notReceivedItemsReviews)
        )
    }

    const [selectedItem, setSelectedItem] = useState<SelectedItem>({
        list: undefined,
        index: -1
    })

    return (
        <ProductsBox>
            {process && selectedItem.index === -1 ? (
                <>
                    {returnedProducts && returnedProducts.length > 0 && (
                        <div className="mb-6">
                            <TitlesSplitLineItem
                                title={t('products_tab.returned_items')}
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
                                        <div
                                            className="h-full w-full md:max-w-[80%]"
                                            onClick={() => {
                                                setSelectedItem({
                                                    list: 'returned',
                                                    index: i
                                                })
                                            }}
                                        >
                                            <ProcessSplitLineItem
                                                lineItem={lineItem}
                                                moneyFormat={
                                                    process.currency_money_format ??
                                                    {}
                                                }
                                                returnStatus={
                                                    process.return_status
                                                }
                                                lastKnownShippingStatus={
                                                    process.last_known_shipping_status
                                                }
                                            />
                                        </div>
                                        {reviewMode && (
                                            <MenuDiv>
                                                {reviewOpen !== i ? (
                                                    <OptionDiv
                                                        onClick={() =>
                                                            setReviewOpen(i)
                                                        }
                                                    >
                                                        <Box>
                                                            {reviews[i]
                                                                .status ? (
                                                                <LineItemStatus
                                                                    status={
                                                                        reviews[
                                                                            i
                                                                        ]
                                                                            .status ===
                                                                        'APPROVED'
                                                                            ? 0
                                                                            : reviews[
                                                                                  i
                                                                              ]
                                                                                  .status ===
                                                                              'DECLINED'
                                                                            ? 1
                                                                            : 2
                                                                    }
                                                                />
                                                            ) : (
                                                                t(
                                                                    'products_tab.review'
                                                                )
                                                            )}
                                                        </Box>
                                                    </OptionDiv>
                                                ) : (
                                                    <>
                                                        <OptionDiv
                                                            onClick={() =>
                                                                handleChange(
                                                                    lineItem.rever_id,
                                                                    'APPROVED',
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            <Box>
                                                                <p className="text-center">
                                                                    {t(
                                                                        'products_tab.approve'
                                                                    )}
                                                                </p>
                                                            </Box>
                                                        </OptionDiv>
                                                        <OptionDiv
                                                            onClick={() =>
                                                                handleChange(
                                                                    lineItem.rever_id,
                                                                    'DECLINED',
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            <Box>
                                                                <p className="text-center">
                                                                    {t(
                                                                        'products_tab.decline'
                                                                    )}
                                                                </p>
                                                            </Box>
                                                        </OptionDiv>
                                                        <OptionDiv
                                                            onClick={() =>
                                                                handleChange(
                                                                    lineItem.rever_id,
                                                                    'MISSING',
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            <Box>
                                                                <p className="text-center">
                                                                    {t(
                                                                        'products_tab.missing'
                                                                    )}
                                                                </p>
                                                            </Box>
                                                        </OptionDiv>
                                                    </>
                                                )}

                                                <RejectReasonModal
                                                    index={i}
                                                    isOpen={
                                                        rejectModalOpen === i
                                                    }
                                                    setIsOpen={
                                                        setRejectModalOpen
                                                    }
                                                    reviews={reviews}
                                                    setReviews={setReviews}
                                                    setReviewOpen={
                                                        setReviewOpen
                                                    }
                                                    lineItemId={
                                                        lineItem.rever_id ?? ''
                                                    }
                                                />
                                            </MenuDiv>
                                        )}
                                    </ItemsDiv>
                                )
                            })}
                        </div>
                    )}
                    {reviewMode && (
                        <div className="mt-4 flex w-full justify-center md:mt-8">
                            <Button
                                disabled={reviews.some((r) => !r.status)}
                                onClick={handleSubmitReview}
                            >
                                {t('products_tab.submit')}
                            </Button>
                        </div>
                    )}
                    {notReceivedProducts && notReceivedProducts.length > 0 && (
                        <div>
                            <TitlesSplitLineItem
                                title={t('products_tab.not_received')}
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
                                        <div
                                            className="w-full md:max-w-[80%]"
                                            onClick={() =>
                                                setSelectedItem({
                                                    list: 'not-received',
                                                    index: i
                                                })
                                            }
                                        >
                                            <ProcessSplitLineItem
                                                lineItem={lineItem}
                                                moneyFormat={
                                                    process.currency_money_format ??
                                                    {}
                                                }
                                                returnStatus={
                                                    process.return_status
                                                }
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
                </>
            ) : (
                <LineItemInfo
                    setSelectedItem={setSelectedItem}
                    lineItem={
                        returnedProducts && notReceivedProducts
                            ? selectedItem.list === 'returned'
                                ? returnedProducts[selectedItem.index]
                                : notReceivedProducts[selectedItem.index]
                            : {}
                    }
                />
            )}
        </ProductsBox>
    )
}

export default ProductsTab

const ProductsBox = styled.div`
    height: 100%;
    padding: 2rem;
`

const MenuDiv = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    margin-left: 1.5rem;
`

const OptionDiv = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
`

const Box = styled.div`
    width: 100%;
    height: fit-content;
    border: 1px solid #e5e5e5;
    border-radius: 0.3rem;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0.31rem;
    cursor: pointer;
    &:hover {
        background-color: #e5e5e5;
    }
`

const ItemsDiv = styled.div`
    display: flex;
`
