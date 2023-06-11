import { useTranslation } from 'react-i18next'
import { RepeatIcon } from '@itsrever/design-system'
import styled from 'styled-components'
import { useTheme } from '@itsrever/design-system'
import { ModelsReturnLineItem } from '@itsrever/dashboard-api'
import { moreThan } from '@/utils'

interface ExchangeSummaryProps {
    newOrderId: string
    email: string
    exchangedItems: ModelsReturnLineItem[]
}

const ExchangeSummary: React.FC<ExchangeSummaryProps> = ({
    newOrderId,
    email,
    exchangedItems
}) => {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <ExchangesDiv>
            <div className="flex items-center">
                <RepeatIcon color={theme.colors.grey[0]} />
                <p className="text-grey-1 ml-2 text-lg">
                    {t('summary.exchanges_title')}
                </p>
            </div>
            <div className="items center mt-6 flex gap-4">
                <p>
                    <b>{t('summary.new_order_id')}</b>
                </p>
                <p>{newOrderId}</p>
            </div>
            <div className="items center mt-4 flex gap-4">
                <p>
                    <b>{t('summary.email')}</b>
                </p>
                <p>{email}</p>
            </div>
            <p className="mt-6">
                <b>{t('summary.new_items')}</b>
            </p>
            {exchangedItems.map((item, i) => {
                return <p key={i}>{item.name}</p>
            })}
        </ExchangesDiv>
    )
}

export default ExchangeSummary

const ExchangesDiv = styled.div`
    margin-top: 2rem;
    @media ${moreThan.xl} {
        margin-top: 0;
    }
`
