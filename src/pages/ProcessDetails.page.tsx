import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from 'styled-components'
import useSearchProcess from '@/hooks/useSearchProcess'
import DetailTabs from '../components/Processes/ProcessDetailsTabs/ProcessDetailsTabs'
import DetailsTab from '../components/Processes/ProcessDetailsTabs/DetailsTab/DetailsTab'
import Summary from '../components/Processes/ProcessDetailsTabs/SummaryTab/Summary'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { useTranslation } from 'react-i18next'
import { getDate } from '../utils'
import { useAppSelector } from '@/redux/hooks'

import ProductsTab from '@/components/Processes/ProcessDetailsTabs/ProductsTab/ProductsTab'
import device from '@/utils/device'

function ProcessDetails() {
    const { i18n } = useTranslation()

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

    return (
        <PageComponent>
            <Main>
                <TopDiv>
                    <Title data-testid="ProcessID" className="mt-6">
                        <b className="text-xl">
                            {process && process.customer_printed_order_id}
                        </b>
                        <LocalShippingOutlinedIcon className="ml-2" />
                    </Title>
                    <Title className="mt-2">{returnDate}</Title>
                </TopDiv>
                <CardDiv>
                    <DetailTabs
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                    {currentTab === 0 ? (
                        <ProductsTab />
                    ) : currentTab === 1 ? (
                        <DetailsTab />
                    ) : (
                        <Summary />
                    )}
                </CardDiv>
            </Main>
        </PageComponent>
    )
}

export default ProcessDetails

const TopDiv = styled.div`
    background-color: #eee;
    padding-bottom: 2rem;
    width: 100%;
`

const CardDiv = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const Title = styled.h6`
    margin-left: 2rem;
    display: flex;
    flex-direction: row;
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
