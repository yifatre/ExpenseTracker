import { ArcElement, Chart, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

export function PieChart({ chartData }) {
    Chart.register(ArcElement, Tooltip, Legend)
    const data = {
        labels: Object.keys(chartData),
        datasets: [
            {
                label: 'total amount ₪',
                data: Object.values(chartData),
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
            },
        ],
    }
    return <div className='pie-chart'>
        <h3>Expense distribution by category:</h3>
        <Pie data={data}  />
    </div>
}