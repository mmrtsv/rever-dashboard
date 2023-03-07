import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '@/components/ShippingStatus'
import { LineItemStatus } from '../LineItemStatus'
import { Link } from 'react-router-dom'
import NoAvailable from '../../../assets/images/noAvailable.png'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { Sizes } from '@/utils/device'
import {
    ShippingStatuses,
    RefundTimings,
    RefundPaymentMethods,
    ReturnStatus
} from '@/redux/features/generalData/generalDataSlice'

export interface ProcessSplitLineItemProps {
    lineItem: ModelsPublicReturnLineItem
    first?: boolean
    last?: boolean
    printedOrderId?: string
    customerName?: string
    lastKnownShippingStatus?: number
    orderStatus?: number
    reviewFlow?: string
}

const ProcessSplitLineItem: React.FC<ProcessSplitLineItemProps> = ({
    lineItem,
    first,
    last,
    printedOrderId,
    customerName,
    lastKnownShippingStatus,
    orderStatus,
    reviewFlow
}) => {
    let imgSrc = NoAvailable
    if (lineItem.product_image_url) {
        imgSrc = lineItem.product_image_url
    }

    const customerPrintedOrderId = printedOrderId
        ? printedOrderId
        : lineItem?.return_process?.customer_printed_order_id

    const customerFullName = customerName
        ? customerName
        : lineItem?.return_process?.customer?.first_name +
          ' ' +
          lineItem?.return_process?.customer?.last_name

    let shippingStatus = lineItem.return_process?.last_known_shipping_status
    if (lastKnownShippingStatus != undefined && lastKnownShippingStatus >= 0) {
        shippingStatus = lastKnownShippingStatus
    }

    const showReviewStatus =
        shippingStatus === ShippingStatuses.InWarehouse &&
        reviewFlow === 'MANUAL' &&
        orderStatus === ReturnStatus.Completed &&
        lineItem.refund_payment_method === RefundPaymentMethods.Original

    let reviewStatus = 0
    if (lineItem.reviews && lineItem.reviews?.length > 0) {
        reviewStatus =
            lineItem.reviews[0].status === 'APPROVED'
                ? 0
                : lineItem.reviews[0].status === 'DECLINED'
                ? 1
                : 2
    }
    return (
        <SplitLineItemCard
            key={lineItem.rever_id}
            className="cursor-pointer"
            first={first}
            last={last}
        >
            <Link to={`/details/${lineItem.rever_id}`}>
                <Box>
                    <TextBoxes>{customerPrintedOrderId}</TextBoxes>
                    <div className="flex justify-center">
                        <img
                            className="h-14 w-auto"
                            src={imgSrc}
                            alt="ProductImage"
                        />
                    </div>
                    <ItemName data-testid="itemName">{lineItem.name}</ItemName>

                    <DissapearText data-testid="Name">
                        {customerFullName}
                    </DissapearText>
                    <StatusBox>
                        {showReviewStatus ? (
                            <LineItemStatus status={reviewStatus} />
                        ) : (
                            <ShippingStatus status={shippingStatus} />
                        )}
                    </StatusBox>
                </Box>
            </Link>
        </SplitLineItemCard>
    )
}

export default ProcessSplitLineItem

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: center;
    width: 100%;
    @media (min-width: ${Sizes.md}) {
        display: grid;
        align-items: center;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media (min-width: ${Sizes.lg}) {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
`

const ItemName = styled.p`
    text-align: center;
    grid-column: span 2 / span 2;
    @media (max-width: 899px) {
        display: none;
    }
`
const DissapearText = styled.p`
    text-align: center;
    @media (max-width: 599px) {
        display: none;
    }
`
const TextBoxes = styled.p`
    text-align: center;
`

const StatusBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

interface CardProps {
    first?: boolean
    last?: boolean
}

const SplitLineItemCard = styled.div<CardProps>`
    padding: 1rem;
    border-top-left-radius: ${(p) => (p.first ? '0.5rem' : '')};
    border-top-right-radius: ${(p) => (p.first ? '0.5rem' : '')};
    border-bottom-left-radius: ${(p) => (p.last ? '0.5rem' : '')};
    border-bottom-right-radius: ${(p) => (p.last ? '0.5rem' : '')};
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    cursor: pointer;
    z-index: 1;
    @media (max-width: ${Sizes.md}) {
        padding: 1rem;
    }
`
