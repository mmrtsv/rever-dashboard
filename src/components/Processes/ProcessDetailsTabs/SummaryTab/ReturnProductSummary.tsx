import React from 'react'
import { ModelsReturnLineItem } from '@itsrever/dashboard-api'
import { useTranslation } from 'react-i18next'
import ProductPreview from './ProductPreview'

interface ReturnProductSummaryProps {
    LineItem: ModelsReturnLineItem
}

const ReturnProductSummary: React.FC<ReturnProductSummaryProps> = (
    LineItem
) => {
    const { t } = useTranslation()
    const lineItem = LineItem.LineItem
    const itemToExchange = lineItem.action === 1 // To exchange

    const productReturnReason = lineItem.product_return_reason

    return (
        <div
            data-testid="RetProductSummary"
            className="flex w-fit flex-col  items-center"
        >
            <ProductPreview lineItem={lineItem} />
            <div className="mt-2 mb-4 w-full">
                <span className="text-grey-2 text-xs">
                    {itemToExchange
                        ? t('summary.reason_exchange')
                        : t('summary.reason_refund')}
                </span>
                {productReturnReason && (
                    <span className="text-xs">
                        {t(`select_reason.${productReturnReason}`)}
                    </span>
                )}
            </div>
            <hr className="mb-4 w-full" />
        </div>
    )
}

export default ReturnProductSummary
