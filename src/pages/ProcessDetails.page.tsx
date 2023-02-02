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

function ProcessDetails() {
    const { i18n } = useTranslation()

    const processID = window.location.pathname.split('/').pop()

    const response = useAppSelector(
        (store) => store.processesApi.getProcess.response.processes
    )
    let Process
    if (response && response.length > 0) Process = response[0]
    useSearchProcess(processID ?? '')
    const [currentTab, setCurrentTab] = useState(0)

    const returnDate =
        Process?.started_at?.seconds &&
        getDate(Process?.started_at?.seconds, i18n.language)

    return (
        <PageComponent>
            <Main className="flex flex-col overflow-x-auto bg-white">
                <TopDiv>
                    <Title data-testid="ProcessID" className="mt-6">
                        <b className="text-xl">
                            {Process && Process.customer_printed_order_id}
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
                        <ProductsTab process={Process} />
                    ) : currentTab === 1 ? (
                        <DetailsTab process={Process} />
                    ) : (
                        <Summary process={Process} />
                    )}
                </CardDiv>
            </Main>
        </PageComponent>
    )
}

export default ProcessDetails

const TopDiv = styled.div`
    width: 100%;
    background-color: #fff;
    padding-bottom: 2rem;
`

const CardDiv = styled.div`
    flex-grow: 1;
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
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`
