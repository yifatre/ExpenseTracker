import { useEffect, useState } from "react"
// import { expenseService } from '../services/expense.service.local'
import { expenseService } from '../services/expense.service'
import { ExpenseList } from '../cmps/ExpenseList'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PieChart } from '../cmps/Charts'
import { ExpenseFilter } from '../cmps/ExpenseFilter'
import { removeExpense, saveExpense } from '../store/actions/expense.actions'
import { useSelector } from 'react-redux'

export function ExpenseIndex() {

    const expenses = useSelector(storeState => storeState.expenseModule.expenses)
    const [expensesToShow, setExpensesToShow] = useState(expenses)
    const [chartData, setChartData] = useState(null)
    const [filterBy, setFilterBy] = useState(expenseService.getDefaultFilter())
    const navigate = useNavigate()

    useEffect(() => {
        console.log('effect',)
        console.log('expenses', expenses)
        updateExpensesToShow()
    }, [expenses, filterBy])

    useEffect(() => {
        setChartData(getChartData())
    }, [expensesToShow])

    function updateExpensesToShow() {
        let _expenses = expenses.map(ex => ex)
        if (filterBy.category) {
            _expenses = _expenses.filter(expense => expense.category.toLowerCase() === filterBy.category.toLowerCase())
        }
        if (filterBy.startDate) {
            _expenses = _expenses.filter(expense => expense.date >= filterBy.startDate)
        }
        if (filterBy.toDate) {
            _expenses = _expenses.filter(expense => expense.date <= filterBy.toDate)
        }
        console.log('_expenses', _expenses)
        setExpensesToShow(_expenses)
    }

    async function onSave(expense) {
        try {
            const savedExpense = await saveExpense(expense)
            updateExpensesToShow()
            navigate('/expense')
            return savedExpense
        }
        catch (err) {
            console.error(err)
        }
    }

    function onDeleteExpense(id) {
        try {
            removeExpense(id)
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
        <Link to='/expense/edit'>Add an expense</Link>
        <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        {expensesToShow && <ExpenseList expenses={expensesToShow} onDeleteExpense={onDeleteExpense} />}
        {chartData && <PieChart chartData={chartData} />}
        <Outlet context={[onSave, expenses]} />
    </section>
}