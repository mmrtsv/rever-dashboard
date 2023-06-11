import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from 'styled-components'
import { useSearchProcess } from '@/hooks'
import ProcessIsland from '@/components/ProcessDetails/ProcessIsland/ProcessIsland'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { useTranslation } from 'react-i18next'
import { getDate } from '../utils'
import { moreThan } from '@/utils/device'
import { useParams } from 'react-router-dom'
import LoadingModal from '@/components/Loading/LoadingModal/LoadingModal'
import { InformationIsland } from '@/components/ProcessDetails/InformationIsland'

function ProcessDetails() {
    const { i18n } = useTranslation()
    const { id } = useParams()
    const { process, loading } = useSearchProcess(id ?? '')

    const returnDate =
        process?.started_at?.seconds &&
        getDate(process?.started_at?.seconds, i18n.language)

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
                </TopDiv>

                <IslandsDiv>
                    <ProcessIsland process={process} />
                    <InformationIsland process={process} />
                </IslandsDiv>
            </Main>
        </PageComponent>
    )
}

export default ProcessDetails

const IslandsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
`

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
    height: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
`
