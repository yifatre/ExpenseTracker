import { useEffect, useState } from "react"
import { expenseService } from '../services/expense.service'
import { ExpenseList } from '../cmps/ExpenseList'
import { Outlet } from 'react-router-dom'

export function ExpenseIndex() {
    // expenses
    const [expenses, setExpenses] = useState(null)
    useEffect(() => {
        loadExpenses()
    }, [])

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

    return <>
        <ExpenseList expenses={expenses} />
        <Outlet context={[onSave]} />
    </>
}