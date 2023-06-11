import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useTheme } from '@itsrever/design-system'
import { useTranslation } from 'react-i18next'

interface CustomerInformationProps {
    customerName: string
    email: string
    phone: string
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({
    customerName,
    email,
    phone
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <CustomerDiv>
            <div className="mb-8 flex items-center">
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
                    <TableValue>{customerName}</TableValue>
                </div>
                <div className="mb-4 flex items-center gap-4">
                    <p>
                        <b>{t('details_tab.email')}</b>
                    </p>
                    <TableValue>{email}</TableValue>
                </div>
                <div className="mb-4 flex items-center gap-4">
                    <p>
                        <b>{t('details_tab.phone')}</b>
                    </p>
                    <TableValue>{phone}</TableValue>
                </div>
            </CustomerTable>
        </CustomerDiv>
    )
}

export default CustomerInformation

const TableValue = styled.p`
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const CustomerDiv = styled.div`
    padding: 1.5rem;
`

const CustomerTable = styled.div`
    width: fit-content;
    white-space: nowrap;
`
