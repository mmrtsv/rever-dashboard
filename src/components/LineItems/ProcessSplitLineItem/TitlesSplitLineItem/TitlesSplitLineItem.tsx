import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { lessThan, moreThan } from '@/utils'

const TitlesSplitLineItem = () => {
    const { t } = useTranslation()
    return (
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
        </TitlesDiv>
    )
}

export default TitlesSplitLineItem

const DissapearingPL = styled.p`
    @media ${lessThan.md} {
        display: none;
    }
`

const TitlesDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    padding: 1rem;
    @media ${moreThan.md} {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
`
