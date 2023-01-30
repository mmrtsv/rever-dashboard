import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { formatPrice } from '../../../utils'
import { useTheme } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'
import NoAvailable from '../../../assets/images/noAvailable.png'
import styled from 'styled-components'
import { Sizes } from '../../../utils/device'

interface ProductPreviewProps {
    lineItem: ModelsPublicReturnLineItem
    showPrice?: boolean
    disabled?: boolean
    selectedQuantity?: number
    showQuantity?: boolean
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
    lineItem,
    showPrice = true,
    disabled = false,
    selectedQuantity,
    showQuantity = true
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    let imgSrc = NoAvailable
    if (lineItem.product_image_url)
        imgSrc = lineItem.product_image_url ?? NoAvailable

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
        <MainDiv selectedQuantity={selectedQuantity}>
            <div className="h-fit w-16">
                <img src={imgSrc} />
            </div>
            <div className="mr-6 ml-4">
                <p
                    className="text-xs"
                    style={disabled ? { color: theme.colors.grey[2] } : {}}
                >
                    {lineItem.name}
                </p>
                {showPrice && productPrice && (
                    <p
                        className="mt-0.5"
                        dangerouslySetInnerHTML={{ __html: productPrice }}
                        style={disabled ? { color: theme.colors.grey[2] } : {}}
                    />
                )}
                {lineItem.quantity && showQuantity && (
                    <>
                        <span className="text-grey-2 text-xs">
                            {t('summary.quantity')}
                        </span>
                        <span
                            className="text-xs"
                            style={
                                disabled ? { color: theme.colors.grey[2] } : {}
                            }
                        >
                            {selectedQuantity
                                ? selectedQuantity > 0 &&
                                  selectedQuantity + ' / '
                                : ''}
                            {lineItem.quantity}
                        </span>
                    </>
                )}
                <p
                    className="mt-0.5"
                    style={disabled ? { color: theme.colors.grey[2] } : {}}
                >
                    {lineItem.variant_name}
                </p>
            </div>
        </MainDiv>
    )
}

export default ProductPreview

interface MainProps {
    selectedQuantity: number | undefined
}

const MainDiv = styled.div<MainProps>`
    display: flex;
    width: fit-content;
    flex-direction: row;
    padding-left: 1rem;
    padding-right: 1rem;
    // Below md
    @media (max-width: ${Sizes.md}) {
        padding-bottom: ${(p) => (p.selectedQuantity ? '1.25rem' : undefined)};
    }
`
