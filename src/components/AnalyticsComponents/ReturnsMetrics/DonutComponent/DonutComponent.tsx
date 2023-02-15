import React from 'react'
import styled from 'styled-components'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

interface DonutProps {
    title: string
    labels?: string[]
    values?: number[]
}

const DonutComponent: React.FC<DonutProps> = ({ title, values, labels }) => {
    const colors = ['#1B75EB', '#85B8FF', '#AEDCFF', '#003096', '#467bed']

    const chartOptions: ApexOptions = {
        labels: labels,
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'donut',
            sparkline: {
                enabled: true
            }
        },
        // colors: ['#1B75EB', '#85B8FF', '#AEDCFF', '#003096'],
        colors: values && colors.slice(0, values.length),
        plotOptions: {
            pie: {
                customScale: 0.9,
                expandOnClick: false,
                donut: {
                    size: '70%'
                }
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark',
            custom: ({ seriesIndex, w }) =>
                `<div class="flex items-center h-16 min-h-16 max-h-16 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>`
        }
    }
    return (
        <DonutDiv>
            <p className="truncate text-lg font-medium leading-6">{title}</p>
            <Chart
                options={chartOptions}
                series={values}
                type="donut"
                width="300"
            />
            <div>
                {values &&
                    values.map((value, i) => (
                        <div key={i}>
                            <div className="mx-4 grid grid-cols-2 py-1">
                                <div className="flex items-center">
                                    <LegendDot
                                        className="h-4 w-4 rounded-full"
                                        backgroundColor={colors[i]}
                                    />
                                    <p className="ml-4 truncate">
                                        {labels && labels[i]}
                                    </p>
                                </div>

                                <p
                                    className="text-right"
                                    color="text.secondary"
                                >
                                    {value}%
                                </p>
                            </div>
                            {i === values.length - 1 ? null : <hr />}
                        </div>
                    ))}
            </div>
        </DonutDiv>
    )
}

export default DonutComponent

const DonutDiv = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`

interface LegendProps {
    borderColor?: string
    backgroundColor?: string
}

const LegendDot = styled.div<LegendProps>`
    background-color: ${(p) => p.backgroundColor};
    border-color: ${(p) => p.borderColor};
`
