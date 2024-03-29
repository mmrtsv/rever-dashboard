import { useTheme } from '@itsrever/design-system'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ItemsIcon from '@mui/icons-material/SellOutlined'
import { ModelsReturnLineItem } from '@itsrever/dashboard-api'
import React from 'react'
import { ProductPreview } from './ProductPreview'

interface ItemSummaryProps {
    products: ModelsReturnLineItem[]
}

const ItemSummary: React.FC<ItemSummaryProps> = ({ products }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <ItemsDiv>
            <div className="mb-6 flex items-center">
                <ItemsIcon
                    style={{
                        color: `${theme.colors.grey[0]}`
                    }}
                />
                <p className="text-grey-1 ml-2 text-lg">
                    {t('summary.items_title')}
                </p>
            </div>
            {products.map((prod, i) => {
                return <ProductPreview product={prod} key={i} />
            })}
        </ItemsDiv>
    )
}

export default ItemSummary

const ItemsDiv = styled.div``
