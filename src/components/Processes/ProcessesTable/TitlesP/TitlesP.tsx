import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import ArrowDown from '@mui/icons-material/ArrowDownward'

const TitlesP = () => {
    const { t } = useTranslation()

    const ecommercesLength = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces?.length
    )

    return (
        <div
            className={`grid w-full ${
                ecommercesLength && ecommercesLength > 1
                    ? 'grid-cols-6'
                    : 'grid-cols-5'
            } p-4`}
        >
            <h6 className="text-center">
                <b className="mr-2">{t('order_details.date')}</b>
                <ArrowDown />
            </h6>
            <h6 className="text-grey-1 text-center">
                <b>{t('order_details.order_id')}</b>
            </h6>
            {ecommercesLength && ecommercesLength > 1 && (
                <h6 className="text-grey-1 text-center">
                    <b> {t('order_details.shop')}</b>
                </h6>
            )}
            <h6 className="text-grey-1 text-center">
                <b>{t('order_details.total')}</b>
            </h6>
            <h6 className="text-grey-1 text-center">
                <b>{t('order_details.customer')}</b>
            </h6>
            <h6 className="text-grey-1 text-center">
                <b>{t('order_details.status')}</b>
            </h6>
        </div>
    )
}

export default TitlesP
