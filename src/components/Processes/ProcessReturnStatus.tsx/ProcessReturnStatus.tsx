import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ReportIcon from '@mui/icons-material/Report'
import Transit from '@mui/icons-material/AirlineStops'
import { SuccessIcon, ErrorIcon } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'

export const ShippingStatuses = [
    {
        name: 'STARTED',
        color: '#63a2f4',
        text: 'started'
    },
    {
        name: 'COLLECTED',
        color: '#ffd580',
        text: 'collected'
    },
    {
        name: 'REVIEW_REQUIRED',
        color: '#9F2B68',
        text: 'review_required'
    },
    {
        name: 'COMPLETED',
        color: '#00b0a6',
        text: 'completed'
    }
]

interface ProcessReturnStatusProps {
    status: string | undefined
}

const ProcessReturnStatus: React.FC<ProcessReturnStatusProps> = ({
    status
}) => {
    const { t } = useTranslation()
    return (
        <StatusDiv>
            {status === 'STARTED' ? (
                <AccessTimeIcon
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { name: status })?.color
                        }`
                    }}
                />
            ) : status === 'COLLECTED' ? (
                <Transit
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { name: status })?.color
                        }`
                    }}
                />
            ) : status === 'REVIEW_REQUIRED' ? (
                <ReportIcon
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { name: status })?.color
                        }`
                    }}
                />
            ) : status === 'COMPLETED' ? (
                <SuccessIcon
                    data-testid="SuccessIcon"
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { name: status })?.color
                        }`
                    }}
                />
            ) : (
                <ErrorIcon
                    style={{
                        color: `${
                            _.find(ShippingStatuses, { name: status })?.color
                        }`
                    }}
                />
            )}
            <p
                className="ml-2 text-center"
                style={{
                    color: `${
                        _.find(ShippingStatuses, { name: status })?.color
                    }`
                }}
            >
                {t(
                    `return_status.${
                        _.find(ShippingStatuses, { name: status })?.text
                    }`
                )}
            </p>
        </StatusDiv>
    )
}

export default ProcessReturnStatus

const StatusDiv = styled.div`
    display: flex;
    align-items: center;
    z-index: 50;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem;
`
