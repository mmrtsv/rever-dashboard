import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ArrowDown from '@mui/icons-material/ArrowDownward'

const TitlesGridLI = () => {
    const { t } = useTranslation()

    return (
        <div className="grid w-full grid-cols-3 p-4 md:grid-cols-5 lg:grid-cols-8">
            <DisapearingPM className="flex items-center justify-center">
                <b className="mr-2">{t('titles_li.date')}</b>
                <ArrowDown />
            </DisapearingPM>
            <p className="text-grey-1 text-center">
                <b>{t('titles_li.order_id')}</b>
            </p>
            <p className="text-grey-1 text-center">
                <b>{t('titles_li.image')}</b>
            </p>
            <DisapearingPM className="text-grey-1 text-center">
                <b>{t('titles_li.quantity')}</b>
            </DisapearingPM>
            <DisapearingPL className="text-grey-1 col-span-2">
                <b>{t('titles_li.product_name')}</b>
            </DisapearingPL>
            <DisapearingPL className="text-grey-1">
                <b>{t('titles_li.customer')}</b>
            </DisapearingPL>
            <p className="text-grey-1 text-center">
                <b>{t('titles_li.status')}</b>
            </p>
        </div>
    )
}

export default TitlesGridLI

const DisapearingPL = styled.p`
    text-align: center;
    @media (max-width: 899px) {
        display: none;
    }
`

const DisapearingPM = styled.p`
    text-align: center;
    @media (max-width: 599px) {
        display: none;
    }
`
