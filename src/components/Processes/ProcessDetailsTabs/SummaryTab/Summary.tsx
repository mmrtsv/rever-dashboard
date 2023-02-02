import React from 'react'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import ReturnProductSummary from './ReturnProductSummary'
import { formatPrice } from '../../../../utils'
import { useTheme } from '@itsrever/design-system'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface SummaryProps {
    process?: ModelsPublicReturnProcess
}

const Summary: React.FC<SummaryProps> = ({ process }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const moneyFormat = process?.currency_money_format ?? {}

    const totalRefund = formatPrice(
        process?.total_refund_amount || 0,
        moneyFormat
    )

    const totalPrice = () => {
        let totalPrice = 0
        if (process?.line_items) {
            process?.line_items.forEach((lineItem) => {
                if (lineItem.type === 'product' && lineItem.total) {
                    totalPrice += lineItem.total
                }
            })
        }
        return totalPrice
    }

    const couponRefundAmount = process?.coupon_refund_amount
    const giftCardRefundAmount = process?.gift_refund_amount
    const bankTransferRefundAmount = process?.bank_transfer_refund_amount
    const originalRefundAmount = process?.original_pm_refund_amount

    return (
        <MainDiv>
            <div>
                {process?.line_items?.map((lineItem, i) => {
                    if (lineItem.type != 'cost') {
                        return (
                            <ReturnProductSummary LineItem={lineItem} key={i} />
                        )
                    }
                })}
            </div>
            <FinanceSummary>
                {typeof totalRefund === 'string' && (
                    <div className="mt-6 flex w-full justify-between">
                        <p>{t('summary.total')}</p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: formatPrice(totalPrice(), moneyFormat)
                            }}
                        />
                    </div>
                )}

                {process?.line_items &&
                    process?.line_items.map((retLineItem, i) => {
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
                                                    ? theme.colors.common.black
                                                    : theme.colors.error.main
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

                {typeof totalRefund === 'string' && (
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
                                    __html: totalRefund
                                }}
                            />
                        </p>
                    </div>
                )}
            </FinanceSummary>
        </MainDiv>
    )
}

export default Summary

const MainDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    background-color: #eee;
    height: 100%;
`

const FinanceSummary = styled.div`
    width: 100%;
    margin-left: 1rem;
`
