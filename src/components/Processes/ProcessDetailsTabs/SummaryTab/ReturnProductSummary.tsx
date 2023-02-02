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
            className="relative ml-4 flex w-[297px] flex-col pt-4 md:w-[374px] lg:w-[400px] xl:w-[600px] xl:pt-8"
        >
            <ProductPreview lineItem={lineItem} />
            <div className="mt-2 mb-4">
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
            <hr />
        </div>
    )
}

export default ReturnProductSummary
