import React, { useState, useEffect } from 'react'
import PageComponent from '../components/PageComponent'
import styled from 'styled-components'
import useSearchOrder from '../hooks/useSearchOrder'
import OrderListItem from '../components/Orders/OrderListItem'
import {
    SelectMenu,
    SelectItem,
    Modal,
    Button,
    useTheme
} from '@itsrever/design-system'
import device from '../utils/device'
import { Tabs, Tab } from '@mui/material'
import OrderDetail from '../components/Orders/OrderDetails/OrderDetails'
import Summary from '../components/Orders/Summary/Summary'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { useTranslation } from 'react-i18next'
import { getDate } from '../utils'
import ArrowDown from '@mui/icons-material/ArrowDownward'
import {
    ModelsLineItemReview,
    ModelsReturnLineItem
} from '@itsrever/dashboard-api'
import { createReview, resetReviewsApiCalls } from '../redux/api/reviewsApi'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useNavigate } from 'react-router-dom'
import SuccessAnimation from '../assets/Lottie/ComingSoon/Success'
import ProcessSplitLineItem from '../components/Orders/ProcessSplitLineItem'

interface Review extends ModelsLineItemReview {
    index: number
}
function OrderDetails() {
    const navigate = useNavigate()

    const { i18n } = useTranslation()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const createReviewStatus = useAppSelector(
        (state) => state.reviewsApi.createReview
    )

    const processID = window.location.pathname.split('/').pop()

    const theme = useTheme()
    const { Order } = useSearchOrder(processID ?? '')

    const customer = Order?.customer

    const products =
        Order && Order.line_items?.filter((item) => item.type === 'product')

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

    const [ModalOpen, setModalOpen] = useState(false)

    const needsReview =
        Order?.last_known_shipping_status === 3 &&
        Order.refund_timing === 3 &&
        Order.status === 0
    const [currentTab, setCurrentTab] = useState(0)

    const returnDate =
        Order?.started_at?.seconds &&
        getDate(Order?.started_at?.seconds, i18n.language)

    const [reviews, setReviews] = useState<Array<Review>>([])

    function addOrUpdateReview(
        reviews: Review[],
        line_item_id: string,
        status: string,
        index: number
    ) {
        let reviewExists = false
        const updatedReviews = reviews.map((review) => {
            if (review.index === index) {
                reviewExists = true
                return { ...review, status }
            }
            return review
        })
        if (!reviewExists) {
            updatedReviews.push({ line_item_id, status, index })
        }
        setReviews(updatedReviews)
    }

    const handleChange = (
        id: string | undefined,
        value: string,
        index: number
    ) => {
        id && addOrUpdateReview(reviews, id, value, index)
    }
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        if (createReviewStatus.loading === 'succeeded') {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate('/')
            }, 2000)
            dispatch(resetReviewsApiCalls())
        } else if (createReviewStatus.loading === 'failed') {
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
                createReviewInput: {
                    process_id: processID,
                    reviews: newReviews
                }
            })
        )
    }

    return (
        <PageComponent>
            <Main className="flex flex-col overflow-x-auto bg-white">
                <TopDiv>
                    <TitleDiv className="mt-6">
                        <b className=" text-xl">
                            {Order && Order.customer_printed_order_id}
                        </b>
                        <LocalShippingOutlinedIcon className="ml-2" />
                    </TitleDiv>
                    <TitleDiv className="mt-2">
                        <h6>{returnDate}</h6>
                    </TitleDiv>
                </TopDiv>
                <CardDiv>
                    <TabsDiv>
                        <Tabs
                            value={currentTab}
                            onChange={(e, i) => setCurrentTab(i)}
                            TabIndicatorProps={{
                                sx: {
                                    background: theme.colors.primary.dark
                                }
                            }}
                        >
                            <Tab
                                style={{
                                    color: `${
                                        currentTab === 0
                                            ? theme.colors.primary.dark
                                            : theme.colors.grey[1]
                                    }`,
                                    borderTopLeftRadius: '2rem'
                                }}
                                label={t('order_details.products')}
                            />
                            <Tab
                                style={{
                                    color: `${
                                        currentTab === 1
                                            ? theme.colors.primary.dark
                                            : theme.colors.grey[1]
                                    }`
                                }}
                                label={t('order_details.order_details')}
                            />
                            <Tab
                                style={{
                                    color: `${
                                        currentTab === 2
                                            ? theme.colors.primary.dark
                                            : theme.colors.grey[1]
                                    }`
                                }}
                                label={t('order_details.summary')}
                            />
                        </Tabs>
                    </TabsDiv>
                    {currentTab === 0 ? (
                        <ProductsBox data-testid="LineItems" className=" p-8">
                            {!needsReview && (
                                <div className="grid w-full grid-cols-3 p-4 md:grid-cols-5 lg:grid-cols-7">
                                    <DissapearingH6M className="flex items-center justify-center">
                                        <b className="mr-2">
                                            {t('order_details.date')}
                                        </b>
                                        <ArrowDown />
                                    </DissapearingH6M>
                                    <h6 className="text-grey-1 text-center">
                                        <b>{t('order_details.order_id')}</b>
                                    </h6>
                                    <h6 className="text-grey-1 text-center">
                                        <b> {t('order_details.image')}</b>
                                    </h6>

                                    <DissapearingH6L className="text-grey-1 col-span-2">
                                        <b>
                                            {' '}
                                            {t('order_details.product_name')}
                                        </b>
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
                                        <ItemsDiv key={lineItem.rever_id}>
                                            <ProcessSplitLineItem
                                                lineItem={lineItem}
                                                // index={i}
                                                orderStatus={Order.status}
                                                refundTiming={
                                                    Order.refund_timing
                                                }
                                                lastKnownShippingStatus={
                                                    Order.last_known_shipping_status
                                                }
                                                printedOrderId={
                                                    Order.customer_printed_order_id
                                                }
                                                customerName={
                                                    customer?.first_name +
                                                    ' ' +
                                                    customer?.last_name
                                                }
                                                dateReturn={
                                                    Order.started_at?.seconds
                                                }
                                                first={i === 0}
                                                last={i === products.length - 1}
                                            />
                                            {needsReview && (
                                                <>
                                                    <MenuDiv>
                                                        <SelectMenu
                                                            menuName="review"
                                                            label={t(
                                                                'order_details.review'
                                                            )}
                                                            color="black"
                                                            defaultValue="Review"
                                                            onChange={(e) => {
                                                                handleChange(
                                                                    lineItem.rever_id,
                                                                    e
                                                                        .currentTarget
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
                                                    <ModalDiv>
                                                        <ReviewDiv
                                                            onClick={() =>
                                                                setModalOpen(
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            {t(
                                                                'order_details.review'
                                                            )}
                                                        </ReviewDiv>
                                                        <Modal
                                                            isOpen={ModalOpen}
                                                            onRequestClose={() =>
                                                                setModalOpen(
                                                                    false
                                                                )
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
                                                                    {t(
                                                                        'order_details.approve'
                                                                    )}
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
                                                                    {t(
                                                                        'order_details.decline'
                                                                    )}
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
                                                                    {t(
                                                                        'order_details.missing'
                                                                    )}
                                                                </p>
                                                            </OptionDiv>
                                                        </Modal>
                                                    </ModalDiv>
                                                </>
                                            )}
                                        </ItemsDiv>
                                    )
                                })}
                            {success && <SuccessAnimation />}
                            {needsReview && (
                                <div className="mt-4 flex w-full justify-center md:mt-8">
                                    <Button
                                        disabled={
                                            reviews.length !==
                                            mappedProducts?.length
                                        }
                                        onClick={() => handleSubmitReview()}
                                    >
                                        {t('order_details.submit')}
                                    </Button>
                                </div>
                            )}
                        </ProductsBox>
                    ) : currentTab === 1 ? (
                        <OrderDetail order={Order} />
                    ) : (
                        <Summary order={Order} />
                    )}
                </CardDiv>
            </Main>
        </PageComponent>
    )
}

export default OrderDetails

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

const TopDiv = styled.div`
    width: 100%;
    background-color: #fff;
    padding-bottom: 2rem;
`

const CardDiv = styled.div`
    flex-grow: 1;
`

const ProductsBox = styled.div`
    background-color: #eee;
    height: 100%;
`

const TabsDiv = styled.div`
    border-bottom: solid 1px #ccc;
    background-color: #eee;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
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

const TitleDiv = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`
