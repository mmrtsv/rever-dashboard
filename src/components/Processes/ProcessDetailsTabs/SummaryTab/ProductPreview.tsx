import React from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { formatPrice, checkImage } from '@/utils'
import { useTranslation } from 'react-i18next'
import NoAvailable from '@/assets/images/noAvailable.png'
import styled from 'styled-components'

interface ProductPreviewProps {
    lineItem: ModelsPublicReturnLineItem
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ lineItem }) => {
    const { t } = useTranslation()

    let imgSrc = NoAvailable
    if (lineItem.product_image_url) {
        imgSrc = checkImage(lineItem.product_image_url)
            ? lineItem.product_image_url
            : NoAvailable
    }

    // product price
    let productPrice = undefined
    if (
        lineItem?.total &&
        lineItem.quantity &&
        lineItem.return_process?.currency_money_format
    )
        productPrice = formatPrice(
            Math.round(lineItem.total / lineItem.quantity),
            lineItem.return_process?.currency_money_format
        )

    return (
        <MainDiv data-testid="ProductPreview">
            <div className="h-fit w-16">
                <img src={imgSrc} alt="ProductImage" />
            </div>
            <div className="mr-6 ml-4">
                <p className="text-xs">{lineItem.name}</p>
                {productPrice && (
                    <p
                        className="mt-0.5"
                        dangerouslySetInnerHTML={{ __html: productPrice }}
                    />
                )}
                {lineItem.quantity && (
                    <>
                        <span className="text-grey-2 text-xs">
                            {t('summary.quantity')}
                        </span>
                        <span className="text-xs">{lineItem.quantity}</span>
                    </>
                )}
                <p className="mt-0.5">{lineItem.variant_name}</p>
            </div>
        </MainDiv>
    )
}

export default ProductPreview

const MainDiv = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: row;
    padding-left: 1rem;
    padding-right: 1rem;
`
