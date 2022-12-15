import React from 'react'
import styled from '@emotion/styled'
import NoAvailable from '../../assets/images/noAvailable.png'
import { useNavigate } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { useTranslation } from 'react-i18next'

interface LineItemByStatusProps {
    lineItem: ModelsPublicReturnLineItem
}

const LineItemByStatus: React.FC<LineItemByStatusProps> = ({ lineItem }) => {
    const { t } = useTranslation()

    let imgSrc = NoAvailable
    if (lineItem.product && lineItem.product.images)
        imgSrc = lineItem.product.images[0].src ?? NoAvailable

    const navigate = useNavigate()

    const handleClickItem = () => {
        navigate(`/details/${lineItem.rever_id}`)
    }

    return (
        <LineItemCard data-testid="LineItemCard" onClick={handleClickItem}>
            <div>
                <span className="text-xs">{t('status_card.order_id')}</span>
                <span>
                    {lineItem.return_process?.customer_printed_order_id}
                </span>
            </div>
            <ProductDisplay>
                <img
                    className="mr-4 h-16 w-fit"
                    src={imgSrc}
                    alt="ProductImage"
                />
                <div>
                    <span data-testid="ProductName"> {lineItem.name}</span>
                </div>
            </ProductDisplay>
        </LineItemCard>
    )
}

export default LineItemByStatus

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
`

const ProductDisplay = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`
