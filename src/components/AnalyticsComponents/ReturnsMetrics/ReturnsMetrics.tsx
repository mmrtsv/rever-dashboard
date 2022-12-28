import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const ReturnsMetrics = () => {
    const theme = useTheme()

    const options: ApexOptions = {
        labels: [
            'Store Credit',
            'Original Payment Method',
            'Bank Transfer',
            'Exchanges'
        ]
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
                    <h3 className="text-center">
                        <b>Total Returns</b>
                    </h3>
                    <div className="text-center">2482</div>
                </ReverBox>
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <h3 className="text-center">
                        <b>Pending Returns</b>
                    </h3>
                    <div className="text-center">892</div>
                </ReverBox>
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <h3 className="text-center">
                        <b>Completed Returns</b>
                    </h3>
                    <div className="text-center">1590</div>
                </ReverBox>
            </TopInfo>
            <CompensationsDiv>
                <ReverBox borderColor={theme.colors.grey[3]}>
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="500"
                    />
                    <div className="mt-4 text-center">Compensation methods</div>
                </ReverBox>
                <ReverBox className="ml-4" borderColor={theme.colors.grey[3]}>
                    <Chart
                        options={options2}
                        series={series2}
                        type="line"
                        width="500"
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
