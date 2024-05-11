import { expenseService } from "../../services/expense.service.js"

//* Expenses
export const SET_EXPENSES = 'SET_EXPENSES'
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE'
export const EXPENSE_UNDO = 'EXPENSE_UNDO'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    expenses: [],
    isLoading: false,
    filterBy: expenseService.getDefaultFilter(),
    lastExpenses: []
}

export function expenseReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Expenses
        case SET_EXPENSES:
            return { ...state, expenses: action.expenses }
        case REMOVE_EXPENSE:
            const lastExpenses = [...state.expenses]
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense._id !== action.expenseId),
                lastExpenses
            }
        case ADD_EXPENSE:

            return {
                ...state,
                expenses: [...state.expenses, action.expense]
            }
        case UPDATE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.map(expense => expense._id === action.expense._id ? action.expense : expense)
            }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case EXPENSE_UNDO:
            return {
                ...state,
                expenses: [...state.lastExpenses]
            }


        default:
            return state
    }
}