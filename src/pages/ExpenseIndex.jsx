import { useEffect, useState } from "react"
import { expenseService } from '../services/expense.service'
import { ExpenseList } from '../cmps/ExpenseList'
import { Outlet } from 'react-router-dom'
import { PieChart } from '../cmps/Charts'
import { ExpenseFilter } from '../cmps/ExpenseFilter'

export function ExpenseIndex() {

    const [expenses, setExpenses] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [filterBy, setFilterBy] = useState(expenseService.getDefaultFilter())

    useEffect(() => {
        loadExpenses()
    }, [filterBy])

    useEffect(() => {
        setChartData(getChartData())
    }, [expenses])

    async function loadExpenses() {
        try {
            const _expenses = await expenseService.query(filterBy)
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

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    return <section className="expense-index">
        <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <ExpenseList expenses={expenses} />
        {chartData && <PieChart chartData={chartData} />}
        <Outlet context={[onSave]} />
    </section>
}