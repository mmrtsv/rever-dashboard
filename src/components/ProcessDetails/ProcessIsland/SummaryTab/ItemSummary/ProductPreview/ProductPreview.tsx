import { ModelsReturnLineItem } from '@itsrever/dashboard-api'
import styled from 'styled-components'
import { RefundActions } from '@/utils'
import NoAvailable from '@/assets/images/noAvailable.png'
import { useTranslation } from 'react-i18next'

interface ProductPreviewProps {
    product: ModelsReturnLineItem
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {
    const { t } = useTranslation()

    let imgSrc = NoAvailable
    if (product.product_image_url) {
        imgSrc = product.product_image_url
    }

    const returnReason = product.product_return_reason

    return (
        <div data-testid="ProductPreview" className="w-fit">
            <Preview>
                <div className="h-fit w-16">
                    <img src={imgSrc} alt="ProductImage" />
                </div>
                <div className="mr-6 ml-4">
                    <p className="text-xs">{product.name}</p>
                    {product.quantity && (
                        <>
                            <span className="text-grey-2 text-xs">
                                {t('summary.quantity')}
                            </span>
                            <span className="text-xs">{product.quantity}</span>
                        </>
                    )}
                    <p className="mt-0.5">{product.variant_name}</p>
                </div>
            </Preview>
            <div className="mt-2 mb-4 w-full">
                <span className="text-grey-2 text-xs">
                    {product.action === RefundActions.ToExchange
                        ? t('summary.reason_exchange')
                        : t('summary.reason_refund')}
                </span>
                {returnReason && (
                    <span className="text-xs">
                        {t(`select_reason.${returnReason}`)}
                    </span>
                )}
            </div>
            <hr className="mb-4 w-full" />
        </div>
    )
}

export default ProductPreview

const Preview = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: row;
    padding-left: 1rem;
    padding-right: 1rem;
`
