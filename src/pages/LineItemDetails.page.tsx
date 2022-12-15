import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import useSearchLineItem from '../hooks/useSearchLineItem'

function RetLineItemDetails() {
    const reverID = window.location.pathname.split('/').pop()

    const { LineItem } = useSearchLineItem(reverID ?? '')

    const customerName =
        LineItem?.return_process?.customer?.first_name +
        ' ' +
        LineItem?.return_process?.customer?.last_name

    return (
        <PageComponent>
            <MainDiv>
                {LineItem && (
                    <InfoDiv>
                        <CustomerInfo>
                            <h6 className="flex justify-center">ES-9837</h6>
                            <span className="my-4 flex justify-center text-xs">
                                {customerName}
                            </span>
                            <hr />
                            <span className="mt-4 mb-1 text-xs">Address</span>
                            <span>C/ Francesc Macià 3, 6º piso</span>
                            <span className="mt-4 mb-1 text-xs">Email</span>
                            <a className="text-xs">dolores.crotal@gmail.com</a>
                            <span className="mt-4 mb-1 text-xs">
                                Return Date
                            </span>
                            <span>16/11/2022</span>
                            <span className="mt-4 mb-1 text-xs">Stage</span>
                            <span>Completed</span>
                            <span className="mt-4 mb-1 text-xs">Condition</span>
                            <span>Approved</span>
                        </CustomerInfo>
                        <LineItemInfo>
                            <StatusArrows>
                                <LeftArrow>Pending to Receive</LeftArrow>
                                <RightArrow>Completed</RightArrow>
                            </StatusArrows>
                        </LineItemInfo>
                    </InfoDiv>
                )}
            </MainDiv>
        </PageComponent>
    )
}

const MainDiv = styled.div`
    background-color: rgb(241, 245, 249);
    height: 100%;
    display: flex;
    justify-content: center;
`

const InfoDiv = styled.div`
    display: grid;
    grid-template-columns: minmax(0px, 1fr) minmax(0px, 3fr);
    gap: 1rem;
    width: 70%;
    padding-top: 4rem;
    height: fit-content;
`

const CustomerInfo = styled.div`
    padding: 1rem;
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
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const LeftArrow = styled.div`
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
    text-align: center;
`

const RightArrow = styled.div`
    width: 100%;
    text-align: center;
    padding: 1rem;
    border: 1px solid #ccc;
`

export default RetLineItemDetails
