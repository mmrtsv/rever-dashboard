import React from 'react'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

interface BarChartProps {
    title: string
    labels?: string[]
    values?: number[]
}

const BarChart: React.FC<BarChartProps> = ({ title, values, labels }) => {
    const series = [
        {
            name: 'Returned items',
            data: values ?? []
        }
    ]

    const chartOptions: ApexOptions = {
        colors: ['#003096'],
        grid: {
            show: true
        },
        chart: {
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 2
                // dataLabels: {
                // position: 'top'
                // }
            }
        },
        dataLabels: {
            enabled: false
            // formatter: function (val) {
            //     return val + '%'
            // }
            // offsetY: -20, // A tener en cuenta cuando responsive
            // style: {
            //     fontSize: '12px',
            //     colors: ['#304758']
            // }
        },
        xaxis: {
            categories: labels,
            position: 'bottom',
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: true
            }
        },
        yaxis: {
            labels: {
                show: true
            }
        }
    }

    return (
        <div>
            <p className="mt-2 truncate text-lg font-medium leading-6">
                {title}
            </p>
            <Chart options={chartOptions} series={series} type="bar" />
        </div>
    )
}

export default BarChart
