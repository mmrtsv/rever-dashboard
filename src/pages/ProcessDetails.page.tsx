import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from 'styled-components'
import { useSearchProcess, usePresignedURLLabel } from '@/hooks'
import ProcessDetailTabs from '@/components/ProcessDetailsTabs/ProcessDetailsTabs'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import PDFIcon from '@mui/icons-material/PictureAsPdfOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'
import { getDate } from '../utils'
import { Button, toast } from '@itsrever/design-system'
import { moreThan } from '@/utils/device'
import { useParams } from 'react-router-dom'
import LoadingModal from '@/components/Loading/LoadingModal/LoadingModal'

function ProcessDetails() {
    const { i18n, t } = useTranslation()
    const { id } = useParams()
    const { process, loading } = useSearchProcess(id ?? '')
    const { findPresignedURLLabel } = usePresignedURLLabel()

    const returnDate =
        process?.started_at?.seconds &&
        getDate(process?.started_at?.seconds, i18n.language)

    const [reviewMode, setReviewMode] = useState<boolean>(
        process?.return_status === 'REVIEW_REQUIRED'
    )

    const returnedItems =
        process?.line_items &&
        process.line_items.some(
            (litem) => litem.product_return_reason !== 'NOT_RECEIVED'
        )
    const showReviewButton =
        !reviewMode && process?.review_available && returnedItems

    const downloadLabel = async () => {
        if (returnedItems) {
            const label = await findPresignedURLLabel(id ?? '')
            if (label) {
                window.open(label, '_blank')
            }
        } else {
            toast({
                text: t('toast_errors.no_label'),
                variant: 'info'
            })
        }
    }

    return (
        <PageComponent>
            <LoadingModal loading={loading} />
            <Main>
                <TopDiv>
                    <div className="mr-auto">
                        <Title>
                            {process && process.customer_printed_order_id}
                            <LocalShippingOutlinedIcon className="ml-2" />
                        </Title>
                        <p className="mt-2">{returnDate}</p>
                    </div>
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={downloadLabel}
                    >
                        <PDFIcon />
                        <p className="ml-2 mr-8">Download label</p>
                    </div>
                    {showReviewButton && (
                        <Button
                            onClick={() => setReviewMode(true)}
                            iconLeft={<EditIcon />}
                        >
                            {t('process_details_page.review')}
                        </Button>
                    )}
                </TopDiv>
                <ProcessDetailTabs process={process} reviewMode={reviewMode} />
            </Main>
        </PageComponent>
    )
}

export default ProcessDetails

const TopDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1.5rem 1rem 2rem 1rem;
    @media ${moreThan.md} {
        padding-left: 2rem;
        padding-right: 2rem;
    }
`

const Title = styled.h6`
    display: flex;
    align-items: center;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    @media ${moreThan.xl} {
        margin-left: 2rem;
        margin-right: 2rem;
    }
`
