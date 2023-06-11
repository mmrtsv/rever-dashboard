import React from 'react'
import styled from 'styled-components'
import NoAvailable from '../../../assets/images/noAvailable.png'
import {
    ModelsMoneyFormat,
    ModelsPublicReturnLineItem
} from '@itsrever/dashboard-api'
import { formatPrice, moreThan, lessThan } from '@/utils'
import { RefundActions } from '@/utils'
import { RepeatIcon, CoinIcon } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'

export interface ProcessSplitLineItemProps {
    lineItem: ModelsPublicReturnLineItem
    moneyFormat: ModelsMoneyFormat
}

const ProcessSplitLineItem: React.FC<ProcessSplitLineItemProps> = ({
    lineItem,
    moneyFormat
}) => {
    const { t } = useTranslation()

    let imgSrc = NoAvailable
    if (lineItem.product_image_url) {
        imgSrc = lineItem.product_image_url
    }

    let productPrice = undefined
    if (lineItem?.total && lineItem.quantity)
        productPrice = formatPrice(
            Math.round(lineItem.total / lineItem.quantity),
            moneyFormat
        )

    return (
        <SplitLineItemCard
            className="hover:bg-grey-5"
            key={lineItem.rever_id}
            data-testid="SplitLineItem"
        >
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
                <div className="flex items-center justify-center gap-2">
                    {lineItem.action === RefundActions.ToExchange ? (
                        <RepeatIcon color="black" />
                    ) : (
                        <CoinIcon color="black" />
                    )}
                    <Refund>{t(`actions.method${lineItem.action}`)}</Refund>
                </div>
            </Box>
        </SplitLineItemCard>
    )
}

export default ProcessSplitLineItem

const Price = styled.p`
    text-align: center;
`

const Refund = styled.p`
    text-align: center;
`

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    @media ${moreThan.md} {
        grid-template-columns: repeat(5, minmax(0, 1fr));
        align-items: center;
        width: 100%;
    }
`

const ItemName = styled.p`
    grid-column: span 2 / span 2;
    @media ${lessThan.md} {
        display: none;
    }
`

const SplitLineItemCard = styled.div`
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    z-index: 1;
`
