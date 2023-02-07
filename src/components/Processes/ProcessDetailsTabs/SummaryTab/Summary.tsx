import React from 'react'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import ReturnProductSummary from './ReturnProductSummary'
import { formatPrice } from '../../../../utils'
import { useTheme } from '@itsrever/design-system'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SwapIcon from '@mui/icons-material/SwapHoriz'
import SummaryIcon from '@mui/icons-material/PostAdd'
import ItemsIcon from '@mui/icons-material/Sell'
import device from '@/utils/device'
import {
    RefundTimings,
    ReturnStatus
} from '@/redux/features/generalData/generalDataSlice'

interface SummaryProps {
    process?: ModelsPublicReturnProcess
}

const Summary: React.FC<SummaryProps> = ({ process }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const customer = process?.customer

    const moneyFormat = process?.currency_money_format ?? {}

    const updatedSummary =
        process?.refund_timing === RefundTimings.OnItemVerified && // ON_ITEM_VERIFIED
        process?.status === ReturnStatus.Completed

    let lineItems = process?.line_items
    let couponRefundAmount = process?.coupon_refund_amount
    let giftCardRefundAmount = process?.gift_refund_amount
    let bankTransferRefundAmount = process?.bank_transfer_refund_amount
    let originalRefundAmount = process?.original_pm_refund_amount

    if (updatedSummary) {
        lineItems = process?.approved_line_items
        couponRefundAmount = process?.executed_coupon
        giftCardRefundAmount = process?.executed_gift
        bankTransferRefundAmount = process?.executed_bank_transfer
        originalRefundAmount = process?.executed_original_pm
    }

    const totalRefund =
        (couponRefundAmount ?? 0) +
        (giftCardRefundAmount ?? 0) +
        (bankTransferRefundAmount ?? 0) +
        (originalRefundAmount ?? 0)

    const finalBalance = formatPrice(totalRefund, moneyFormat)

    const totalPrice = () => {
        let totalPrice = 0
        if (lineItems) {
            lineItems.forEach((lineItem) => {
                if (lineItem.type === 'product' && lineItem.total) {
                    totalPrice += lineItem.total
                }
            })
        }
        return totalPrice
    }

    const newOrderId = process?.exchange_order_number
    const exchangedItems = lineItems?.filter(
        (litem) => litem.type === 'cost' && litem.pending_purchase === true
    )

    return (
        <MainDiv>
            <SummaryDiv>
                <div className="flex items-center">
                    <SummaryIcon
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <h3 className="text-grey-1 ml-2 text-lg">
                        {t('summary.summary_title')}
                    </h3>
                </div>
                <FinanceSummary>
                    {typeof finalBalance === 'string' && (
                        <div className="mt-6 flex w-full justify-between">
                            <p>{t('summary.total')}</p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(
                                        totalPrice(),
                                        moneyFormat
                                    )
                                }}
                            />
                        </div>
                    )}

                    {lineItems &&
                        lineItems.map((retLineItem, i) => {
                            if (
                                retLineItem.type === 'cost' &&
                                retLineItem.name &&
                                retLineItem.total
                            ) {
                                return (
                                    <div
                                        key={i}
                                        className="flex w-full justify-between"
                                    >
                                        <p>{retLineItem.name}:</p>
                                        <p
                                            style={{
                                                color:
                                                    retLineItem.total >= 0
                                                        ? theme.colors.common
                                                              .black
                                                        : theme.colors.error
                                                              .main
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: formatPrice(
                                                    retLineItem.total,
                                                    moneyFormat
                                                )
                                            }}
                                        ></p>
                                    </div>
                                )
                            }
                        })}

                    {couponRefundAmount != 0 && (
                        <div className="flex justify-between">
                            <p>{t('summary.coupon_amount')}</p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(
                                        couponRefundAmount ?? 0,
                                        moneyFormat
                                    )
                                }}
                            />
                        </div>
                    )}

                    {giftCardRefundAmount != 0 && (
                        <div className="flex justify-between">
                            <p>{t('summary.gift_card_amount')}</p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(
                                        giftCardRefundAmount ?? 0,
                                        moneyFormat
                                    )
                                }}
                            />
                        </div>
                    )}

                    {bankTransferRefundAmount != 0 && (
                        <div className="flex justify-between">
                            <p>{t('summary.bank_transfer_amount')}</p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(
                                        bankTransferRefundAmount ?? 0,
                                        moneyFormat
                                    )
                                }}
                            />
                        </div>
                    )}

                    {originalRefundAmount != 0 && (
                        <div className="flex w-full justify-between">
                            <p>{t('summary.OPM_amount')}</p>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatPrice(
                                        originalRefundAmount ?? 0,
                                        moneyFormat
                                    )
                                }}
                            />
                        </div>
                    )}

                    {typeof finalBalance === 'string' && (
                        <div className="flex justify-between">
                            <p>
                                <b>{t('summary.final_balance')}</b>
                            </p>
                            <p
                                style={{
                                    color: theme.colors.success.main
                                }}
                            >
                                <b
                                    dangerouslySetInnerHTML={{
                                        __html: finalBalance
                                    }}
                                />
                            </p>
                        </div>
                    )}
                </FinanceSummary>
                {newOrderId && (
                    <ExchangesDiv>
                        <div className="flex flex-row items-center">
                            <SwapIcon
                                style={{
                                    color: `${theme.colors.grey[0]}`
                                }}
                            />
                            <h3 className="text-grey-1 ml-2 text-lg">
                                {t('summary.exchanges_title')}
                            </h3>
                        </div>
                        <div className="mt-6 grid w-fit grid-cols-2 items-center gap-4">
                            <h6>
                                <b>{t('summary.new_order_id')}</b>
                            </h6>
                            <h6>
                                <b>{t('summary.email')}</b>
                            </h6>
                            <hr
                                className="col-span-3"
                                style={{
                                    border: `0.5px solid ${theme.colors.grey[2]}`
                                }}
                            />
                            <h6>{newOrderId}</h6>
                            <h6>{customer?.email}</h6>
                        </div>
                        <h6 className="mt-6">
                            <b>{t('summary.new_items')}</b>
                        </h6>
                        {exchangedItems?.map((item, i) => {
                            return <h6 key={i}>{item.name}</h6>
                        })}
                    </ExchangesDiv>
                )}
            </SummaryDiv>
            <ItemsDiv>
                <div className="mb-6 flex items-center">
                    <ItemsIcon
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <h3 className="text-grey-1 ml-2 text-lg">
                        {t('summary.items_title')}
                    </h3>
                </div>
                {lineItems?.map((lineItem, i) => {
                    if (lineItem.type != 'cost') {
                        return (
                            <ReturnProductSummary LineItem={lineItem} key={i} />
                        )
                    }
                })}
            </ItemsDiv>
        </MainDiv>
    )
}

export default Summary

const MainDiv = styled.div`
    padding: 2rem;
    background-color: rgb(238, 238, 238);
    height: 100%;
    display: flex;
    flex-direction: column;
    @media ${device.md} {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`

const FinanceSummary = styled.div`
    width: 100%;
    padding-right: 1rem;
    @media ${device.md} {
        margin-top: 0rem;
    }
`

const ItemsDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    @media ${device.md} {
        margin-left: 2rem;
        margin-top: 0;
    }
    @media ${device.lg} {
        margin-left: 4rem;
    }
`

const SummaryDiv = styled.div``

const ExchangesDiv = styled.div`
    margin-top: 3rem;
`
