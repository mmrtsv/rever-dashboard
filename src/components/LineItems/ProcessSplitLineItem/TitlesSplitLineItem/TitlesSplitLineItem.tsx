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
            <div className="flex w-fit flex-row items-center">
                {icon && icon}
                <p className="text-grey-1 ml-2 text-lg">{title && title}</p>
            </div>
            <TitlesDiv>
                <p className="text-center">
                    <b>{t('titles_item.image')}</b>
                </p>
                <DissapearingPL className="col-span-2">
                    <b>{t('titles_item.product_name')}</b>
                </DissapearingPL>
                <p className="text-center">
                    <b>{t('titles_item.price')}</b>
                </p>
                <p className="text-center">
                    <b>{t('titles_item.action')}</b>
                </p>
                <p className="text-center">
                    <b>{t('titles_item.status')}</b>
                </p>
            </TitlesDiv>
        </>
    )
}

export default TitlesSplitLineItem

const DissapearingPL = styled.p`
    @media (max-width: 599px) {
        display: none;
    }
`

const TitlesDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.5rem;
    padding: 1rem;
    @media ${device.md} {
        max-width: 80%;
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
`
