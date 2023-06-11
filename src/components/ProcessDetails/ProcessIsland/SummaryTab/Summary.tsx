import React from 'react'
import styled from 'styled-components'
import { moreThan, LineItemTypes } from '@/utils'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { RefundSummary } from './RefundSummary'
import { ExchangeSummary } from './ExchangeSummary'
import { ItemSummary } from './ItemSummary'

interface SummaryProps {
    process: ModelsPublicReturnProcess
}

export const SummaryTab: React.FC<SummaryProps> = ({ process }) => {
    const lineItems = process?.line_items
    const bankTransferRefundAmount = process?.bank_transfer_refund_amount
    const originalRefundAmount = process?.original_pm_refund_amount
    const giftCardRefundAmount = process?.gift_refund_amount

    const products =
        lineItems?.filter((litem) => litem.type === LineItemTypes.Product) ?? []
    const costs =
        lineItems?.filter((litem) => litem.type === LineItemTypes.Cost) ?? []
    const moneyFormat = process?.currency_money_format ?? {}

    const email = process?.customer?.email ?? ''
    const newOrderId = process?.exchange_order_number
    const exchangedItems =
        lineItems?.filter(
            (litem) =>
                litem.type === 'cost' &&
                litem.pending_purchase === true &&
                litem.quantity &&
                litem.quantity > 0
        ) ?? []

    return (
        <MainDiv>
            <RefundSummary
                products={products}
                costs={costs}
                moneyFormat={moneyFormat}
                bankTransferRefundAmount={bankTransferRefundAmount}
                originalRefundAmount={originalRefundAmount}
                giftCardRefundAmount={giftCardRefundAmount}
            />
            {newOrderId && (
                <ExchangeSummary
                    newOrderId={newOrderId}
                    email={email}
                    exchangedItems={exchangedItems}
                />
            )}
            <ItemSummary products={products} />
        </MainDiv>
    )
}

export default SummaryTab

const MainDiv = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    @media ${moreThan.xl} {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 3rem;
    }
`
