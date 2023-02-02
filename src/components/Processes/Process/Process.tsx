import React from 'react'
import styled from 'styled-components'
import ReviewStatus from '../ProcessReviewStatus/ProcessReviewStatus'
import ShippingStatus from '../../ShippingStatus'
import { Link } from 'react-router-dom'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { Sizes } from '../../../utils/device'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../redux/hooks'
import { getDate } from '../../../utils'

export interface ProcessProps {
    Process: ModelsPublicReturnProcess
    first?: boolean
    last?: boolean
}

const Process: React.FC<ProcessProps> = ({ Process, first, last }) => {
    const { i18n } = useTranslation()
    const lineItems = Process.line_items
    const products = lineItems?.filter((item) => item.type === 'product')

    let totalItems = 0
    products?.forEach((prod) => (totalItems += prod.quantity ?? 0))

    const ecommercesLength = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces?.length
    )

    let returnDate = ''
    if (Process.started_at?.seconds) {
        returnDate = getDate(Process.started_at.seconds, i18n.language)
    }

    const originalPM = Process.line_items?.some(
        (litem) => litem.refund_payment_method === 2
    )
    const showReviewStatus =
        Process.last_known_shipping_status === 3 &&
        Process.refund_timing === 3 &&
        Process.status != 1 &&
        Process.status != 3 &&
        originalPM

    const reviewStatus = Process.status === 0 ? 0 : 1

    return (
        <ProcessCard
            key={Process.process_id}
            className="cursor-pointer"
            first={first}
            last={last}
        >
            <Link to={`/return/${Process.process_id}`}>
                <Box ecomLength={ecommercesLength}>
                    <TextBoxes>{returnDate && returnDate}</TextBoxes>
                    <TextBoxes>{Process.customer_printed_order_id}</TextBoxes>
                    {ecommercesLength && ecommercesLength > 1 && (
                        <TextBoxes>{Process.ecommerce_id}</TextBoxes>
                    )}
                    <TextBoxes>
                        {totalItems > 1
                            ? totalItems + ' items'
                            : totalItems + ' item'}
                    </TextBoxes>
                    <TextBoxes data-testid="Name">
                        {Process.customer?.first_name +
                            ' ' +
                            Process.customer?.last_name}
                    </TextBoxes>
                    <StatusBox>
                        {showReviewStatus ? (
                            <ReviewStatus status={reviewStatus} />
                        ) : (
                            <ShippingStatus
                                status={Process.last_known_shipping_status}
                            />
                        )}
                    </StatusBox>
                </Box>
            </Link>
        </ProcessCard>
    )
}

export default Process

interface BoxProps {
    ecomLength: number | undefined
}

const Box = styled.div<BoxProps>`
    display: grid;
    grid-template-columns: ${(p) =>
        p.ecomLength && p.ecomLength > 1
            ? 'repeat(6, minmax(0, 1fr))'
            : 'repeat(5, minmax(0, 1fr))'};
    align-items: center;
    width: 100%;
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

const ProcessCard = styled.div<CardProps>`
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
    @media (max-width: ${Sizes.md}) {
        padding: 1rem;
    }
`
