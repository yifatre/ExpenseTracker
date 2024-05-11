import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const EXPENSE_KEY = 'expense'

export const expenseService = {
    query,
    getById,
    remove,
    save,
    getEmptyExpense,
    getDefaultFilter,
    getCategories
}

window.bs = expenseService //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

async function query(filterBy = getDefaultFilter()) {
    let expenses = await httpService.get(EXPENSE_KEY)

    // if (filterBy.category) {
    //     expenses = expenses.filter(expense => expense.category.toLowerCase() === filterBy.category.toLowerCase())
    // }
    // if (filterBy.startDate) {
    //     expenses = expenses.filter(expense => expense.date >= filterBy.startDate)
    // }
    // if (filterBy.toDate) {
    //     expenses = expenses.filter(expense => expense.date <= filterBy.toDate)
    // }
    return expenses

}

async function getById(expenseId) {
    let expense = await httpService.get(EXPENSE_KEY, expenseId)
    return expense
}

function remove(expenseId) {
    return httpService.delete(`${EXPENSE_KEY}/${expenseId}`)
}

async function save(expense) {
    if (expense._id) {
        return await httpService.put(`${EXPENSE_KEY}/${expense._id}`, expense)
    } else {
        return await httpService.post(EXPENSE_KEY, expense)
    }
}

function getEmptyExpense() {
    return {
        amount: 0,
        category: '',
        date: Date.now(),
        notes: ''
    }
}

function getDefaultFilter() {
    return { category: '', startDate: new Date(new Date().getFullYear(), 0).valueOf(), toDate: Date.now() }
}

function getCategories() {
    return ['food', 'groceries', 'shopping', 'utilities', 'transportation', 'other']
}

