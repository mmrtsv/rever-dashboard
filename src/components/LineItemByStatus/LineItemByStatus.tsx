import React from 'react'
import styled from '@emotion/styled'
import NoAvailable from '../../assets/images/noAvailable.png'

interface LineItemByStatusProps {
    lineItem: any
}

const LineItemByStatus: React.FC<LineItemByStatusProps> = ({ lineItem }) => {
    const imgSrc = lineItem.images ? lineItem.images[0].src : NoAvailable
    const imgAlt = lineItem.images ? lineItem.images[0].alt : NoAvailable

    return (
        <LineItemCard>
            <div>
                <span className="text-xs">Order ID: </span>
                <span> {lineItem.process.customer_printed_order_id}</span>
            </div>
            <ProductDisplay>
                <img className="mr-4 h-16 w-fit" src={imgSrc} alt={imgAlt} />
                <div>
                    <span> {lineItem.name}</span>
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
    justify-content: space-evenly;
    align-items: center;
    margin-top: 1rem;
`
