import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '../../../ShippingStatus'
import AccessTime from '@mui/icons-material/AccessTime'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useTheme } from '@itsrever/design-system'
import device from '@/utils/device'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/redux/hooks'
import ProcessReturnStatus from '../../ProcessReturnStatus.tsx/ProcessReturnStatus'

const DetailsTab = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const responseProcess = useAppSelector(
        (store) => store.processesApi.getProcess.response.processes
    )
    const process =
        responseProcess && responseProcess?.length > 0
            ? responseProcess[0]
            : undefined

    const customer = process?.customer

    const address = process?.drop_off_address
        ? process.drop_off_address
        : process?.pickup_address

    const showReturnStatus =
        process?.return_status === 'REVIEW_REQUIRED' ||
        process?.return_status === 'COMPLETED'

    const trackingId = process?.tracking_id
    const trackingUrl = process?.tracking_url

    return (
        <ProductDetailsDiv>
            <CustomerInfoDiv>
                <div className="flex flex-row items-center lg:mt-0">
                    <AccountCircleOutlinedIcon
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <h3 className="text-grey-1 ml-2 text-lg">
                        {t('order_details.customer')}
                    </h3>
                </div>
                <CustomerTable>
                    <h6>
                        <b>{t('order_details.name')}</b>
                    </h6>
                    <h6>
                        <b>{t('order_details.email')}</b>
                    </h6>
                    <h6>
                        <b>{t('order_details.phone')}</b>
                    </h6>
                    <hr
                        className="col-span-3"
                        style={{
                            color: theme.colors.grey[2]
                        }}
                    />
                    <TableValue>
                        {customer &&
                            customer?.first_name + ' ' + customer?.last_name}
                    </TableValue>
                    <TableValue>{customer && customer?.email}</TableValue>
                    <TableValue>{address && address.phone}</TableValue>
                </CustomerTable>
                <h6 className="mt-8 grid grid-cols-1">
                    <b>{t('order_details.address')}</b>
                </h6>
                <div className="mt-2">
                    <h6>{address && address?.address_line_1}</h6>
                    <h6>{address && address?.address_line_2}</h6>
                    <h6>
                        {address &&
                            address?.city +
                                ', ' +
                                address?.postcode +
                                ', ' +
                                address?.country}
                    </h6>
                </div>
            </CustomerInfoDiv>
            <OrderStatusDiv>
                <div className="flex flex-row items-center">
                    <AccessTime
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <h3 className="text-grey-1 ml-2 text-lg">
                        {t('order_details.order_status')}
                    </h3>
                </div>
                <StatusTable>
                    <h6>
                        <b>{t('order_details.order')}</b>
                    </h6>
                    <h6>
                        <b>ID</b>
                    </h6>
                    <h6>
                        <b>{t('order_details.status')}</b>
                    </h6>
                    <hr
                        className="col-span-3"
                        style={{
                            color: theme.colors.grey[2]
                        }}
                    />
                    <TableValue>
                        {t('order_details.shipping_status')}
                    </TableValue>
                    {trackingUrl ? (
                        <TrackingLink
                            color={theme.colors.primary.dark}
                            href={trackingUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {trackingId
                                ? trackingId
                                : t('order_details.shipping_status')}
                        </TrackingLink>
                    ) : (
                        <h6 className="overflow-scroll">
                            {t('order_details.shipping_status')}
                        </h6>
                    )}
                    <div className="truncate">
                        <ShippingStatus
                            status={process?.last_known_shipping_status}
                        />
                    </div>

                    {showReturnStatus && (
                        <>
                            <hr
                                className="col-span-3"
                                style={{
                                    color: theme.colors.grey[2]
                                }}
                            />
                            <TableValue>
                                {t('order_details.return_status')}
                            </TableValue>
                            <TableValue>{process?.process_id}</TableValue>
                            <div className="truncate">
                                <ProcessReturnStatus
                                    status={process?.return_status}
                                />
                            </div>
                        </>
                    )}
                </StatusTable>
            </OrderStatusDiv>
        </ProductDetailsDiv>
    )
}

export default DetailsTab

const StatusTable = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: center;
    width: fit-content;
    row-gap: 1rem;
    column-gap: 2rem;
    white-space: nowrap;
`

const TableValue = styled.h6`
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

interface TrackingProps {
    color?: string
}

const TrackingLink = styled.a<TrackingProps>`
    color: ${(p) => p.color};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const CustomerInfoDiv = styled.div``

const CustomerTable = styled.div`
    margin-top: 2rem;
    display: grid;
    width: fit-content;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 1rem;
    column-gap: 2rem;
    white-space: nowrap;
`

const OrderStatusDiv = styled.div`
    @media (max-width: 899px) {
        margin-top: 3rem;
    }
`

const ProductDetailsDiv = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    @media ${device.lg} {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }
`
