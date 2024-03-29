import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '../../ShippingStatus'
import { Link } from 'react-router-dom'
import NoAvailable from '@/assets/images/noAvailable.png'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { moreThan, lessThan } from '@/utils'
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
                        <ShippingStatus status={shippingStatus} />
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
    @media ${moreThan.md} {
        display: grid;
        align-items: center;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    @media ${moreThan.lg} {
        grid-template-columns: repeat(8, minmax(0, 1fr));
    }
`

const DisappearL = styled.p`
    text-align: center;
    @media ${lessThan.lg} {
        display: none;
    }
`
const DissapearText = styled.p`
    text-align: center;
    @media ${lessThan.md} {
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
    @media ${lessThan.md} {
        padding: 1rem;
    }
`
