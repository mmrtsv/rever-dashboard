import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '@/components/ShippingStatus'
import { LineItemStatus } from '../LineItemStatus'
import { Link } from 'react-router-dom'
import NoAvailable from '../../../assets/images/noAvailable.png'
import {
    ModelsMoneyFormat,
    ModelsPublicReturnLineItem
} from '@itsrever/dashboard-api'
import { formatPrice } from '@/utils'
import { Sizes } from '@/utils/device'

export interface ProcessSplitLineItemProps {
    lineItem: ModelsPublicReturnLineItem
    moneyFormat: ModelsMoneyFormat
    lastKnownShippingStatus?: number
    returnStatus?: string
}

const ProcessSplitLineItem: React.FC<ProcessSplitLineItemProps> = ({
    lineItem,
    moneyFormat,
    lastKnownShippingStatus,
    returnStatus
}) => {
    let imgSrc = NoAvailable
    if (lineItem.product_image_url) {
        imgSrc = lineItem.product_image_url
    }

    let shippingStatus = lineItem.return_process?.last_known_shipping_status
    if (lastKnownShippingStatus != undefined && lastKnownShippingStatus >= 0) {
        shippingStatus = lastKnownShippingStatus
    }

    const showReviewStatus =
        returnStatus === 'COMPLETED' &&
        lineItem.reviews &&
        lineItem.reviews.length > 0

    let reviewStatus = 0
    if (lineItem.reviews && lineItem.reviews?.length > 0) {
        reviewStatus =
            lineItem.reviews[0].status === 'APPROVED'
                ? 0
                : lineItem.reviews[0].status === 'DECLINED'
                ? 1
                : 2
    }

    let productPrice = undefined
    if (lineItem?.total && lineItem.quantity)
        productPrice = formatPrice(
            Math.round(lineItem.total / lineItem.quantity),
            moneyFormat
        )

    return (
        <SplitLineItemCard
            key={lineItem.rever_id}
            className="cursor-pointer"
            data-testid="SplitLineItem"
        >
            <Link to={`/details/${lineItem.rever_id}`}>
                <Box>
                    <div className="flex justify-center">
                        <img
                            className="h-14 w-auto"
                            src={imgSrc}
                            alt="ProductImage"
                        />
                    </div>
                    <ItemName data-testid="itemName">{lineItem.name}</ItemName>
                    <Price>{productPrice}</Price>
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

const Price = styled.p`
    text-align: center;
    @media (max-width: 599px) {
        display: none;
    }
`

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    @media (min-width: ${Sizes.md}) {
        grid-template-columns: repeat(5, minmax(0, 1fr));
        display: grid;
        align-items: center;
        width: 100%;
        display: grid;
    }
`

const ItemName = styled.p`
    grid-column: span 2 / span 2;
    @media (max-width: 899px) {
        display: none;
    }
`

const StatusBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const SplitLineItemCard = styled.div`
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    z-index: 1;
    @media (max-width: ${Sizes.md}) {
        padding: 1rem;
    }
`
