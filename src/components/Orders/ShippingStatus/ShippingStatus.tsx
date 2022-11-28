import _ from '../../../@lodash/@lodash'
import clsx from 'clsx'
export const ShippingStatuses = [
    {
        enum: 0,
        name: 'NO_SHIPPING_STATUS',
        color: 'bg-grey-1 text-white',
        text: 'NO SHIPPING STATUS'
    },
    {
        enum: 1,
        name: 'CREATED',
        color: 'bg-blue-500 text-white',
        text: 'CREATED'
    },
    {
        enum: 2,
        name: 'COLLECTED',
        color: 'bg-orange text-white',
        text: 'COLLECTED'
    },
    {
        enum: 3,
        name: 'IN_WAREHOUSE',
        color: 'bg-light-green-A700 text-black',
        text: 'IN WAREHOUSE'
    },
    { enum: 4, name: 'ERROR', color: 'bg-red-700 text-white', text: 'ERROR' },
    {
        enum: 5,
        name: 'CANCELED',
        color: 'bg-red-700 text-white',
        text: 'CANCELED'
    }
]
const ShippingStatus = (props: any) => {
    return (
        <div
            className={clsx(
                'inline truncate rounded-full py-3 px-4 font-semibold',
                _.find(ShippingStatuses, { enum: props.enum })?.color
            )}
        >
            {_.find(ShippingStatuses, { enum: props.enum })?.text}
        </div>
    )
}

export default ShippingStatus
