import React from 'react'
import styled from '@emotion/styled'
import NoAvailable from '../../assets/images/noAvailable.png'
import { useNavigate } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../redux/hooks'
import { Sizes } from '../../utils/device'

interface LineItemByStatusProps {
    lineItem: ModelsPublicReturnLineItem
}

const LineItemByStatus: React.FC<LineItemByStatusProps> = ({ lineItem }) => {
    const { t } = useTranslation()

    let imgSrc = NoAvailable
    if (lineItem.product_image_url)
        imgSrc = lineItem.product_image_url ?? NoAvailable

    const navigate = useNavigate()

    const handleClickItem = () => {
        navigate(`/details/${lineItem.rever_id}`)
    }

    return (
        <LineItemCard data-testid="LineItemCard" onClick={handleClickItem}>
            <OrderID>
                <span className="text-xs">{t('status_card.order_id')}</span>
                <span>
                    {lineItem.return_process?.customer_printed_order_id}
                </span>
            </OrderID>
            <ProductDisplay>
                <img
                    className="mr-4 h-16 w-fit"
                    src={imgSrc}
                    alt="ProductImage"
                />
                <ProductName data-testid="ProductName">
                    {lineItem.name}
                </ProductName>
            </ProductDisplay>
        </LineItemCard>
    )
}

export default LineItemByStatus

const OrderID = styled.div`
    @media (max-width: ${Sizes.md}) {
        text-align: center;
    }
`

const LineItemCard = styled.div`
    margin-top: 0.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    cursor: pointer;
    width: 100%;
`

const ProductDisplay = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`

const ProductName = styled.div`
    width: 100%;
    text-align: center;
    @media (max-width: ${Sizes.md}) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`
