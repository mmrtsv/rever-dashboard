import styled from 'styled-components'
import {
    ModelsPublicReturnProcess,
    ModelsAddress
} from '@itsrever/dashboard-api'
import { CustomerInformation } from './CustomerInformation'
import { LogisticsInformation } from './LogisticsInformation'
import { ReturnMethods, ShippingStatuses } from '@/utils'

interface InformationIslandProps {
    process: ModelsPublicReturnProcess
}

const InformationIsland: React.FC<InformationIslandProps> = ({ process }) => {
    const returnMethod = process?.return_method as ReturnMethods
    const lkss = process.last_known_shipping_status as ShippingStatuses

    const trackingId = process?.tracking_id ?? '-'
    const trackingUrl = process?.tracking_url ?? '-'
    const address = (
        process?.drop_off_address
            ? process.drop_off_address
            : process?.pickup_address
    ) as ModelsAddress

    const customer = process?.customer
    const customerName =
        (customer && customer?.first_name + ' ' + customer?.last_name) ?? '-'
    const email = customer && customer?.email ? customer.email : '-'
    const phone = address && address.phone ? address.phone : '-'

    return (
        <IslandDiv>
            <CustomerInformation
                customerName={customerName}
                email={email}
                phone={phone}
            />
            <hr />
            <LogisticsInformation
                returnMethod={returnMethod}
                trackingId={trackingId}
                trackingUrl={trackingUrl}
                lkss={lkss}
                address={address}
            />
        </IslandDiv>
    )
}

export default InformationIsland

const IslandDiv = styled.div`
    background-color: white;
    border-radius: 0.5rem;
`
