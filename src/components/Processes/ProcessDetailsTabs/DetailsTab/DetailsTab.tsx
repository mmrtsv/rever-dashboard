import React from 'react'
import styled from 'styled-components'
import ShippingStatus from '../../../ShippingStatus'
import AccessTime from '@mui/icons-material/AccessTime'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import OrderInfo from '@mui/icons-material/InfoOutlined'
import { useTheme, CollectionPoint, HomePickup } from '@itsrever/design-system'
import device from '@/utils/device'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/redux/hooks'
import ProcessReturnStatus from '../../ProcessReturnStatus.tsx/ProcessReturnStatus'
import { ReturnMethods } from '@/redux/features/generalData/generalDataSlice'

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

    const returnMethod = process?.return_method

    return (
        <ProductDetailsDiv>
            <LeftDiv>
                <div className="mb-16">
                    <div className="mb-6 flex flex-row items-center">
                        <OrderInfo
                            style={{
                                color: `${theme.colors.grey[0]}`
                            }}
                        />
                        <p className="text-grey-1 ml-2 text-lg">
                            {t('details_tab.order_info')}
                        </p>
                    </div>
                    <div className="flex items-center gap-12">
                        <div>
                            <p>
                                <b>{t('details_tab.return_method')}</b>
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                {returnMethod ===
                                ReturnMethods.CollectionPoint ? (
                                    <CollectionPoint />
                                ) : (
                                    <HomePickup />
                                )}
                                <p>
                                    {t(`return_methods.method${returnMethod}`)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center lg:mt-0">
                    <AccountCircleOutlinedIcon
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <p className="text-grey-1 ml-2 text-lg">
                        {t('details_tab.customer')}
                    </p>
                </div>
                <CustomerTable>
                    <p>
                        <b>{t('details_tab.name')}</b>
                    </p>
                    <p>
                        <b>{t('details_tab.email')}</b>
                    </p>
                    <p>
                        <b>{t('details_tab.phone')}</b>
                    </p>
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
                <p className="mt-8 grid grid-cols-1">
                    <b>{t('details_tab.address')}</b>
                </p>
                <div className="mt-2">
                    <p>{address && address?.address_line_1}</p>
                    <p>{address && address?.address_line_2}</p>
                    <p>
                        {address &&
                            address?.city +
                                ', ' +
                                address?.postcode +
                                ', ' +
                                address?.country}
                    </p>
                </div>
            </LeftDiv>
            <OrderStatusDiv>
                <div className="flex flex-row items-center">
                    <AccessTime
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <p className="text-grey-1 ml-2 text-lg">
                        {t('details_tab.statuses')}
                    </p>
                </div>
                <StatusTable>
                    <p>
                        <b>{t('details_tab.order')}</b>
                    </p>
                    <p>
                        <b>{t('details_tab.ID')}</b>
                    </p>
                    <p>
                        <b>{t('details_tab.status')}</b>
                    </p>
                    <hr
                        className="col-span-3"
                        style={{
                            color: theme.colors.grey[2]
                        }}
                    />
                    <TableValue>{t('details_tab.shipping_status')}</TableValue>
                    {trackingUrl ? (
                        <TrackingLink
                            color={theme.colors.primary.dark}
                            href={trackingUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {trackingId
                                ? trackingId
                                : t('details_tab.shipping_status')}
                        </TrackingLink>
                    ) : (
                        <p>-</p>
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
                                {t('details_tab.return_status')}
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

const TableValue = styled.p`
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

const LeftDiv = styled.div``

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
