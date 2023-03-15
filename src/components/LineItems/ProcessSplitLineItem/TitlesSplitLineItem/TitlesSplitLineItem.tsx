import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import device from '@/utils/device'

interface TitlesProps {
    title?: string
    icon?: React.ReactNode
}

const TitlesSplitLineItem: React.FC<TitlesProps> = ({ title, icon }) => {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex flex-row items-center">
                {icon && <>{icon}</>}
                <h3 className="text-grey-1 ml-2 text-lg">{title && title}</h3>
            </div>
            <TitlesDiv>
                <h6 className="text-grey-1 text-center">
                    <b>{t('order_details.image')}</b>
                </h6>
                <DissapearingH6L className="text-grey-1 col-span-2">
                    <b>{t('order_details.product_name')}</b>
                </DissapearingH6L>
                <h6 className="text-grey-1 text-center">
                    <b>{t('order_details.price')}</b>
                </h6>
                <h6 className="text-grey-1 text-center">
                    <b>{t('order_details.status')}</b>
                </h6>
            </TitlesDiv>
        </>
    )
}

export default TitlesSplitLineItem

const DissapearingH6L = styled.h6`
    @media (max-width: 899px) {
        display: none;
    }
`

const TitlesDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    padding: 1rem;
    @media ${device.md} {
        max-width: 70%;
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
`
