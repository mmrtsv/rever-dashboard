import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface SearchProps {
    actualPage: number
    setActualPage: (actualPage: number) => void
    limit: number
    setLimit: (limit: number) => void
    maxPage: number
}

const Pagination: React.FC<SearchProps> = ({
    actualPage,
    setActualPage,
    limit,
    setLimit,
    maxPage
}) => {
    const { t } = useTranslation()

    return (
        <>
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
                    value={limit}
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
                        onClick={() => {
                            actualPage > 0 && setActualPage(actualPage - 1)
                        }}
                    >
                        <NavigateBeforeIcon />
                    </PaginationButton>

                    <PaginationNumberBox>
                        <PaginationNumber
                            current={actualPage === 0}
                            onClick={(event) => {
                                event.currentTarget.innerText === '...'
                                    ? null
                                    : setActualPage(
                                          parseInt(
                                              event.currentTarget.innerText
                                          ) - 1
                                      )
                            }}
                        >
                            {maxPage > 4
                                ? actualPage === 0
                                    ? actualPage + 1
                                    : actualPage + 1 >= maxPage - 1 &&
                                      maxPage > 4
                                    ? '...'
                                    : actualPage
                                : '1'}
                        </PaginationNumber>

                        {maxPage >= 2 && (
                            <PaginationNumber
                                current={
                                    maxPage > 4
                                        ? actualPage > 0 &&
                                          actualPage + 1 < maxPage - 1
                                        : actualPage + 1 === 2
                                }
                                onClick={(event) =>
                                    setActualPage(
                                        parseInt(
                                            event.currentTarget.innerText
                                        ) - 1
                                    )
                                }
                            >
                                {maxPage > 4
                                    ? actualPage === 0
                                        ? actualPage + 2
                                        : actualPage + 1 === maxPage - 1
                                        ? actualPage
                                        : actualPage + 1 === maxPage
                                        ? actualPage - 1
                                        : actualPage + 1
                                    : '2'}
                                {}
                            </PaginationNumber>
                        )}

                        {maxPage >= 3 && (
                            <PaginationNumber
                                current={actualPage + 1 === maxPage - 1}
                                onClick={(event) =>
                                    setActualPage(
                                        parseInt(
                                            event.currentTarget.innerText
                                        ) - 1
                                    )
                                }
                            >
                                {maxPage > 4
                                    ? actualPage === 0
                                        ? actualPage + 3
                                        : actualPage + 1 === maxPage - 1
                                        ? actualPage + 1
                                        : actualPage + 1 === maxPage
                                        ? actualPage
                                        : actualPage + 2
                                    : '3'}
                            </PaginationNumber>
                        )}

                        {maxPage >= 4 && (
                            <PaginationNumber
                                current={actualPage + 1 === maxPage}
                                onClick={(event) => {
                                    event.currentTarget.innerText === '...'
                                        ? null
                                        : setActualPage(
                                              parseInt(
                                                  event.currentTarget.innerText
                                              ) - 1
                                          )
                                }}
                            >
                                {maxPage > 4
                                    ? actualPage + 1 === maxPage
                                        ? actualPage + 1
                                        : actualPage + 1 === maxPage - 1
                                        ? actualPage + 2
                                        : '...'
                                    : '4'}
                            </PaginationNumber>
                        )}
                    </PaginationNumberBox>

                    <PaginationButton
                        onClick={() => {
                            actualPage < maxPage &&
                                setActualPage(actualPage + 1)
                        }}
                    >
                        <NavigateNextIcon />
                    </PaginationButton>
                </PaginationDiv>
            </PaginationBox>

            <div className="mt-2 flex justify-end text-xs">
                {maxPage + t('orders_table.total_page')}
            </div>
        </>
    )
}

const PaginationDiv = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1rem;
`

interface NumberProps {
    current: boolean
}

const PaginationNumber = styled.div<NumberProps>`
    cursor: pointer;
    background-color: ${(p) => (p.current ? '#24446d' : 'transparent')};
    border-radius: 5px;
    color: ${(p) => (p.current ? '#fff' : '#000')};
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const PaginationNumberBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 3.5rem;
    width: fit-content;
    padding: 0 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const PaginationButton = styled.button`
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

export default Pagination
