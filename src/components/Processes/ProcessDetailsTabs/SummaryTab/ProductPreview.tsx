import React from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
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
        imgSrc = lineItem.product_image_url
    }

    return (
        <MainDiv data-testid="ProductPreview">
            <div className="h-fit w-16">
                <img src={imgSrc} alt="ProductImage" />
            </div>
            <div className="mr-6 ml-4">
                <p className="text-xs">{lineItem.name}</p>
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
