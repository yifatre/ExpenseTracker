import { useEffect, useState } from "react"
// import { expenseService } from '../services/expense.service.local'
import { expenseService } from '../services/expense.service'
import { ExpenseList } from '../cmps/ExpenseList'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PieChart } from '../cmps/Charts'
import { ExpenseFilter } from '../cmps/ExpenseFilter'
import { removeExpense, saveExpense } from '../store/actions/expense.actions'
import { useSelector } from 'react-redux'

import plus from '../assets/img/plus-circle.svg'

export function ExpenseIndex() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const expenses = useSelector(storeState => storeState.expenseModule.expenses)
    const [expensesToShow, setExpensesToShow] = useState(expenses)
    const [chartData, setChartData] = useState(null)
    const [filterBy, setFilterBy] = useState(expenseService.getDefaultFilter())
    const navigate = useNavigate()

    useEffect(() => {
        updateExpensesToShow(expenses)
    }, [expenses, filterBy])

    useEffect(() => {
        setChartData(getChartData())
    }, [expensesToShow])

    function updateExpensesToShow(expenses) {
        let _expenses = expenses?.map(ex => ex)
        if (filterBy.category) {
            _expenses = _expenses.filter(expense => expense.category.toLowerCase() === filterBy.category.toLowerCase())
        }
        if (filterBy.startDate) {
            _expenses = _expenses.filter(expense => expense.date >= filterBy.startDate)
        }
        if (filterBy.toDate) {
            _expenses = _expenses.filter(expense => expense.date <= filterBy.toDate)
        }
        setExpensesToShow(_expenses)
    }

    async function onSave(expense) {
        try {
            const savedExpense = await saveExpense(expense)
            updateExpensesToShow()
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
    if (!loggedInUser) return <section className="expense-index">Login or sign up to manage your expenses</section>
    return <section className="expense-index">
        <Link className='flex align-center' to='/expense/edit'><img src={plus} alt="" />Add an expense</Link>
        <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <ExpenseList expenses={expensesToShow} onDeleteExpense={onDeleteExpense} />
        {chartData && <PieChart chartData={chartData} />}
        <Outlet context={[onSave, expenses]} />
    </section>
}