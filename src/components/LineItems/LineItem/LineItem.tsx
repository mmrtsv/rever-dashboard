import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '../../ShippingStatus'
import ReviewItemStatus from '../LineItemStatus/LineItemStatus'
import { Link } from 'react-router-dom'
import NoAvailable from '@/assets/images/noAvailable.png'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import device from '@/utils/device'
import { useTranslation } from 'react-i18next'
import { getDate } from '@/utils'

export interface LineItemProps {
    lineItem: ModelsPublicReturnLineItem
    first?: boolean
    last?: boolean
    lastKnownShippingStatus?: number
}

const LineItem: React.FC<LineItemProps> = ({
    lineItem,
    first,
    last,
    lastKnownShippingStatus
}) => {
    const { i18n } = useTranslation()

    let imgSrc = NoAvailable
    if (lineItem.product_image_url) {
        imgSrc = lineItem.product_image_url
    }

    const customerPrintedOrderId =
        lineItem?.return_process?.customer_printed_order_id

    const customerFullName =
        lineItem?.return_process?.customer?.first_name +
        ' ' +
        lineItem?.return_process?.customer?.last_name

    let shippingStatus = lineItem.return_process?.last_known_shipping_status
    if (lastKnownShippingStatus != undefined && lastKnownShippingStatus >= 0) {
        shippingStatus = lastKnownShippingStatus
    }

    const returnDate = lineItem.return_process?.started_at?.seconds
        ? getDate(lineItem?.return_process?.started_at?.seconds, i18n.language)
        : 'XX/XX/XXXX'

    const showReviewStatus =
        lineItem.return_process?.return_status === 'COMPLETED'

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
        <LineItemCard
            key={lineItem.rever_id}
            className="cursor-pointer"
            first={first}
            last={last}
        >
            <Link to={`/return/${lineItem.return_process?.process_id}`}>
                <Box>
                    <DissapearText>{returnDate}</DissapearText>
                    <TextBoxes>{customerPrintedOrderId}</TextBoxes>
                    <div className="flex justify-center">
                        <img
                            className="h-14 w-auto"
                            src={imgSrc}
                            alt="ProductImage"
                        />
                    </div>
                    <DissapearText>{lineItem.quantity}</DissapearText>
                    <DisappearL data-testid="ItemName" className="col-span-2">
                        {lineItem.name}
                    </DisappearL>
                    <DisappearL>{customerFullName}</DisappearL>
                    <StatusBox>
                        {showReviewStatus ? (
                            <ReviewItemStatus status={reviewStatus} />
                        ) : (
                            <ShippingStatus status={shippingStatus} />
                        )}
                    </StatusBox>
                </Box>
            </Link>
        </LineItemCard>
    )
}

export default LineItem

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: center;
    width: 100%;
    @media ${device.md} {
        display: grid;
        align-items: center;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    @media ${device.lg} {
        grid-template-columns: repeat(8, minmax(0, 1fr));
    }
`

const DisappearL = styled.p`
    text-align: center;
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

const LineItemCard = styled.div<CardProps>`
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
    @media (max-width: 599px) {
        padding: 1rem;
    }
`
