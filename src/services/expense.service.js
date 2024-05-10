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
    // getNextExpenseId,
    // getFilterBy,
    getDefaultFilter,
    setFilterBy,
    getCategories
}

window.bs = expenseService //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

async function query(filterBy = getDefaultFilter()) {
    let expenses = await storageService.query(EXPENSE_KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'ig')
        expenses = expenses.filter(expense => regex.test(expense.category) || regex.test(expense.notes))
    }
    if (filterBy.minAmount) {
        expenses = expenses.filter(expense => expense.amount >= filterBy.minAmount)
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
    return { txt: '', minAmount: 0 }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}


// function _setNextPrevExpenseId(expense) {
//     return storageService.query(EXPENSE_KEY).then((expenses) => {
//         const expenseIdx = expenses.findIndex((currExpense) => currExpense._id === expense._id)
//         const nextExpense = expenses[expenseIdx + 1] ? expenses[expenseIdx + 1] : expenses[0]
//         const prevExpense = expenses[expenseIdx - 1] ? expenses[expenseIdx - 1] : expenses[expenses.length - 1]
//         expense.nextExpenseId = nextExpense._id
//         expense.prevExpenseId = prevExpense._id
//         return expense
//     })
// }

function _createExpenses() {
    let expenses = utilService.loadFromStorage(EXPENSE_KEY)
    if (!expenses || !expenses.length) {
        expenses = [
            {
                _id: 'e001',
                amount: 100.50,
                category: 'groceries',
                date: new Date('2024-05-01'),
                notes: 'Bought fruits and vegetables'
            },
            {
                _id: 'e002',
                amount: 50.25,
                category: 'food',
                date: new Date('2024-05-05'),
                notes: 'Ate pizza'
            },
            {
                _id: 'e003',
                amount: 200.00,
                category: 'shopping',
                date: new Date('2024-05-08'),
                notes: 'New clothes'
            },
            {
                _id: 'e004',
                amount: 20.00,
                category: 'transportation',
                date: new Date('2023-05-10'),
                notes: 'Bus fare'
            }
        ]

        utilService.saveToStorage(EXPENSE_KEY, expenses)
    }
}

function getCategories() {
    return ['food', 'groceries', 'shopping', 'utilities', 'transportation', 'other']
}
// function _createExpense(amount, date) {
//     const expense = getEmptyExpense()
//     expense._id = utilService.makeId()
//     return expense
// }
