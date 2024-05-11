import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const EXPENSE_KEY = 'expenseDB'

_createExpenses()

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
    let expenses = await storageService.query(EXPENSE_KEY)

    if (filterBy.category) {
        expenses = expenses.filter(expense => expense.category.toLowerCase() === filterBy.category.toLowerCase())
    }
    if (filterBy.startDate) {
        expenses = expenses.filter(expense => expense.date >= filterBy.startDate)
    }
    if (filterBy.toDate) {
        expenses = expenses.filter(expense => expense.date <= filterBy.toDate)
    }
    return expenses

}

async function getById(expenseId) {
    let expense = await storageService.get(EXPENSE_KEY, expenseId)
    return expense
}

function remove(expenseId) {
    return storageService.remove(EXPENSE_KEY, expenseId)
}

async function save(expense) {
    if (expense._id) {
        return await storageService.put(EXPENSE_KEY, expense)
    } else {
        return await storageService.post(EXPENSE_KEY, expense)
    }
}

function getEmptyExpense() {
    return {
        _id: '',
        amount: 0,
        category: '',
        date: Date.now(),
        notes: ''
    }
}

function getDefaultFilter() {
    return { category: '', startDate: new Date(new Date().getFullYear(), 0).valueOf(), toDate: Date.now() }
}

function _createExpenses() {
    let expenses = utilService.loadFromStorage(EXPENSE_KEY)
    if (!expenses || !expenses.length) {
        expenses = [
            {
                _id: 'e001',
                amount: 100.50,
                category: 'groceries',
                date: new Date('2024-05-01').valueOf(),
                notes: 'Bought fruits and vegetables'
            },
            {
                _id: 'e002',
                amount: 50.25,
                category: 'food',
                date: new Date('2024-05-05').valueOf(),
                notes: 'Ate pizza'
            },
            {
                _id: 'e003',
                amount: 200.00,
                category: 'shopping',
                date: new Date('2024-05-08').valueOf(),
                notes: 'New clothes'
            },
            {
                _id: 'e004',
                amount: 20.00,
                category: 'transportation',
                date: new Date('2023-05-10').valueOf(),
                notes: 'Bus fare'
            }
        ]

        utilService.saveToStorage(EXPENSE_KEY, expenses)
    }
}

function getCategories() {
    return ['food', 'groceries', 'shopping', 'utilities', 'transportation', 'other']
}

