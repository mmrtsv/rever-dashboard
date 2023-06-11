import ShippingStatus from '@/components/ShippingStatus/ShippingStatus'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { ReturnMethods, ShippingStatuses } from '@/utils'
import { CollectionPoint, HomePickup } from '@itsrever/design-system'
import { useTheme } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ModelsAddress } from '@itsrever/dashboard-api'
import PDFIcon from '@mui/icons-material/PictureAsPdfOutlined'
import { usePresignedURLLabel } from '@/hooks'
import { useParams } from 'react-router-dom'

interface LogisticsInformationProps {
    returnMethod: ReturnMethods
    trackingId: string
    trackingUrl: string
    lkss: ShippingStatuses
    address: ModelsAddress
}

const LogisticsInformation: React.FC<LogisticsInformationProps> = ({
    returnMethod,
    trackingId,
    trackingUrl,
    lkss,
    address
}) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const { id } = useParams()

    const { findPresignedURLLabel } = usePresignedURLLabel()

    const downloadLabel = async () => {
        const label = await findPresignedURLLabel(id ?? '')
        if (label) {
            window.open(label, '_blank')
        }
    }

    return (
        <LogisticsDiv>
            <div className="mb-6 flex items-center">
                <LocalShippingOutlinedIcon
                    style={{
                        color: `${theme.colors.grey[0]}`
                    }}
                />
                <p className="text-grey-1 ml-2 mr-auto text-lg">
                    {t('details_tab.statuses')}
                </p>
                <Download
                    bgColor={theme.colors.grey[5]}
                    onClick={downloadLabel}
                >
                    <PDFIcon />
                    <p className="text-sm">
                        {t('process_details_page.download_label')}
                    </p>
                </Download>
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
                        <ShippingStatus status={lkss} />
                    </div>
                </div>
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
        </LogisticsDiv>
    )
}

export default LogisticsInformation

const LogisticsDiv = styled.div`
    padding: 1.5rem;
`

const StatusTable = styled.div`
    margin-top: 1rem;
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

interface DownloadProps {
    bgColor?: string
}

const Download = styled.button<DownloadProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 73px;
    padding: 0.75rem;
    background-color: ${(p) => p.bgColor};
`
