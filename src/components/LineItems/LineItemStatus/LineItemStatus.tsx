import React from 'react'
import _ from '../../../@lodash/@lodash'
import styled from 'styled-components'
import { SuccessIcon, ErrorIcon } from '@itsrever/design-system'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'

export const ItemStatuses = [
    {
        enum: 0,
        name: 'ACCEPTED',
        color: '#00b0a6',
        text: 'accepted'
    },
    {
        enum: 1,
        name: 'DECLINED',
        color: '#ff5962',
        text: 'declined'
    },
    {
        enum: 2,
        name: 'MISSING',
        color: '#ffd580',
        text: 'missing'
    }
]

interface ShippingStatusProps {
    status: number | undefined
}

const ReviewItemStatus: React.FC<ShippingStatusProps> = ({ status }) => {
    const { t } = useTranslation()
    return (
        <StatusDiv>
            {status === 0 ? (
                <SuccessIcon
                    data-testid="SuccessIcon"
                    style={{
                        color: `${
                            _.find(ItemStatuses, { enum: status })?.color
                        }`
                    }}
                />
            ) : status === 1 ? (
                <ErrorIcon
                    data-testid="ErrorIcon"
                    style={{
                        color: `${
                            _.find(ItemStatuses, { enum: status })?.color
                        }`
                    }}
                />
            ) : (
                <SearchIcon
                    style={{
                        color: `${
                            _.find(ItemStatuses, { enum: status })?.color
                        }`
                    }}
                />
            )}
            <p
                className="ml-2 text-center"
                style={{
                    color: `${_.find(ItemStatuses, { enum: status })?.color}`
                }}
            >
                {t(
                    `line_item_review_status.${
                        _.find(ItemStatuses, { enum: status })?.text
                    }`
                )}
            </p>
        </StatusDiv>
    )
}

export default ReviewItemStatus

const StatusDiv = styled.div`
    display: flex;
    align-items: center;
    z-index: 50;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem;
`
