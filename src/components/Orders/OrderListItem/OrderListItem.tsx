import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '../ShippingStatus/ShippingStatus'
import { useNavigate } from 'react-router-dom'
import NoAvailable from '../../../assets/images/noAvailable.png'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'

export interface OrderListItemProps {
    lineItem: ModelsPublicReturnLineItem
}

const OrderListItem: React.FC<OrderListItemProps> = ({ lineItem }) => {
    let imgSrc = NoAvailable
    if (lineItem.product_image_url)
        imgSrc = lineItem.product_image_url ?? NoAvailable
    const navigate = useNavigate()
    const handleClickItem = () => {
        navigate(`/details/${lineItem.rever_id}`)
    }

    const screenWidth = window.screen.availWidth

    return (
        <OrderListItemCard
            data-testid="OrderListItem"
            key={lineItem.rever_id}
            className=" cursor-pointer"
            onClick={handleClickItem}
        >
            <ProductDisplay>
                <OrderNumber>
                    <TextBoxes data-testid="ProductName">
                        {' '}
                        {lineItem?.return_process?.customer_printed_order_id}
                    </TextBoxes>
                </OrderNumber>
                <ProductInfo>
                    <img
                        className="mr-4 h-14 w-fit"
                        src={imgSrc}
                        alt="ProductImage"
                    />
                    {screenWidth >= 1024 && <span> {lineItem.name}</span>}
                </ProductInfo>
                <NameBox>
                    <TextBoxes data-testid="Name">
                        {' '}
                        {lineItem?.return_process?.customer?.first_name +
                            ' ' +
                            lineItem?.return_process?.customer?.last_name}
                    </TextBoxes>
                </NameBox>

                <StatusBox>
                    <ShippingStatus
                        enum={
                            lineItem.return_process?.last_known_shipping_status
                        }
                    />
                </StatusBox>
            </ProductDisplay>
        </OrderListItemCard>
    )
}
const OrderNumber = styled.span`
    width: 15%;
`
const NameBox = styled.span`
    margin-left: 0;
    width: 30%;
`
const TextBoxes = styled.span`
    text-align: left;
`
const StatusBox = styled.div`
    width: 15%;
    display: flex;
    align-content: center;
    justify-content: center;
`
const ProductInfo = styled.div`
    display: flex;
    align-items: center;
    width: 40%;
    @media (max-width: 1023px) {
        justify-content: center;
    }
`
const OrderListItemCard = styled.div`
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

    align-items: center;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`
export default OrderListItem
