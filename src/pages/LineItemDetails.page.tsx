import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import useSearchLineItem from '../hooks/useSearchLineItem'
import NoAvailable from '../assets/images/noAvailable.png'

function RetLineItemDetails() {
    const reverID = window.location.pathname.split('/').pop()

    const { LineItem } = useSearchLineItem(reverID ?? '')

    let imgSrc = NoAvailable
    if (LineItem?.product?.images)
        imgSrc = LineItem.product.images[0].src ?? NoAvailable

    const orderNumber = LineItem?.return_process?.customer_printed_order_id
    const customer = LineItem?.return_process?.customer

    const address = LineItem?.return_process?.pickup_address
        ? LineItem?.return_process?.pickup_address
        : LineItem?.return_process?.drop_off_address

    // const returnDate = ????

    let status
    if (
        LineItem?.return_process?.last_known_shipping_status &&
        LineItem?.return_process?.last_known_shipping_status === 3
    )
        status = 'COMPLETED'
    else status = 'PENDING'

    // const condition = ???

    const typeOfReturn = LineItem?.return_process?.return_method
    const typeOfRefund = LineItem?.action
    const returnReason = LineItem?.return_reason

    return (
        <PageComponent>
            <MainDiv>
                <InfoDiv>
                    <CustomerInfo>
                        <div className="flex justify-center">
                            <img src={imgSrc} alt="ProductImage" />
                        </div>

                        <h6 className="mt-8 text-center">ES-9837</h6>
                        <span className="my-4 text-center text-xs">
                            Dolores Crotal
                        </span>
                        <hr />
                        <span className="mt-8 mb-1 text-xs">Email</span>
                        <div>dolores.crotal@gmail.com</div>
                        <span className="mt-4 mb-1 text-xs">Address</span>
                        <div>C/ Francesc Macià 3, 6º piso</div>
                        <span className="mt-8 mb-1 text-xs">Return Date</span>
                        <div>16/11/2022</div>
                        <span className="mt-8 mb-1 text-xs">Stage</span>
                        <div>Completed</div>
                        <span className="mt-8 mb-1 text-xs">Condition</span>
                        <div>Approved</div>
                    </CustomerInfo>
                    <LineItemInfo>
                        <StatusArrows>
                            <LeftArrow>
                                <div className="text-white">
                                    Pending to receive
                                </div>
                            </LeftArrow>
                            <RightArrow>
                                <div>Completed</div>
                            </RightArrow>
                        </StatusArrows>
                        <OrderInfo>
                            <SingleInfo>
                                <span className="text-center text-xs">
                                    Amount
                                </span>
                                <div className="mt-4 text-center">33.15 €</div>
                            </SingleInfo>
                            <SingleInfo>
                                <span className="text-center text-xs">
                                    Type of return
                                </span>
                                <div className="mt-4 text-center">
                                    Delivered to a Collection Point
                                </div>
                            </SingleInfo>
                            <SingleInfo>
                                <span className="text-center text-xs">
                                    Type of refund
                                </span>
                                <div className="mt-4 text-center">
                                    Instant Refund
                                </div>
                            </SingleInfo>
                        </OrderInfo>
                        <OrderDetails>
                            <SingleInfo>
                                <span className="text-center text-xs">
                                    Reason
                                </span>
                                <div className="mt-4 text-center">
                                    Different than expected
                                </div>
                            </SingleInfo>
                            <SingleInfo>
                                <span className="text-center text-xs">
                                    Why was it denied
                                </span>
                                <div className="mt-4 text-center">-</div>
                            </SingleInfo>
                        </OrderDetails>
                    </LineItemInfo>
                </InfoDiv>
            </MainDiv>
        </PageComponent>
    )
}

const MainDiv = styled.div`
    background-color: rgb(241, 245, 249);
    display: flex;
    justify-content: center;
    padding: 2rem;
    height: 100%;
`

const InfoDiv = styled.div`
    display: grid;
    grid-template-columns: minmax(0px, 1fr) minmax(0px, 3fr);
    gap: 2rem;
    max-width: 100%;
    width: fit-content;
`

const CustomerInfo = styled.div`
    height: fit-content;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const LineItemInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const StatusArrows = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: stretch;
    align-items: center;
`

const LeftArrow = styled.div`
    margin-right: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background-color: #24446d;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    //
    position: relative;
    &:before {
        content: '';
        left: 100%;
        top: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        /* border-color: rgba(204, 204, 204, 0);
        border-left-color: #ccc;
        border-width: 28px; */
        margin-top: -28px;
    }
    &:after {
        content: '';
        left: 100%;
        top: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        border-color: rgba(255, 255, 255, 0);
        border-left-color: #24446d;
        border-width: 20px;
        margin-top: -20px;
    }
`

const RightArrow = styled.div`
    margin-left: 0.5rem;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background-color: #e5e5e5;
    border-radius: 5px;
`

const OrderInfo = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
`

const OrderDetails = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
`

const SingleInfo = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-top-width: 8px;
    border-top-color: #24446d;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 1rem;
`

export default RetLineItemDetails
