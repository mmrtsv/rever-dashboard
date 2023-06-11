import {
    ModelsPublicReturnProcess,
    ModelsReturnLineItem
} from '@itsrever/dashboard-api'
import styled from 'styled-components'
import NoAvailable from '@/assets/images/noAvailable.png'
import { ChevronLeftIcon } from '@itsrever/design-system'
import { SelectedItem } from '../ProductsTab'
import { useTranslation } from 'react-i18next'
import { LineItemStatus } from '@/components/LineItems'
import { formatPrice } from '@/utils'
import { RefundActions } from '@/utils'

interface LItemProps {
    setSelectedItem: (s: SelectedItem) => void
    lineItem?: ModelsReturnLineItem
}

export const LineItemInfo: React.FC<LItemProps> = ({
    setSelectedItem,
    lineItem
}) => {
    const { t } = useTranslation()

    const process: ModelsPublicReturnProcess = {}

    let imgSrc = NoAvailable
    if (lineItem?.product_image_url) {
        imgSrc = lineItem.product_image_url
    }

    const productReturnReason = lineItem?.product_return_reason

    const showReviewStatus = lineItem?.reviews && lineItem.reviews.length > 0

    let reviewStatus = 0
    if (lineItem?.reviews && lineItem.reviews?.length > 0) {
        reviewStatus =
            lineItem.reviews[0].status === 'APPROVED'
                ? 0
                : lineItem.reviews[0].status === 'DECLINED'
                ? 1
                : 2
    }

    const trackingId = process.tracking_id
    const trackingUrl = process.tracking_url

    let productPrice = undefined
    if (lineItem?.total && lineItem.quantity)
        productPrice = formatPrice(
            Math.round(lineItem.total / lineItem.quantity),
            process.currency_money_format ?? {}
        )

    const compensationMethod = lineItem?.action
    const refund = lineItem?.refund_payment_method

    return (
        <>
            <TopDiv>
                <div className="hover:bg-grey-5 flex w-fit cursor-pointer items-center rounded p-1">
                    <ChevronLeftIcon />
                    <p
                        onClick={() => setSelectedItem({ index: -1 })}
                        className="ml-2 text-lg"
                    >
                        {t('item_details.back')}
                    </p>
                </div>
                {showReviewStatus && (
                    <div className="ml-4">
                        <LineItemStatus status={reviewStatus} />
                    </div>
                )}
            </TopDiv>

            <ItemDiv>
                <img
                    className="mr-4 h-auto w-16"
                    src={imgSrc}
                    alt="ProductImage"
                />
                {productPrice && (
                    <div>
                        <p>{lineItem?.name}</p>
                        <span className="text-grey-2 text-xs">
                            {t('item_details.price')}
                        </span>
                        <p>{productPrice}</p>
                    </div>
                )}
            </ItemDiv>
            <InfoDiv>
                <div>
                    <p className="mb-2">
                        <b>{t('item_details.reason')}</b>
                    </p>
                    <p>
                        {productReturnReason
                            ? t(`select_reason.${productReturnReason}`)
                            : 'No reason catched'}
                    </p>
                </div>
                <div>
                    <p className="mb-2">
                        <b>{t('item_details.tracking')}</b>
                    </p>
                    {trackingId && trackingUrl ? (
                        <a
                            className="text-primary-dark break-words"
                            href={trackingUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {trackingId}
                        </a>
                    ) : (
                        '-'
                    )}
                </div>
                <div>
                    <p className="mb-2">
                        <b>{t('item_details.compensation')}</b>
                    </p>
                    <p>
                        {compensationMethod === RefundActions.NoAction
                            ? 'No Refund'
                            : compensationMethod === RefundActions.ToExchange
                            ? 'Exchanged'
                            : t(`refund_methods.method${refund}`)}
                    </p>
                </div>
                {showReviewStatus &&
                    lineItem.reviews &&
                    lineItem.reviews.length > 0 &&
                    lineItem.reviews[0].reject_reason && (
                        <div>
                            <p className="mb-2">
                                <b>{t('item_details.reject_reason')}</b>
                            </p>
                            <p>{lineItem.reviews[0].reject_reason}</p>
                        </div>
                    )}
            </InfoDiv>
        </>
    )
}

export default LineItemInfo

const TopDiv = styled.div`
    display: flex;
    align-items: center;
`

const ItemDiv = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
`

const InfoDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    margin-top: 2rem;
`
