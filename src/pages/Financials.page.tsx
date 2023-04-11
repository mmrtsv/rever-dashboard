import React, { useState, useEffect } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import FinancialMetrics from '../components/AnalyticsComponents/FinancialMetrics/FinancialMetrics'
import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    SelectChangeEvent
} from '@mui/material'
import { useSearchFinancialReport } from '../hooks/useSearchFinancialReport'
import { useTheme } from '@itsrever/design-system'
import device from '@/utils/device'
import { useAppSelector } from '@/redux/hooks'

function Financials() {
    const theme = useTheme()
    const months = [
        {
            value: '1',
            label: 'January'
        },
        {
            value: '2',
            label: 'February'
        },
        {
            value: '3',
            label: 'March'
        },
        {
            value: '4',
            label: 'April'
        },
        {
            value: '5',
            label: 'May'
        },
        {
            value: '6',
            label: 'June'
        },
        {
            value: '7',
            label: 'July'
        },
        {
            value: '8',
            label: 'August'
        },
        {
            value: '9',
            label: 'September'
        },
        {
            value: '10',
            label: 'October'
        },
        {
            value: '11',
            label: 'November'
        },
        { value: '12', label: 'December' }
    ]
    const years = ['2022', '2023']

    const reportsApi = useAppSelector((store) => store.reportsApi)

    const [selectedMonth, setSelectedMonth] = useState('1')
    const [selectedYear, setSelectedYear] = useState('2023')

    const { report } = useSearchFinancialReport(
        parseInt(selectedMonth),
        parseInt(selectedYear)
    )
    const [ReportNotFound, setReportNotFound] = useState<boolean>()
    useEffect(() => {
        if (reportsApi.getReport.loading === 'failed') {
            setReportNotFound(true)
        } else if (reportsApi.getReport.loading === 'succeeded') {
            setReportNotFound(false)
        }
    }, [reportsApi.getReport.loading])

    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <div />
                    <div>
                        <FormControl
                            data-testid="MonthSelector"
                            sx={{ width: 200 }}
                        >
                            <InputLabel>Month</InputLabel>
                            <Select
                                value={selectedMonth}
                                onChange={(event: SelectChangeEvent) =>
                                    setSelectedMonth(event.target.value)
                                }
                                input={<OutlinedInput label="Selector" />}
                                MenuProps={{}}
                            >
                                {months.map((month) => (
                                    <MenuItem
                                        key={month.value}
                                        value={month.value}
                                    >
                                        <ListItemText primary={month.label} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            data-testid="YearSelector"
                            sx={{ width: 200, marginLeft: '1rem' }}
                        >
                            <InputLabel>Year</InputLabel>
                            <Select
                                value={selectedYear}
                                onChange={(event: SelectChangeEvent) =>
                                    setSelectedYear(event.target.value)
                                }
                                input={<OutlinedInput label="Selector" />}
                                MenuProps={{}}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        <ListItemText primary={year} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </TopDiv>
                {!ReportNotFound ? (
                    <FinancialMetrics report={report} />
                ) : (
                    <div>
                        <Title
                            color={theme.colors.primary.dark}
                            className="mt-20 text-center"
                        >
                            No returns in the period
                        </Title>
                    </div>
                )}
            </MainDiv>
        </PageComponent>
    )
}

export default Financials
interface IconProps {
    color: string
}

const Title = styled.h3<IconProps>`
    color: ${(p) => p.color};
    font-size: 24px;
    @media ${device.lg} {
        font-size: 36px;
    }
    @media ${device.xl} {
        font-size: 48px;
    }
`
const MainDiv = styled.div`
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
`

const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
`
