import SummaryIcon from '@mui/icons-material/PostAdd'
import { useTheme } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { formatPrice } from '@/utils'
import {
    ModelsReturnLineItem,
    ModelsMoneyFormat
} from '@itsrever/dashboard-api'

interface RefundSummaryProps {
    products: ModelsReturnLineItem[]
    costs: ModelsReturnLineItem[]
    moneyFormat: ModelsMoneyFormat
    bankTransferRefundAmount?: number
    originalRefundAmount?: number
    giftCardRefundAmount?: number
}

const RefundSummary: React.FC<RefundSummaryProps> = ({
    products,
    costs,
    moneyFormat,
    bankTransferRefundAmount,
    originalRefundAmount,
    giftCardRefundAmount
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const totalPrice = () => {
        let totalPrice = 0
        if (products) {
            products.forEach((prod) => {
                if (prod.total) {
                    totalPrice += prod.total
                }
            })
        }
        return totalPrice
    }

    const totalRefund =
        (giftCardRefundAmount ?? 0) +
        (bankTransferRefundAmount ?? 0) +
        (originalRefundAmount ?? 0)
    const finalBalance = formatPrice(totalRefund, moneyFormat)

    const getCostColor = (cost: number) => {
        if (cost < 0) {
            return theme.colors.error.main
        }
        return theme.colors.common.black
    }

    return (
        <div className="mb-8">
            <div className="flex items-center">
                <SummaryIcon
                    style={{
                        color: `${theme.colors.grey[0]}`
                    }}
                />
                <p className="text-grey-1 ml-2 text-lg">
                    {t('summary.summary_title')}
                </p>
            </div>
            <SummaryLine className="mt-6">
                <p>{t('summary.total')}</p>
                <p>{formatPrice(totalPrice(), moneyFormat)}</p>
            </SummaryLine>
            {costs &&
                costs.map((cost, i) => {
                    if (cost.name && cost.total) {
                        return (
                            <SummaryLine key={i}>
                                <p>{cost.name}:</p>
                                <p
                                    style={{
                                        color: getCostColor(cost.total)
                                    }}
                                >
                                    {formatPrice(cost.total, moneyFormat)}
                                </p>
                            </SummaryLine>
                        )
                    }
                })}
            {bankTransferRefundAmount ? (
                <SummaryLine>
                    <p>{t('summary.bank_transfer_amount')}</p>
                    <p>
                        {formatPrice(
                            bankTransferRefundAmount ?? 0,
                            moneyFormat
                        )}
                    </p>
                </SummaryLine>
            ) : null}
            {giftCardRefundAmount ? (
                <SummaryLine>
                    <p>{t('summary.gift_card_amount')}</p>
                    <p>{formatPrice(giftCardRefundAmount ?? 0, moneyFormat)}</p>
                </SummaryLine>
            ) : null}
            {originalRefundAmount ? (
                <SummaryLine>
                    <p>{t('summary.OPM_amount')}</p>
                    <p>{formatPrice(originalRefundAmount ?? 0, moneyFormat)}</p>
                </SummaryLine>
            ) : null}

            <SummaryLine>
                <p>
                    <b>{t('summary.final_balance')}</b>
                </p>
                <p
                    style={{
                        color: theme.colors.success.main
                    }}
                >
                    <b>{finalBalance}</b>
                </p>
            </SummaryLine>
        </div>
    )
}

export default RefundSummary

const SummaryLine = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
`
