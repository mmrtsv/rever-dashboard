import React from 'react'
import PageComponent from '../components/PageComponent'
import { useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import styled from 'styled-components'
import FilterComponent from '../components/FilterComponent'
import useSearchLineItems from '../hooks/useSearchLineItems'
import useSearchPendingLineItems from '../hooks/useSearchPendingLineItems'
import useSearchCompletedLineItems from '../hooks/useSearchCompletedLineItems'
import { useTranslation } from 'react-i18next'
import Pagination from '../components/Orders/PaginationComponent/Pagination'
import OrderListItem from '../components/Orders/OrderListItem'
import { useTheme } from '@itsrever/design-system'
import TopBar from '../components/Orders/TopBar/TopBarItems'
import ArrowDown from '@mui/icons-material/ArrowDownward'

function Orders() {
    const { t } = useTranslation()
    const theme = useTheme()

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const [currentTab, setCurrentTab] = useState(0)

    const [ActualPage, setActualPage] = useState<number>(0)
    const [Limit, setLimit] = useState<number>(10)
    const [FreeText, setFreeText] = useState<string>('')

    const { pendingLineItems, totalPending } = useSearchPendingLineItems(
        ActualPage,
        Limit,
        FreeText,
        selectedEcommerce
    )

    const { completedLineItems, totalCompleted } = useSearchCompletedLineItems(
        ActualPage,
        Limit,
        FreeText,
        selectedEcommerce
    )

    const { LineItems, totalLineItems } = useSearchLineItems(
        ActualPage,
        Limit,
        FreeText,
        selectedEcommerce
    )

    const MaxPage = totalLineItems && Math.ceil(totalLineItems / Limit)
    const MaxPendingPage = totalPending && Math.ceil(totalPending / Limit)
    const MaxCompletedPage = totalCompleted && Math.ceil(totalCompleted / Limit)

    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            setActualPage(0)
        }
        setFreeText(freeText)
    }

    return (
        <PageComponent>
            <div className="flex h-full flex-col">
                <TopBar
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    setActualPage={setActualPage}
                />
                <Main className="flex flex-col overflow-x-auto">
                    <div className="w-fit pt-4 pl-8">
                        <FilterComponent
                            freeText={FreeText}
                            setFreeText={handleChangeFreeText}
                        />
                        {FreeText.length > 2 && (
                            <>
                                <hr
                                    className="mt-2"
                                    style={{
                                        border: `0.5px solid ${theme.colors.grey[2]}`
                                    }}
                                />
                                <span className="text-xs">
                                    {totalLineItems
                                        ? t('orders_table.results') +
                                          totalLineItems
                                        : t('orders_table.results') + '0'}
                                </span>
                            </>
                        )}
                    </div>

                    <TableDiv data-testid="OrdersTable">
                        <div className="grid w-full grid-cols-3 p-4 md:grid-cols-6 lg:grid-cols-8">
                            <DissapearingH6M className="flex items-center justify-center">
                                <b className="mr-2">
                                    {' '}
                                    {t('order_details.date')}
                                </b>
                                <ArrowDown />
                            </DissapearingH6M>
                            <h6 className="text-grey-1 text-center">
                                <b>{t('order_details.order_id')}</b>
                            </h6>
                            <h6 className="text-grey-1 text-center">
                                <b> {t('order_details.image')}</b>
                            </h6>
                            <DissapearingH6M className="text-grey-1">
                                <b> {t('order_details.quantity')}</b>
                            </DissapearingH6M>
                            <DissapearingH6L className="text-grey-1 col-span-2">
                                <b> {t('order_details.product_name')}e</b>
                            </DissapearingH6L>
                            <DissapearingH6M className="text-grey-1">
                                <b> {t('order_details.customer')}</b>
                            </DissapearingH6M>
                            <h6 className="text-grey-1 text-center">
                                <b> {t('order_details.status')}</b>
                            </h6>
                        </div>
                        {currentTab === 0 ? (
                            <>
                                {LineItems &&
                                    LineItems.map((lineItem, i) => {
                                        return (
                                            <OrderListItem
                                                lineItem={lineItem}
                                                key={lineItem.rever_id}
                                                first={i === 0}
                                                last={
                                                    i === LineItems.length - 1
                                                }
                                            />
                                        )
                                    })}
                                <Pagination
                                    actualPage={ActualPage}
                                    setActualPage={setActualPage}
                                    limit={Limit}
                                    setLimit={setLimit}
                                    maxPage={MaxPage ?? 0}
                                />
                            </>
                        ) : currentTab === 1 ? (
                            <>
                                {pendingLineItems &&
                                    pendingLineItems.map((lineItem, i) => {
                                        return (
                                            <OrderListItem
                                                lineItem={lineItem}
                                                key={lineItem.rever_id}
                                                first={i === 0}
                                                last={
                                                    i ===
                                                    pendingLineItems.length - 1
                                                }
                                            />
                                        )
                                    })}
                                <Pagination
                                    actualPage={ActualPage}
                                    setActualPage={setActualPage}
                                    limit={Limit}
                                    setLimit={setLimit}
                                    maxPage={MaxPendingPage ?? 0}
                                />
                            </>
                        ) : (
                            <>
                                {completedLineItems &&
                                    completedLineItems.map((lineItem, i) => {
                                        return (
                                            <OrderListItem
                                                lineItem={lineItem}
                                                key={lineItem.rever_id}
                                                first={i === 0}
                                                last={
                                                    i ===
                                                    completedLineItems.length -
                                                        1
                                                }
                                            />
                                        )
                                    })}
                                <Pagination
                                    actualPage={ActualPage}
                                    setActualPage={setActualPage}
                                    limit={Limit}
                                    setLimit={setLimit}
                                    maxPage={MaxCompletedPage ?? 0}
                                />
                            </>
                        )}
                    </TableDiv>
                </Main>
            </div>
        </PageComponent>
    )
}

export default Orders

const DissapearingH6L = styled.h6`
    text-align: center;
    @media (max-width: 899px) {
        display: none;
    }
`

const DissapearingH6M = styled.h6`
    text-align: center;
    @media (max-width: 599px) {
        display: none;
    }
`

const TableDiv = styled.div`
    margin: 0rem 2rem 2rem 2rem;
    border-radius: 0.5rem;
    border: 1px solid #eee;
`

const Main = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
    background-color: #eee;
`
