import React from 'react'
import _ from '../../../@lodash/@lodash'
import styled from 'styled-components'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { SuccessIcon } from '@itsrever/design-system'

export const ReviewStatuses = [
    {
        enum: 0,
        name: 'PENDING',
        color: '#9F2B68', //F8BB3D
        text: 'Action required'
    },
    {
        enum: 1,
        name: 'REVIEWED',
        color: '#00b0a6',
        text: 'Reviewed'
    }
]

interface ShippingStatusProps {
    status: number | undefined
}

const ReviewStatus: React.FC<ShippingStatusProps> = ({ status }) => {
    return (
        <StatusDiv>
            {status === 0 ? (
                <AccessTimeIcon
                    style={{
                        color: `${
                            _.find(ReviewStatuses, { enum: status })?.color
                        }`
                    }}
                />
            ) : (
                <SuccessIcon
                    data-testid="SuccessIcon"
                    style={{
                        color: `${
                            _.find(ReviewStatuses, { enum: status })?.color
                        }`
                    }}
                />
            )}
            <p
                className="ml-2 text-center"
                style={{
                    color: `${_.find(ReviewStatuses, { enum: status })?.color}`
                }}
            >
                {_.find(ReviewStatuses, { enum: status })?.text}
            </p>
        </StatusDiv>
    )
}

export default ReviewStatus

const StatusDiv = styled.div`
    display: flex;
    align-items: center;
    z-index: 50;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem;
`
