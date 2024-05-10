import { useEffect, useState } from "react"
import { expenseService } from '../services/expense.service'
import { ExpenseList } from '../cmps/ExpenseList'
import { Outlet } from 'react-router-dom'
import { PieChart } from '../cmps/Charts'

export function ExpenseIndex() {
    // expenses
    const [expenses, setExpenses] = useState(null)
    // chartData
    const [chartData, setChartData] = useState(null)
    useEffect(() => {
        loadExpenses()
    }, [])

    useEffect(() => {
        setChartData(getChartData())
    }, [expenses])

    async function loadExpenses() {
        try {
            const _expenses = await expenseService.query()
            setExpenses(_expenses)
        }
        catch (err) {
            console.error(err)
        }
    }

    async function onSave(expense) {
        try {
            const savedExpense = await expenseService.save(expense)
            setExpenses([...expenses, savedExpense])
            return savedExpense
        }
        catch (err) {
            console.error(err)
        }
    }

    function getChartData() {
        const dataMap = expenses?.reduce((acc, expense) => {
            if (!acc[expense.category]) acc[expense.category] = 0
            acc[expense.category] += expense.amount
            return acc
        }, {})
        return dataMap
    }

    return <section className="expense-index">
        <ExpenseList expenses={expenses} />
        {chartData && <PieChart chartData={chartData}/>}
        <Outlet context={[onSave]} />
    </section>
}