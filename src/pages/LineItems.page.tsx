import React from 'react'
import PageComponent from '../components/PageComponent'
import { useEffect, useState } from 'react'
import LoadingModal from '../components/Loading/LoadingModal'
import { useAppSelector } from '../redux/hooks'
import styled from 'styled-components'
import FilterComponent from '../components/FilterComponent'
import useSearchLineItems from '../hooks/useSearchLineItems'
import SelectorComponent from '../components/SelectorComponent/SelectorComponent'
import { useTranslation } from 'react-i18next'
import Pagination from '../components/Orders/PaginationComponent/Pagination'
import OrderListItem from '../components/Orders/OrderListItem'
import useSearchMe from '../hooks/useSearchMe'
import device from '../utils/device'

function Orders() {
    const token = useAppSelector((state) => state.tokenData.token)
    const [Loading, setLoading] = useState(true)

    const { callMe } = useSearchMe()
    useEffect(() => {
        !Loading && callMe()
    }, [Loading])

    useEffect(() => {
        // token != null ? setLoading(false) : setLoading(true)
        if (token != null) {
            // location.reload()
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [token])

    const { t } = useTranslation()

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const [ActualPage, setActualPage] = useState<number>(0)
    const [Limit, setLimit] = useState<number>(25)
    const [FreeText, setFreeText] = useState<string>('')
    const { LineItems, totalLineItems } = useSearchLineItems(
        ActualPage,
        Limit,
        FreeText,
        selectedEcommerce
    )
    const MaxPage = totalLineItems && Math.ceil(totalLineItems / Limit)

    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            setActualPage(0)
        }
        setFreeText(freeText)
    }

    const handleChangeSelectedEcommerce = () => {
        setActualPage(0)
    }

    return (
        <PageComponent>
            {Loading ? (
                <LoadingModal loading={Loading} />
            ) : (
                <Main
                    data-testid="OrdersTable"
                    className="flex min-h-full w-full grow flex-col overflow-x-auto"
                >
                    <TopDiv>
                        <FilterComponent
                            freeText={FreeText}
                            setFreeText={handleChangeFreeText}
                        />
                        {FreeText.length > 2 && (
                            <span className="text-xs">
                                {totalLineItems
                                    ? t('orders_table.results') + totalLineItems
                                    : t('orders_table.results') + '0'}
                            </span>
                        )}
                        <div className="flex justify-end">
                            <SelectorComponent
                                handleChangeSelectedEcommerce={
                                    handleChangeSelectedEcommerce
                                }
                            />
                        </div>
                    </TopDiv>
                    {LineItems && LineItems.length > 0 && (
                        <div className="mt-8">
                            {LineItems.map((lineItem) => {
                                return (
                                    <OrderListItem
                                        lineItem={lineItem}
                                        key={lineItem.rever_id}
                                    />
                                )
                            })}
                        </div>
                    )}
                    <Pagination
                        actualPage={ActualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxPage ?? 0}
                    />
                </Main>
            )}
        </PageComponent>
    )
}

export default Orders

const Main = styled.div`
    width: 100%;
    max-height: 0vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    display: inline-block;
    padding: 1rem;
`

const TopDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    width: 100%;
    @media ${device.lg} {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`
