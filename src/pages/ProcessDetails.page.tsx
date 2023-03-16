import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from 'styled-components'
import useSearchProcess from '@/hooks/useSearchProcess'
import DetailTabs from '../components/Processes/ProcessDetailsTabs/ProcessDetailsTabs'
import DetailsTab from '../components/Processes/ProcessDetailsTabs/DetailsTab/DetailsTab'
import Summary from '../components/Processes/ProcessDetailsTabs/SummaryTab/Summary'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'
import { getDate } from '../utils'
import { useAppSelector } from '@/redux/hooks'
import { Button } from '@itsrever/design-system'

import ProductsTab from '@/components/Processes/ProcessDetailsTabs/ProductsTab/ProductsTab'
import device from '@/utils/device'

function ProcessDetails() {
    const { i18n, t } = useTranslation()

    // Find process
    const processID = window.location.pathname.split('/').pop()
    useSearchProcess(processID ?? '')
    const [currentTab, setCurrentTab] = useState(0)

    const responseProcess = useAppSelector(
        (store) => store.processesApi.getProcess.response.processes
    )
    const process =
        responseProcess && responseProcess?.length > 0
            ? responseProcess[0]
            : undefined
    const returnDate =
        process?.started_at?.seconds &&
        getDate(process?.started_at?.seconds, i18n.language)

    // State to handle when it's possible to review
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

    return (
        <PageComponent>
            <Main>
                <TopDiv>
                    <div>
                        <Title>
                            <b className="text-xl">
                                {process && process.customer_printed_order_id}
                            </b>
                            <LocalShippingOutlinedIcon className="ml-2" />
                        </Title>
                        <Title className="mt-2">{returnDate}</Title>
                    </div>
                    {showReviewButton && (
                        <Button
                            onClick={() => setReviewMode(true)}
                            iconLeft={<EditIcon />}
                        >
                            {t('process_details.review')}
                        </Button>
                    )}
                </TopDiv>
                <DetailTabs
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
                <TabsDiv>
                    {currentTab === 0 ? (
                        <ProductsTab reviewMode={reviewMode} />
                    ) : currentTab === 1 ? (
                        <DetailsTab />
                    ) : (
                        <Summary />
                    )}
                </TabsDiv>
            </Main>
        </PageComponent>
    )
}

export default ProcessDetails

const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eee;
    padding: 1.5rem 1rem 2rem 1rem;
    width: 100%;
    @media ${device.md} {
        padding-left: 2rem;
        padding-right: 2rem;
    }
`

const TabsDiv = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
    background-color: #fff;
`

const Title = styled.h6`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    @media ${device.xl} {
        margin-left: 2rem;
        margin-right: 2rem;
    }
`
