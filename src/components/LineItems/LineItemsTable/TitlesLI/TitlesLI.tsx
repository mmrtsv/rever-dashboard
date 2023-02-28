import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ArrowDown from '@mui/icons-material/ArrowDownward'

const TitlesGridLI = () => {
    const { t } = useTranslation()

    return (
        <div className="grid w-full grid-cols-3 p-4 md:grid-cols-5 lg:grid-cols-7">
            <DissapearingH6M className="flex items-center justify-center">
                <b className="mr-2"> {t('order_details.date')}</b>
                <ArrowDown />
            </DissapearingH6M>
            <h6 className="text-grey-1 text-center">
                <b>{t('order_details.order_id')}</b>
            </h6>
            <h6 className="text-grey-1 text-center">
                <b>{t('order_details.image')}</b>
            </h6>
            <DissapearingH6L className="text-grey-1 col-span-2">
                <b>{t('order_details.product_name')}</b>
            </DissapearingH6L>
            <DissapearingH6M className="text-grey-1">
                <b>{t('order_details.customer')}</b>
            </DissapearingH6M>
            <h6 className="text-grey-1 text-center">
                <b>{t('order_details.status')}</b>
            </h6>
        </div>
    )
}

export default TitlesGridLI

const DissapearingH6L = styled.h6`
    text-align: center;
    @media (max-width: 899px) {
        display: none;
    }
`

const DissapearingH6M = styled.h6`
    text-align: center;
    @media (max-width: 599px) {
        display: none;
    }
`
