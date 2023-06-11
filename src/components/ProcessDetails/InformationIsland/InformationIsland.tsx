import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ProcessReturnStatus from '@/components/Processes/ProcessReturnStatus.tsx/ProcessReturnStatus'
import ShippingStatus from '@/components/ShippingStatus/ShippingStatus'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { ReturnMethods } from '@/utils'
import { CollectionPoint, HomePickup } from '@itsrever/design-system'
import { useTheme } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

interface InformationIslandProps {
    process: ModelsPublicReturnProcess
}

const InformationIsland: React.FC<InformationIslandProps> = ({ process }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const returnMethod = process?.return_method

    const showReturnStatus =
        process?.return_status === 'REVIEW_REQUIRED' ||
        process?.return_status === 'COMPLETED'

    const trackingId = process?.tracking_id
    const trackingUrl = process?.tracking_url
    const customer = process?.customer
    const address = process?.drop_off_address
        ? process.drop_off_address
        : process?.pickup_address
    return (
        <IslandDiv>
            <CustomerDiv>
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
                    <div className="mb-4 flex items-center gap-4">
                        <p>
                            <b>{t('details_tab.name')}</b>
                        </p>
                        <TableValue>
                            {customer &&
                                customer?.first_name +
                                    ' ' +
                                    customer?.last_name}
                        </TableValue>
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <p>
                            <b>{t('details_tab.email')}</b>
                        </p>
                        <TableValue>{customer && customer?.email}</TableValue>
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <p>
                            <b>{t('details_tab.phone')}</b>
                        </p>
                        <TableValue>{address && address.phone}</TableValue>
                    </div>
                </CustomerTable>
            </CustomerDiv>
            <hr />

            <OrderStatusDiv>
                <div className="mb-6 flex flex-row items-center">
                    <LocalShippingOutlinedIcon
                        style={{
                            color: `${theme.colors.grey[0]}`
                        }}
                    />
                    <p className="text-grey-1 ml-2 text-lg">
                        {t('details_tab.statuses')}
                    </p>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-4">
                        <p>
                            <b>{t('details_tab.return_method')}</b>
                        </p>
                        <div className="flex items-center gap-2">
                            <p>{t(`return_methods.method${returnMethod}`)}</p>
                            {returnMethod === ReturnMethods.CollectionPoint ? (
                                <CollectionPoint />
                            ) : (
                                <HomePickup />
                            )}
                        </div>
                    </div>
                </div>
                <StatusTable>
                    <div className="mb-4 flex items-center gap-4">
                        <p>
                            <b>{t('details_tab.ID')}</b>
                        </p>
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
                    </div>
                    <div className="flex items-center gap-4">
                        <p>
                            <b>{t('details_tab.shipping_status')}</b>
                        </p>
                        <div className="truncate">
                            <ShippingStatus
                                status={process?.last_known_shipping_status}
                            />
                        </div>
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
                <p className="mt-4 grid grid-cols-1">
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
            </OrderStatusDiv>
        </IslandDiv>
    )
}

export default InformationIsland

const IslandDiv = styled.div`
    background-color: white;
    border-radius: 0.5rem;
`

const CustomerDiv = styled.div`
    padding: 1.5rem;
`

const CustomerTable = styled.div`
    margin-top: 2rem;
    /* display: grid; */
    width: fit-content;
    /* grid-template-columns: repeat(2, minmax(0, 1fr)); */
    /* row-gap: 1rem;
    column-gap: 2rem; */
    white-space: nowrap;
`

const TableValue = styled.p`
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const OrderStatusDiv = styled.div`
    margin-top: 1rem;
    padding: 1.5rem;
`

const StatusTable = styled.div`
    margin-top: 1rem;
    /* display: grid; */
    /* grid-template-columns: repeat(3, minmax(0, 1fr)); */
    align-items: center;
    width: fit-content;
    row-gap: 1rem;
    column-gap: 2rem;
    white-space: nowrap;
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
