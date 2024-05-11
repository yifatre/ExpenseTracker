import { expenseService } from "../../services/expense.service.js"
// import { showSuccessMsg } from "../../services/event-bus.service.js"
import { ADD_EXPENSE, EXPENSE_UNDO, REMOVE_EXPENSE, SET_EXPENSES, SET_FILTER_BY, SET_IS_LOADING, UPDATE_EXPENSE } from "../reducers/expense.reducer.js"
import { store } from "../store.js"

export async function loadExpenses() {
    const filterBy = {}//store.getState().expenseModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const expenses = await expenseService.query(filterBy)
        store.dispatch({ type: SET_EXPENSES, expenses })
    } catch (err) {
        console.log('expense action -> Cannot load expenses', err)
        throw err
    }
    finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeExpense(expenseId) {
    try {
        const removedExpense = await expenseService.remove(expenseId)
        store.dispatch({ type: REMOVE_EXPENSE, expenseId })
        return removedExpense
    } catch (err) {
        console.log('expense action -> Cannot remove expense', err)
        throw err
    }
}

export async function saveExpense(expense) {
    const type = expense._id ? UPDATE_EXPENSE : ADD_EXPENSE
    try {
        const savedExpense = await expenseService.save(expense)
        store.dispatch({ type, expense: savedExpense })
        return savedExpense
    } catch (err) {
        console.log('expense action -> Cannot save expense', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}