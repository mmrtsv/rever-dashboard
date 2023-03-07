import React from 'react'
import styled from 'styled-components'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface LineChartProps {
    title: string
    values: number[]
    days: string[] | number[]
}

const LineChartComponent: React.FC<LineChartProps> = ({
    title,
    values,
    days
}) => {
    const options: ApexOptions = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: '#AEDCFF',
            width: '100%',
            height: '100%',
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#AEDCFF'],
        dataLabels: {
            enabled: false
        },
        fill: {
            colors: ['#003096']
        },
        grid: {
            show: false,
            borderColor: '#85B8FF'
        },
        stroke: {
            width: 3
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories: days,
            labels: {
                show: true
            }
        }
    }
    const series = [{ name: 'Returned items', data: values }]
    return (
        <LineChart>
            <LineChartTitle>{title}</LineChartTitle>
            <Chart options={options} series={series} type="area" height="250" />
        </LineChart>
    )
}

export default LineChartComponent

const LineChartTitle = styled.h6`
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.0075em;
    color: #aedcff;
    margin-top: 1rem;
    margin-bottom: 0.5rem;

    text-align: center;
`

const LineChart = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    border-radius: 0.5rem;
    background-color: rgb(30, 41, 59);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
