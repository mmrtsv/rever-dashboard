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
            <p className="text-center">
                <b className="mr-2">{t('titles_process.date')}</b>
                <ArrowDown />
            </p>
            <p className="text-grey-1 text-center">
                <b>{t('titles_process.order_id')}</b>
            </p>
            {ecommercesLength && ecommercesLength > 1 && (
                <p className="text-grey-1 text-center">
                    <b> {t('titles_process.shop')}</b>
                </p>
            )}
            <p className="text-grey-1 text-center">
                <b>{t('titles_process.total')}</b>
            </p>
            <p className="text-grey-1 text-center">
                <b>{t('titles_process.customer')}</b>
            </p>
            <p className="text-grey-1 text-center">
                <b>{t('titles_process.status')}</b>
            </p>
        </div>
    )
}

export default TitlesP
