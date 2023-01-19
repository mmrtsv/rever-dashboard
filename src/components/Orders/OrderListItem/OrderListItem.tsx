import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '../ShippingStatus'
import { useNavigate } from 'react-router-dom'
import NoAvailable from '../../../assets/images/noAvailable.png'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { Sizes } from '../../../utils/device'
import device from '../../../utils/device'

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
                <LeftBox>
                    <OrderNumber>
                        <TextBoxes>
                            {
                                lineItem?.return_process
                                    ?.customer_printed_order_id
                            }
                        </TextBoxes>
                    </OrderNumber>
                    <ProductInfo>
                        <img
                            className="mr-4 h-14 w-auto"
                            src={imgSrc}
                            alt="ProductImage"
                        />
                        <ItemName data-testId="itemName">
                            {lineItem.name}
                        </ItemName>
                    </ProductInfo>
                </LeftBox>
                <RightBox>
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
                            status={
                                lineItem.return_process
                                    ?.last_known_shipping_status
                            }
                        />
                    </StatusBox>
                </RightBox>
            </ProductDisplay>
        </OrderListItemCard>
    )
}
const LeftBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* @media (max-width: ${Sizes.md}) {
        flex-direction: column;
    } */
`
const RightBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media (max-width: ${Sizes.md}) {
        flex-direction: column;
    }
`
const ItemName = styled.span`
    @media (max-width: 1024px) {
        visibility: hidden;
        display: none;
    }
`

const OrderNumber = styled.span`
    width: 15%;
    @media (max-width: ${Sizes.md}) {
        width: 100%;
    }
`
const NameBox = styled.span`
    margin-left: 0;
    width: 60%;
    @media (max-width: ${Sizes.md}) {
        width: 100%;
        text-align: center;
    }
`
const TextBoxes = styled.span`
    text-align: left;
`
const StatusBox = styled.div`
    width: 40%;
    display: flex;
    align-content: center;
    justify-content: center;
    @media (max-width: ${Sizes.md}) {
        width: 100%;
        font-size: 12px;
        padding: 5px;
    }
`
const ProductInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 75%;
    @media (max-width: ${Sizes.md}) {
        width: 100%;
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
    @media (max-width: ${Sizes.md}) {
        padding: 1rem;
    }
`
const ProductDisplay = styled.div`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: ${Sizes.md}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0;
    }
`
export default OrderListItem
