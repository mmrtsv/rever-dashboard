import React, { useState } from 'react'
import styled from 'styled-components'
import OrderListItem from '../OrderListItem'
import FilterComponent from '../../FilterComponent/FilterComponent'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import useSearchLineItems from '../../../hooks/useSearchLineItems'
import { useTranslation } from 'react-i18next'

const OrdersTable = () => {
    const { t } = useTranslation()

    const [ActualPage, setActualPage] = useState<number>(0)
    const [Limit, setLimit] = useState<number>(25)
    const [FreeText, setFreeText] = useState<string>('')
    const { LineItems } = useSearchLineItems(ActualPage, Limit, FreeText)

    return (
        <Main
            data-testid="OrdersTable"
            className="flex min-h-full w-full grow flex-col overflow-x-auto"
        >
            <FilterComponent freeText={FreeText} setFreeText={setFreeText} />
            {LineItems && LineItems.length > 0 && (
                <div>
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
            <PaginationBox>
                <Select
                    sx={{
                        backgroundColor: '#fff',
                        width: '150px',
                        boxShadow:
                            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}
                    value={Limit}
                    label="Age"
                    onChange={(event: any) => {
                        setLimit(event.target.value)
                    }}
                >
                    <MenuItem value={25}>
                        25 {t('orders_table.pagination')}
                    </MenuItem>
                    <MenuItem value={50}>
                        50 {t('orders_table.pagination')}
                    </MenuItem>
                    <MenuItem value={100}>
                        100 {t('orders_table.pagination')}
                    </MenuItem>
                </Select>
                <PaginationDiv>
                    <PaginationButton
                        onClick={() =>
                            setActualPage((prev) =>
                                prev > 0 ? prev - 1 : prev
                            )
                        }
                    >
                        <NavigateBeforeIcon />
                    </PaginationButton>
                    {ActualPage === 0 && (
                        <PaginationNumberBox>
                            <PaginationNumberCurrent>
                                {ActualPage + 1}
                            </PaginationNumberCurrent>
                            <PaginationNumber>
                                {ActualPage + 2}
                            </PaginationNumber>
                            <PaginationNumber>
                                {ActualPage + 3}
                            </PaginationNumber>
                            <PaginationNumber>
                                {ActualPage + 4}
                            </PaginationNumber>
                            <PaginationNumber>
                                {ActualPage + 5}
                            </PaginationNumber>
                            <PaginationNumber>...</PaginationNumber>
                        </PaginationNumberBox>
                    )}
                    {ActualPage === 1 && (
                        <PaginationNumberBox>
                            <PaginationNumber>{ActualPage}</PaginationNumber>
                            <PaginationNumberCurrent>
                                {ActualPage + 1}
                            </PaginationNumberCurrent>
                            <PaginationNumber>
                                {ActualPage + 2}
                            </PaginationNumber>
                            <PaginationNumber>
                                {ActualPage + 3}
                            </PaginationNumber>
                            <PaginationNumber>
                                {ActualPage + 4}
                            </PaginationNumber>
                            <PaginationNumber>...</PaginationNumber>
                        </PaginationNumberBox>
                    )}
                    {ActualPage > 1 && (
                        <PaginationNumberBox>
                            <PaginationNumber>
                                {ActualPage - 1}
                            </PaginationNumber>
                            <PaginationNumber>{ActualPage}</PaginationNumber>
                            <PaginationNumberCurrent>
                                {ActualPage + 1}
                            </PaginationNumberCurrent>
                            <PaginationNumber>
                                {ActualPage + 2}
                            </PaginationNumber>
                            <PaginationNumber>
                                {ActualPage + 3}
                            </PaginationNumber>
                            <PaginationNumber>...</PaginationNumber>
                        </PaginationNumberBox>
                    )}

                    <PaginationButton
                        onClick={() => setActualPage((prev) => prev + 1)}
                    >
                        <NavigateNextIcon />
                    </PaginationButton>
                </PaginationDiv>
            </PaginationBox>
        </Main>
    )
}
const PaginationDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 65%;
`
const PaginationNumberCurrent = styled.div`
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    background-color: #24446d;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`
const PaginationNumber = styled.div`
    /* cursor: pointer; */
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        background-color: #f5f5f5;
    }
`
const PaginationNumberBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 3.5rem;
    width: 14rem;
    padding: 0 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
const PaginationButton = styled.button`
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    /* padding: 0.5rem; */
    height: 3.5rem;
    width: 3.5rem;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    :hover {
        background-color: #f5f5f5;
    }
`
const PaginationBox = styled.div`
    margin-top: 2rem;
    margin-left: 66%;
    width: 33%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Main = styled.div`
    width: 100%;
    max-height: 0vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    display: inline-block;
    padding: 0 1rem 0 1rem;
    margin-top: 1rem;
    padding-bottom: 10rem;
`

export default OrdersTable
