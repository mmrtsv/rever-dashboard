import React from 'react'
import _ from '../../@lodash/@lodash'
import styled from 'styled-components'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Transit from '@mui/icons-material/AirlineStops'
import { SuccessIcon, ErrorIcon } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'

export const ShippingStatuses = [
    {
        enum: 0,
        name: 'NO_SHIPPING_STATUS',
        color: '#B3B3B3',
        text: 'no_status'
    },
    {
        enum: 1,
        name: 'CREATED',
        color: '#63a2f4',
        text: 'created'
    },
    {
        enum: 2,
        name: 'COLLECTED',
        color: '#ffd580',
        text: 'collected'
    },
    {
        enum: 3,
        name: 'IN_WAREHOUSE',
        color: '#00b0a6',
        text: 'in_warehouse'
    },
    {
        enum: 4,
        name: 'ERROR',
        color: '#ff5962',
        text: 'error'
    },
    {
        enum: 5,
        name: 'CANCELED',
        color: '#ff5962',
        text: 'canceled'
    }
]

interface ShippingStatusProps {
    status: number | undefined
}

const ShippingStatus: React.FC<ShippingStatusProps> = ({ status }) => {
    const { t } = useTranslation()
    return (
        <StatusDiv>
            <p
                className="mr-2 text-center"
                style={{
                    color: `${
                        _.find(ShippingStatuses, { enum: status })?.color
                    }`
                }}
            >
                {t(
                    `shipping_status.${
                        _.find(ShippingStatuses, { enum: status })?.text
                    }`
                )}
            </p>
            {status === 0 ? (
                <AccessTimeIcon
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { enum: status })?.color
                        }`
                    }}
                />
            ) : status === 1 ? (
                <AccessTimeIcon
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { enum: status })?.color
                        }`
                    }}
                />
            ) : status === 2 ? (
                <Transit
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { enum: status })?.color
                        }`
                    }}
                />
            ) : status === 3 ? (
                <SuccessIcon
                    data-testid="SuccessIcon"
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { enum: status })?.color
                        }`
                    }}
                />
            ) : (
                <ErrorIcon
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { enum: status })?.color
                        }`
                    }}
                />
            )}
        </StatusDiv>
    )
}

export default ShippingStatus

const StatusDiv = styled.div`
    display: flex;
    align-items: center;
    z-index: 50;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem;
`
