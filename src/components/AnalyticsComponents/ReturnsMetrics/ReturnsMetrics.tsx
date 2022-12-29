import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import RDVIcon from '@mui/icons-material/AccountBalance'
import SalesIcon from '@mui/icons-material/Paid'

const ReturnsMetrics = () => {
    const theme = useTheme()

    const options: ApexOptions = {
        labels: [
            'Store Credit',
            'Original Payment Method',
            'Bank Transfer',
            'Exchanges'
        ],
        legend: {
            position: 'bottom'
        }
    }
    const series = [44, 55, 41, 17]

    const options2: ApexOptions = {
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    }
    const series2 = [
        {
            data: [30, 40, 25, 50, 49, 21, 70, 51]
        }
    ]

    return (
        <ReturnsDiv>
            <TopInfo>
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <div className="flex w-full">
                        <div className="flex items-center">
                            <ReturnsIcon />
                        </div>
                        <div className="flex w-full flex-col">
                            <h3 className="text-center text-2xl">
                                <b>2482</b>
                            </h3>
                            <p className="text-center">total returns</p>
                        </div>
                    </div>
                </ReverBox>
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <div className="flex w-full">
                        <div className="flex items-center">
                            <RDVIcon />
                        </div>
                        <div className="flex w-full flex-col">
                            <h3 className="text-center text-2xl">
                                <b>45%</b>
                            </h3>
                            <p className="text-center">RDV</p>
                        </div>
                    </div>
                </ReverBox>
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <div className="flex w-full">
                        <div className="flex items-center">
                            <SalesIcon />
                        </div>
                        <div className="flex w-full flex-col">
                            <h3 className="text-center text-2xl">
                                <b>39,871.39 €</b>
                            </h3>
                            <p className="text-center">New sales generated</p>
                        </div>
                    </div>
                </ReverBox>
            </TopInfo>
            <CompensationsDiv>
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <Chart
                        options={options2}
                        series={series2}
                        type="line"
                        width="600"
                    />
                </ReverBox>
                <ReverBox className="ml-4" borderColor={theme.colors.grey[3]}>
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="400"
                    />
                </ReverBox>
            </CompensationsDiv>
        </ReturnsDiv>
    )
}

export default ReturnsMetrics

const ReturnsDiv = styled.div``

const TopInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
`

interface BoxProps {
    borderColor: string
}

const ReverBox = styled.div<BoxProps>`
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`

const CompensationsDiv = styled.div`
    margin-top: 2rem;
    display: flex;
`
