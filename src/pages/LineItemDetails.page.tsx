import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import useSearchLineItem from '../hooks/useSearchLineItem'
import NoAvailable from '../assets/images/noAvailable.png'
import { useTranslation } from 'react-i18next'
import { getDate, formatPrice } from '../utils'
import {
    ReturnMethods,
    RefundActions,
    ShippingStatuses
} from '../redux/features/generalData/generalDataSlice'
import { useTheme } from '@itsrever/design-system'
import device from '../utils/device'
import { useAppSelector } from '@/redux/hooks'

function RetLineItemDetails() {
    const theme = useTheme()
    const { i18n, t } = useTranslation()
    const reverID = window.location.pathname.split('/').pop()

    const response = useAppSelector(
        (store) => store.lineItemsApi.getLineItem.response.line_items
    )
    let LineItem
    if (response && response.length > 0) LineItem = response[0]
    useSearchLineItem(reverID ?? '')

    let imgSrc = NoAvailable
    if (LineItem?.product_image_url) {
        imgSrc = LineItem.product_image_url
    }

    const orderNumber = LineItem?.return_process?.customer_printed_order_id
    const customer = LineItem?.return_process?.customer

    const address = LineItem?.return_process?.pickup_address
        ? LineItem?.return_process?.pickup_address
        : LineItem?.return_process?.drop_off_address

    let returnDate = ''
    if (LineItem?.return_process?.started_at?.seconds) {
        returnDate = getDate(
            LineItem?.return_process?.started_at?.seconds,
            i18n.language
        )
    }

    let status
    if (
        LineItem?.return_process?.last_known_shipping_status &&
        LineItem?.return_process?.last_known_shipping_status ===
            ShippingStatuses.InWarehouse
    )
        status = 'COMPLETED'
    else status = 'PENDING'

    const condition = status === 'COMPLETED' ? 'Approved' : 'Pending'

    let productPrice = undefined
    if (
        LineItem?.total &&
        LineItem.quantity &&
        LineItem.return_process?.currency_money_format
    )
        productPrice = formatPrice(
            Math.round(LineItem.total / LineItem.quantity),
            LineItem.return_process?.currency_money_format
        )

    const typeOfReturn = LineItem?.return_process?.return_method
    const typeOfRefund = LineItem?.action
    const refund = LineItem?.refund_payment_method
    const productReturnReason = LineItem?.product_return_reason
    const trackingId = LineItem?.return_process?.tracking_id
    const trackingUrl = LineItem?.return_process?.tracking_url

    return (
        <PageComponent>
            <MainDiv>
                <InfoDiv>
                    <CustomerInfo
                        data-testid="LeftColumn"
                        borderColor={theme.colors.grey[3]}
                    >
                        <div className="flex justify-center">
                            <img
                                className="h-auto w-16"
                                src={imgSrc}
                                alt="ProductImage"
                            />
                        </div>

                        <h6 className="mt-8 text-center">
                            {orderNumber && orderNumber}
                        </h6>
                        <span
                            data-testid="CustomerName"
                            className="my-4 text-center text-xs"
                        >
                            {customer &&
                                customer.first_name + ' ' + customer.last_name}
                        </span>
                        <hr />
                        <span data-testid="Email" className="mt-8 mb-1 text-xs">
                            {t('details_page.email')}
                        </span>
                        <div className="break-words">
                            {customer && customer.email}
                        </div>
                        <span
                            data-testid="Address"
                            className="mt-4 mb-1 text-xs"
                        >
                            {t('details_page.address')}
                        </span>
                        <div>{address && address?.address_line_1}</div>
                        <div>{address && address?.address_line_2}</div>
                        <div>
                            {address &&
                                address?.city +
                                    ', ' +
                                    address?.postcode +
                                    ', ' +
                                    address?.country}
                        </div>
                        <span
                            className="mt-8 mb-1 text-xs"
                            data-testid="ReturnDate"
                        >
                            {t('details_page.return_date')}
                        </span>
                        <div>{returnDate && returnDate}</div>
                        <span className="mt-8 mb-1 text-xs">
                            {t('details_page.stage')}
                        </span>
                        <div>
                            {status === 'PENDING' ? 'Pending' : 'Completed'}
                        </div>
                        <span className="mt-8 mb-1 text-xs">
                            {t('details_page.condition')}
                        </span>
                        <div>{condition && condition}</div>
                    </CustomerInfo>
                    <LineItemInfo>
                        <LineItemName
                            data-testid="ProductName"
                            borderColor={theme.colors.grey[3]}
                        >
                            {LineItem && LineItem?.name}
                        </LineItemName>
                        <StatusArrows>
                            <LeftArrow
                                bgColor={
                                    status === 'PENDING'
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[3]
                                }
                            >
                                <div
                                    className={
                                        status === 'PENDING' ? 'text-white' : ''
                                    }
                                >
                                    {t('details_page.pending')}
                                </div>
                            </LeftArrow>
                            <RightArrow
                                status={status}
                                bgColor={
                                    status === 'COMPLETED'
                                        ? theme.colors.primary.dark
                                        : theme.colors.grey[3]
                                }
                            >
                                <div
                                    className={
                                        status === 'COMPLETED'
                                            ? 'text-white'
                                            : ''
                                    }
                                >
                                    {t('details_page.completed')}
                                </div>
                            </RightArrow>
                        </StatusArrows>
                        <OrderInfo>
                            <SingleInfo topColor={theme.colors.primary.dark}>
                                <span className="text-center text-xs">
                                    {t('details_page.amount')}
                                </span>
                                <div className="mt-4 text-center">
                                    {productPrice && productPrice}
                                </div>
                            </SingleInfo>
                            <SingleInfo topColor={theme.colors.primary.dark}>
                                <span className="text-center text-xs">
                                    {t('details_page.type_return')}
                                </span>
                                <div className="mt-4 text-center">
                                    {typeOfReturn ===
                                    ReturnMethods.NoReturnMethod
                                        ? 'No Payment Method'
                                        : typeOfReturn ===
                                          ReturnMethods.HomePickup
                                        ? 'Home Pickup'
                                        : 'Collection Point'}
                                </div>
                            </SingleInfo>
                            <SingleInfo topColor={theme.colors.primary.dark}>
                                <span className="text-center text-xs">
                                    {t('details_page.type_refund')}
                                </span>
                                <div className="mt-4 text-center">
                                    {typeOfRefund === RefundActions.NoAction
                                        ? 'No Refund'
                                        : typeOfRefund ===
                                          RefundActions.ToExchange
                                        ? 'Exchanged'
                                        : t(`refund_methods.method${refund}`)}
                                </div>
                            </SingleInfo>
                        </OrderInfo>
                        <OrderDetails>
                            <SingleInfo topColor={theme.colors.primary.dark}>
                                <span className="text-center text-xs">
                                    {t('details_page.reason')}
                                </span>
                                <div className="mt-4 text-center">
                                    {productReturnReason
                                        ? t(
                                              `select_reason.${productReturnReason}`
                                          )
                                        : 'No reason catched'}
                                </div>
                            </SingleInfo>
                            <SingleInfo topColor={theme.colors.primary.dark}>
                                <span className="text-center text-xs">
                                    {t('details_page.tracking')}
                                </span>
                                <div className="mt-4 text-center">
                                    {trackingId && trackingUrl ? (
                                        <TrackingLink
                                            className="break-words"
                                            color={theme.colors.primary.dark}
                                            href={trackingUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {trackingId}
                                        </TrackingLink>
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            </SingleInfo>
                        </OrderDetails>
                    </LineItemInfo>
                </InfoDiv>
            </MainDiv>
        </PageComponent>
    )
}

interface TrackingProps {
    color?: string
}

const TrackingLink = styled.a<TrackingProps>`
    color: ${(p) => p.color};
`

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
    height: 100%;
    overflow-y: scroll;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column-reverse;
    max-width: 100%;
    width: fit-content;
    height: fit-content;
    @media ${device.md} {
        display: grid;
        grid-template-columns: minmax(0px, 1fr) minmax(0px, 3fr);
        gap: 2rem;
        max-width: 100%;
        width: fit-content;
    }
`

interface BoxProps {
    borderColor: string
}

const CustomerInfo = styled.div<BoxProps>`
    height: fit-content;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const LineItemName = styled.div<BoxProps>`
    text-align: center;
    height: fit-content;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const LineItemInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const StatusArrows = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: stretch;
    align-items: center;
`

interface GeneralProps {
    status?: string
    bgColor: string
}

const LeftArrow = styled.div<GeneralProps>`
    margin-right: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background-color: ${(p) => p.bgColor};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    //
    position: relative;
    &:before {
        content: '';
        left: 100%;
        top: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        margin-top: -28px;
    }
    &:after {
        content: '';
        left: 100%;
        top: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        border-color: rgba(255, 255, 255, 0);
        border-left-color: ${(p) => p.bgColor};
        border-width: 20px;
        margin-top: -20px;
    }
`

const RightArrow = styled.div<GeneralProps>`
    margin-left: 0.5rem;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background-color: ${(p) => p.bgColor};
    border-radius: 5px;
    z-index: ${(p) => (p.status === 'COMPLETED' ? 50 : '')};
`

const OrderInfo = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
`

const OrderDetails = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`

interface SingleInfoProps {
    topColor: string
}

const SingleInfo = styled.div<SingleInfoProps>`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-top-width: 8px;
    border-top-color: ${(p) => p.topColor};
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 1rem;
`

export default RetLineItemDetails
