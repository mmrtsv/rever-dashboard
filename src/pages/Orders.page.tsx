import React from 'react'
import PageComponent from '../components/PageComponent'
import { useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import styled from 'styled-components'
import FilterComponent from '../components/FilterComponent'
import useSearchOrders from '../hooks/useSearchOrders'
import { useTranslation } from 'react-i18next'
import Pagination from '../components/Orders/PaginationComponent/Pagination'
import Order from '../components/Orders/Order/Order'
import { useTheme } from '@itsrever/design-system'
import TopBar from '../components/Orders/TopBar/TopBarOrders'
import ArrowDown from '@mui/icons-material/ArrowDownward'
import useSearchCompletedOrders from '../hooks/useSearchCompletedProcesses'
import useSearchPendingOrders from '../hooks/useSearchPendingProcesses'

function Orders() {
    const { t } = useTranslation()
    const theme = useTheme()

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    const ecommercesLength = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces?.length
    )

    const [currentTab, setCurrentTab] = useState(0)

    const [ActualPage, setActualPage] = useState<number>(0)
    const [Limit, setLimit] = useState<number>(10)
    const [FreeText, setFreeText] = useState<string>('')
    const { Orders, totalOrders } = useSearchOrders(
        ActualPage,
        Limit,
        FreeText,
        selectedEcommerce
    )
    const { PendingOrders, totalPendingOrders } = useSearchPendingOrders(
        ActualPage,
        Limit,
        FreeText,
        selectedEcommerce
    )
    const { CompletedOrders, totalCompletedOrders } = useSearchCompletedOrders(
        ActualPage,
        Limit,
        FreeText,
        selectedEcommerce
    )
    const MaxPage = totalOrders && Math.ceil(totalOrders / Limit)
    const MaxPagePending =
        totalPendingOrders && Math.ceil(totalPendingOrders / Limit)
    const MaxPageCompleted =
        totalCompletedOrders && Math.ceil(totalCompletedOrders / Limit)

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
                    setActualPage={setActualPage}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
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
                                    {totalOrders
                                        ? t('orders_table.results') +
                                          totalOrders
                                        : t('orders_table.results') + '0'}
                                </span>
                            </>
                        )}
                    </div>
                    <TableDiv data-testid="OrdersTable">
                        <div
                            className={`grid w-full ${
                                ecommercesLength && ecommercesLength > 1
                                    ? 'grid-cols-6'
                                    : 'grid-cols-5'
                            } p-4`}
                        >
                            <h6 className="text-center">
                                <b className="mr-2">
                                    {t('order_details.date')}
                                </b>
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
                        {currentTab === 0 ? (
                            <>
                                {Orders &&
                                    Orders.map((order, i) => {
                                        return (
                                            <Order
                                                Order={order}
                                                key={order.process_id}
                                                first={i === 0}
                                                last={i === Orders.length - 1}
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
                                {PendingOrders &&
                                    PendingOrders.map((order, i) => {
                                        return (
                                            <Order
                                                Order={order}
                                                key={order.process_id}
                                                first={i === 0}
                                                last={
                                                    i ===
                                                    PendingOrders.length - 1
                                                }
                                            />
                                        )
                                    })}
                                <Pagination
                                    actualPage={ActualPage}
                                    setActualPage={setActualPage}
                                    limit={Limit}
                                    setLimit={setLimit}
                                    maxPage={MaxPagePending ?? 0}
                                />
                            </>
                        ) : (
                            <>
                                {CompletedOrders &&
                                    CompletedOrders.map((order, i) => {
                                        return (
                                            <Order
                                                Order={order}
                                                key={order.process_id}
                                                first={i === 0}
                                                last={
                                                    i ===
                                                    CompletedOrders.length - 1
                                                }
                                            />
                                        )
                                    })}
                                <Pagination
                                    actualPage={ActualPage}
                                    setActualPage={setActualPage}
                                    limit={Limit}
                                    setLimit={setLimit}
                                    maxPage={MaxPageCompleted ?? 0}
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
