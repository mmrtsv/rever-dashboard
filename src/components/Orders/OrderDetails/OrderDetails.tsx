import React from 'react'
import styled from 'styled-components'
import ReviewStatus from '../ReviewStatus/ReviewStatus'
import ShippingStatus from '../ShippingStatus'
import AccessTime from '@mui/icons-material/AccessTime'
import FaceIcon from '@mui/icons-material/Face'
import { useTheme } from '@itsrever/design-system'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import device from '../../../utils/device'
import { useTranslation } from 'react-i18next'

interface OrderDetailsProps {
    order?: ModelsPublicReturnProcess
}

const OrderDetails: React.FC<OrderDetailsProps> = (order) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const Order = order.order
    const customer = Order?.customer

    const address = Order?.drop_off_address
        ? Order.drop_off_address
        : Order?.pickup_address

    const reviewStatus =
        Order && Order.line_items && Order.line_items[0].reviews?.length === 0
            ? 0
            : 1

    return (
        <ProductDetailsDiv>
            <div>
                <div className="flex flex-row items-center">
                    <AccessTime
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <h3 className="text-grey-1 ml-2 text-lg">
                        {t('order_details.order_status')}
                    </h3>
                </div>
                <div className="mt-8 grid w-fit grid-cols-2 items-center gap-y-4 gap-x-16">
                    <h6>
                        <b>{t('order_details.order')}</b>
                    </h6>
                    <h6>
                        <b>{t('order_details.status')}</b>
                    </h6>
                    <hr
                        className="col-span-3"
                        style={{
                            border: `0.5px solid ${theme.colors.grey[2]}`
                        }}
                    />
                    <h6>{t('order_details.shipping_status')}</h6>
                    <ShippingStatus
                        status={Order && Order.last_known_shipping_status}
                    />
                    {Order && Order.last_known_shipping_status === 3 && (
                        <>
                            <hr
                                className="col-span-3"
                                style={{
                                    border: `0.5px solid ${theme.colors.grey[2]}`
                                }}
                            />
                            <h6>{t('order_details.review_status')}</h6>
                            <ReviewStatus status={reviewStatus} />
                        </>
                    )}
                </div>
            </div>
            <div>
                <div className="mt-16 flex flex-row items-center lg:mt-0">
                    <FaceIcon
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <h3 className="text-grey-1 ml-2 text-lg">
                        {t('order_details.customer')}
                    </h3>
                </div>
                <div className="mt-8 grid w-fit grid-cols-3 gap-y-4 gap-x-8">
                    <h6>
                        <b>{t('order_details.name')}</b>
                    </h6>
                    <h6>
                        <b>{t('order_details.email')}</b>
                    </h6>
                    <h6>
                        <b>{t('order_details.phone')}</b>
                    </h6>
                    <hr
                        className="col-span-3"
                        style={{
                            border: `0.5px solid ${theme.colors.grey[2]}`
                        }}
                    />
                    <h6>
                        {customer &&
                            customer?.first_name + ' ' + customer?.last_name}
                    </h6>
                    <h6>{customer && customer?.email}</h6>
                    <h6>{address && address.phone}</h6>
                </div>
                <h6 className="mt-8 grid grid-cols-1">
                    <b>{t('order_details.address')}</b>
                </h6>
                <div className="mt-2">
                    <h6>{address && address?.address_line_1}</h6>
                    <h6>{address && address?.address_line_2}</h6>
                    <h6>
                        {address &&
                            address?.city +
                                ', ' +
                                address?.postcode +
                                ', ' +
                                address?.country}
                    </h6>
                </div>
            </div>
        </ProductDetailsDiv>
    )
}

export default OrderDetails

const ProductDetailsDiv = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #eee;
    @media ${device.lg} {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }
`
