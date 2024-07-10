import { useEffect, useState } from 'react'
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Pie, PolarArea, Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { BarChart, Bar, ResponsiveContainer } from 'recharts'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export function Dashboard() {
    const toys = useSelector(state => state.toyModule.toys)

    const getPricesPerLabel = () => {
        const labelPrices = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (!labelPrices[label]) {
                    labelPrices[label] = toy.price
                } else {
                    labelPrices[label] += toy.price
                }
            })
        })
        return labelPrices
    }

    const getInventoryByLabel = () => {
        const labelInventory = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (!labelInventory[label]) {
                    labelInventory[label] = 0
                }
                if (toy.inStock) {
                    labelInventory[label] += 1
                }
            })
        })
        return labelInventory
    }

    const [pricesChartData, setPricesChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Prices per Label',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }],
    })

    const [inventoryChartData, setInventoryChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Inventory by Label',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }],
    })

    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Random Data',
            data: [],
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
        }],
    })

    const generateRandomData = () => {
        const data = []
        const labels = []
        for (let i = 0; i < 10; i++) {
            labels.push(new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString())
            data.push(Math.floor(Math.random() * 100))
        }
        return { labels: labels.reverse(), data: data.reverse() }
    }

    useEffect(() => {
        const labelPrices = getPricesPerLabel()
        const pricesLabels = Object.keys(labelPrices)
        const pricesData = Object.values(labelPrices)

        setPricesChartData({
            labels: pricesLabels,
            datasets: [{
                ...pricesChartData.datasets[0],
                data: pricesData,
            }],
        })

        const labelInventory = getInventoryByLabel()
        const inventoryLabels = Object.keys(labelInventory)
        const inventoryData = Object.values(labelInventory)

        setInventoryChartData({
            labels: inventoryLabels,
            datasets: [{
                ...inventoryChartData.datasets[0],
                data: inventoryData,
            }],
        })

        const randomData = generateRandomData()
        setLineChartData({
            labels: randomData.labels,
            datasets: [{
                ...lineChartData.datasets[0],
                data: randomData.data,
            }],
        })
    }, [toys])

    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ]

    return (
        <div className="dashboard">
            <div className="charts">
                <div className="chart">
                    <h2>Prices per Label</h2>
                    <Pie data={pricesChartData} />
                </div>
                <div  className="chart">
                    <h2>Inventory by Label</h2>
                    <PolarArea data={inventoryChartData} className="chart-2" />
                </div>
                {/* <div className="chart">
                    <h2>UV Data</h2>
                    <ResponsiveContainer width="70%" height={300}>
                        <BarChart data={data}>
                            <Bar dataKey="uv" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div> */}
                <div className="chart">
                    <h2>Random Line Data</h2>
                    <Line data={lineChartData} />
                </div>
            </div>
        </div>
    )
}
